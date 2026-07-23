/* ============================================================
   m-print.by — общий скрипт
   Мобильное меню, модалка "Рассчитать стоимость", формы
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Единая навигация и список направлений ---------- */
  var services = [
    ['Широкоформатная печать', 'shirokoformatnaya-pechat.html'],
    ['Оформление мест продаж', 'oformlenie-mest-prodazh.html'],
    ['Оформление витрин', 'oformlenie-vitrin.html'],
    ['Оклейка авто', 'okleyka-avto.html'],
    ['Демонтаж старой рекламы', 'demontazh-staroy-reklamy.html'],
    ['Плоттерная резка', 'plotternaya-rezka.html'],
    ['Печать на баннерной сетке', 'bannernaya-setka.html'],
    ['Печать на баннерной ткани', 'bannernaya-tkan.html'],
    ['Нанесение изображения на ПВХ', 'nanesenie-izobrazheniya-na-pvh.html']
  ];
  var products = [
    ['Таблички', 'tablichki-ukazateli.html'],
    ['Роллапы', 'roll-up.html'],
    ['Информационные стенды', 'informatsionnye-stendy.html'],
    ['Офисные таблички и указатели', 'ofisnye-tablichki-i-ukazateli.html'],
    ['Растяжки', 'rastyazhki.html'],
    ['Стикеры', 'stikery.html'],
    ['Штендеры', 'shtendery.html'],
    ['Картины на холсте', 'holsty.html']
  ];

  function navGroup(title, items) {
    return '<div class="nav__group">' +
      '<button type="button" class="nav__toggle" aria-expanded="false" aria-haspopup="true">' + title + ' <span class="nav__caret" aria-hidden="true">▾</span></button>' +
      '<div class="nav__menu">' + items.map(function (item) {
        return '<a href="' + item[1] + '">' + item[0] + '</a>';
      }).join('') + '</div></div>';
  }

  var siteNav = document.getElementById('site-nav');
  if (siteNav) {
    siteNav.innerHTML = '<a href="index.html">Главная</a>' +
      navGroup('Услуги', services) +
      navGroup('Каталог', products) +
      '<a href="about.html">О нас</a>' +
      '<a href="contacts.html">Контакты</a>' +
      '<a href="#" class="btn btn--primary nav__cta" data-calc>Рассчитать стоимость</a>';
  }

  var footerGrid = document.querySelector('.footer__grid');
  if (footerGrid) {
    footerGrid.innerHTML = '<div class="footer__about">' +
      '<a href="index.html" class="logo"><span class="logo__mark"><span>m</span></span><span><b>m-print</b><i>.by</i></span></a>' +
      '<p>Широкоформатная печать и рекламное производство в Минске: от макета до готового изделия.</p></div>' +
      '<div><h4>Услуги</h4><div class="footer__links">' + services.slice(0, 5).map(function (item) { return '<a href="' + item[1] + '">' + item[0] + '</a>'; }).join('') + '</div></div>' +
      '<div><h4>Каталог</h4><div class="footer__links">' + products.slice(0, 5).map(function (item) { return '<a href="' + item[1] + '">' + item[0] + '</a>'; }).join('') + '</div></div>' +
      '<div><h4>Контакты</h4><div class="footer__links"><a href="about.html">О нас</a><a href="contacts.html">Контакты</a>' +
      '<a href="tel:+375000000000">+375 (00) 000-00-00</a><a href="mailto:info@m-print.by">info@m-print.by</a><span style="color:var(--gray-500);font-size:15px">г. Минск</span></div></div>';
  }

  var allDirections = services.concat(products);
  document.querySelectorAll('select[name="service"]').forEach(function (select) {
    var selected = select.value;
    select.innerHTML = '<option value="">Выберите направление</option>' +
      allDirections.map(function (item) {
        return '<option value="' + item[0] + '">' + item[0] + '</option>';
      }).join('') + '<option value="Другое">Другое</option>';
    if (selected) select.value = selected;
  });

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

  /* ---------- Галерея на детальной странице услуги ---------- */
  document.querySelectorAll('[data-service-gallery]').forEach(function (gallery) {
    var mainImage = gallery.querySelector('[data-gallery-main]');
    var stage = gallery.querySelector('.service-gallery__stage');
    var thumbs = Array.prototype.slice.call(gallery.querySelectorAll('[data-gallery-src]'));
    var changeTimer;

    function activateThumb(thumb) {
      if (!mainImage || !stage || thumb.classList.contains('is-active')) return;

      clearTimeout(changeTimer);
      thumbs.forEach(function (item) {
        var active = item === thumb;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', active ? 'true' : 'false');
      });

      stage.classList.add('is-changing');
      changeTimer = setTimeout(function () {
        mainImage.src = thumb.getAttribute('data-gallery-src');
        mainImage.alt = thumb.getAttribute('data-gallery-alt') || '';
        stage.classList.remove('is-changing');
      }, 120);
    }

    thumbs.forEach(function (thumb, index) {
      thumb.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
      thumb.addEventListener('click', function () { activateThumb(thumb); });
      thumb.addEventListener('mouseenter', function () { activateThumb(thumb); });
      thumb.addEventListener('focus', function () { activateThumb(thumb); });
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
