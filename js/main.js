/* ============================================================
   m-print.by — общий скрипт
   Мобильное меню, модалка "Рассчитать стоимость", формы
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Прозрачная мобильная шапка ---------- */
  var pageHeader = document.querySelector('.header');
  if (pageHeader) {
    var syncHeaderState = function () {
      pageHeader.classList.toggle('is-scrolled', window.scrollY > 20);
    };
    syncHeaderState();
    window.addEventListener('scroll', syncHeaderState, { passive: true });
  }

  /* ---------- Единая навигация и список направлений ---------- */
  var services = [
    ['Широкоформатная печать', 'shirokoformatnaya-pechat.html'],
    ['Оформление мест продаж', 'oformlenie-mest-prodazh.html'],
    ['Оформление витрин', 'oformlenie-vitrin.html'],
    ['Стикеры на авто', 'stikery-na-avto.html'],
    ['Ультрафиолетовая UV-печать', 'ultrafioletovaya-uv-pechat.html'],
    ['Оформление вендинговых аппаратов', 'oformlenie-vendingovyh-apparatov.html'],
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
    // ['Штендеры', 'shtendery.html'], // временно скрыто
    ['Картины на холсте', 'holsty.html'],
    ['Паспорт объекта', 'pasport-obekta.html'],
    ['Государственная символика', 'gosudarstvennaya-simvolika.html']
  ];

  function navGroup(title, page, overviewLabel, items) {
    return '<div class="nav__group">' +
      '<a class="nav__toggle" href="' + page + '" aria-haspopup="true" aria-expanded="false">' + title + ' <span class="nav__caret" aria-hidden="true">▾</span></a>' +
      '<div class="nav__menu"><a class="nav__overview-link" href="' + page + '">' + overviewLabel + '</a>' + items.map(function (item) {
        return '<a href="' + item[1] + '">' + item[0] + '</a>';
      }).join('') + '</div></div>';
  }

  var siteNav = document.getElementById('site-nav');
  if (siteNav) {
    siteNav.innerHTML = '<a href="index.html">Главная</a>' +
      navGroup('Услуги', 'services.html', 'Все услуги', services) +
      navGroup('Каталог', 'catalog.html', 'Весь каталог', products) +
      '<a href="about.html">О нас</a>' +
      '<a href="contacts.html">Контакты</a>' +
      '<a href="#" class="btn btn--primary nav__cta" data-calc>Рассчитать стоимость</a>';
  }

  var footerGrid = document.querySelector('.footer__grid');
  if (footerGrid) {
    footerGrid.innerHTML = '<div class="footer__about">' +
      '<a href="index.html" class="logo"><span class="logo__mark"><span>m</span></span><span><b>m-print</b><i>.by</i></span></a>' +
      '<p>Широкоформатная печать и рекламное производство в Минске: от макета до готового изделия.</p></div>' +
      '<div><h4><a href="services.html">Услуги</a></h4><div class="footer__links"><a href="services.html">Все услуги</a>' + services.slice(0, 6).map(function (item) { return '<a href="' + item[1] + '">' + item[0] + '</a>'; }).join('') + '</div></div>' +
      '<div><h4><a href="catalog.html">Каталог</a></h4><div class="footer__links"><a href="catalog.html">Весь каталог</a>' + products.slice(0, 5).map(function (item) { return '<a href="' + item[1] + '">' + item[0] + '</a>'; }).join('') + '</div></div>' +
      '<div><h4>Контакты</h4><div class="footer__links"><a href="about.html">О нас</a><a href="contacts.html">Контакты</a>' +
      '<a href="tel:+375000000000">+375 (00) 000-00-00</a><a href="mailto:info@m-print.by">info@m-print.by</a><span style="color:var(--gray-500);font-size:15px">г. Минск, ул. Тимирязева, 74, корпус 1</span></div></div>';
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

  /* ---------- Мобильная кнопка звонка ---------- */
  var headerActions = document.querySelector('.header__actions');
  var burger = document.querySelector('.burger');
  if (headerActions && burger && !headerActions.querySelector('.header__call-mobile')) {
    var callButton = document.createElement('a');
    callButton.className = 'header__call-mobile';
    callButton.href = 'tel:+375000000000';
    callButton.setAttribute('aria-label', 'Позвонить в m-print.by');
    callButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.4 3.5 5.7 4.2c-.8.3-1.3 1.2-1.1 2.1 1.3 6.4 6.3 11.4 12.7 12.7.9.2 1.8-.3 2.1-1.1l.7-1.7c.3-.8 0-1.7-.7-2.1l-2.8-1.6c-.7-.4-1.5-.3-2 .3l-1.1 1.2a13.1 13.1 0 0 1-4.1-4.1l1.2-1.1c.6-.5.7-1.3.3-2L9.5 4.1c-.4-.7-1.3-1-2.1-.6Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Позвонить</span>';
    headerActions.insertBefore(callButton, burger);
  }

  /* ---------- Мобильное меню и аккордеоны ---------- */
  var nav = document.querySelector('.nav');
  var mobileMenu = window.matchMedia('(max-width: 1024px)');

  function collapseNavGroups(exceptGroup) {
    if (!nav) return;
    nav.querySelectorAll('.nav__group').forEach(function (group) {
      if (group === exceptGroup) return;
      group.classList.remove('is-open');
      var toggle = group.querySelector('.nav__toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  }

  function closeMobileNav() {
    if (!nav || !burger) return;
    nav.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    collapseNavGroups();
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (!open) collapseNavGroups();
    });

    nav.addEventListener('click', function (event) {
      var toggle = event.target.closest('.nav__toggle');
      if (toggle && mobileMenu.matches) {
        event.preventDefault();
        var group = toggle.closest('.nav__group');
        var willOpen = !group.classList.contains('is-open');
        collapseNavGroups(group);
        group.classList.toggle('is-open', willOpen);
        toggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        return;
      }

      var link = event.target.closest('a');
      if (link && mobileMenu.matches) closeMobileNav();
    });

    document.addEventListener('click', function (event) {
      if (!mobileMenu.matches || !nav.classList.contains('is-open')) return;
      if (!event.target.closest('.header')) closeMobileNav();
    });

    mobileMenu.addEventListener('change', function (event) {
      if (!event.matches) closeMobileNav();
    });
  }


  /* ---------- Раскрытие карточек на главной ---------- */
  document.querySelectorAll('[data-mobile-grid-toggle]').forEach(function (button) {
    var grid = document.getElementById(button.getAttribute('aria-controls'));
    var label = button.querySelector('span');
    if (!grid || !label) return;

    var showLabel = button.getAttribute('aria-controls') === 'services-grid'
      ? 'Показать все услуги'
      : 'Показать все изделия';

    button.addEventListener('click', function () {
      var expanded = grid.classList.toggle('is-expanded');
      button.classList.toggle('is-expanded', expanded);
      button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      label.textContent = expanded ? 'Скрыть список' : showLabel;

      if (!expanded) {
        var section = grid.closest('section');
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
