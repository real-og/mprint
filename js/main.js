/* ============================================================
   m-print.by — общий скрипт
   Мобильное меню, модалка "Рассчитать стоимость", формы
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Мобильное меню ---------- */
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Закрывать меню при клике по ссылке
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        burger.classList.remove('is-open');
      });
    });
  }

  /* ---------- Выпадающее меню "Услуги" ---------- */
  // На десктопе меню раскрывается по наведению (CSS), клик нужен для тач-устройств
  // и клавиатуры; в мобильной панели меню всегда раскрыто (CSS), клик безвреден.
  var navGroups = document.querySelectorAll('.nav__group');
  navGroups.forEach(function (group) {
    var toggle = group.querySelector('.nav__toggle');
    if (!toggle) return;
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      var open = group.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  // Закрывать раскрытые группы при клике вне них
  document.addEventListener('click', function (e) {
    navGroups.forEach(function (group) {
      if (group.classList.contains('is-open') && !group.contains(e.target)) {
        group.classList.remove('is-open');
        var t = group.querySelector('.nav__toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* ---------- Модалка "Рассчитать стоимость" ---------- */
  var modal = document.getElementById('calc-modal');

  function openModal(service) {
    if (!modal) return;
    modal.classList.add('is-open');
    document.body.classList.add('hide-scroll');
    // Предзаполнить услугу, если передана
    var sel = modal.querySelector('[name="service"]');
    if (sel && service) {
      for (var i = 0; i < sel.options.length; i++) {
        if (sel.options[i].value === service) { sel.selectedIndex = i; break; }
      }
    }
    var firstInput = modal.querySelector('input');
    if (firstInput) setTimeout(function () { firstInput.focus(); }, 100);
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.classList.remove('hide-scroll');
  }

  // Любая ссылка/кнопка с data-calc открывает модалку
  document.querySelectorAll('[data-calc]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      openModal(el.getAttribute('data-service') || '');
    });
  });

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target.hasAttribute('data-close')) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  /* ---------- Обработка форм (заглушка отправки) ---------- */
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = form.querySelector('.form__success');
      if (success) {
        success.classList.add('is-visible');
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
      // Закрыть модалку через паузу, если форма внутри неё
      if (form.closest('.modal')) {
        setTimeout(function () {
          closeModal();
          if (success) success.classList.remove('is-visible');
        }, 2200);
      }
      /* TODO: сюда подключить реальную отправку —
         например, fetch на backend или сервис форм. */
    });
  });

  /* ---------- Подсветка активного пункта меню ---------- */
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path) {
      a.classList.add('is-active');
      // Если активна страница услуги — подсветить и родительский пункт "Услуги"
      var group = a.closest('.nav__group');
      if (group) {
        var toggle = group.querySelector('.nav__toggle');
        if (toggle) toggle.classList.add('is-active');
      }
    }
  });
});
