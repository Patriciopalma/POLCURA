(function () {
  'use strict';

  var dict = {
    es: {
      heroTitle1: 'Fruta fresca,',
      heroTitle2: 'gestionada con',
      heroTitle3: 'precisión.',
      heroBody: 'Conectamos productores de Chile y Perú con mercados internacionales, acompañando cada etapa desde el origen hasta la exportación.',
      btnProducts: 'Conoce nuestros productos',
      btnTalk: 'Habla con nuestro equipo',
      talk: 'Conversemos',
      indOrigin: 'Origen',
      indOperation: 'Operación',
      indOperationVal: 'Fruta fresca',
      indScope: 'Alcance',
      indScopeVal: 'Mercados internacionales'
    },
    en: {
      heroTitle1: 'Fresh fruit,',
      heroTitle2: 'managed with',
      heroTitle3: 'precision.',
      heroBody: 'We connect growers in Chile and Peru with international markets, supporting every stage from origin to export.',
      btnProducts: 'See our products',
      btnTalk: 'Talk to our team',
      talk: "Let's talk",
      indOrigin: 'Origin',
      indOperation: 'Operation',
      indOperationVal: 'Fresh fruit',
      indScope: 'Reach',
      indScopeVal: 'International markets'
    }
  };

  var html = document.documentElement;
  var pageWrap = document.getElementById('page-wrap');
  var header = document.getElementById('site-header');
  var menuToggle = document.getElementById('menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');

  /* ---------- Scroll state ---------- */
  function onScroll() {
    var scrolled = window.scrollY > 40;
    header.classList.toggle('is-scrolled', scrolled);
    pageWrap.classList.toggle('is-scrolled', scrolled);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  function setMenuOpen(open) {
    mobileMenu.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  menuToggle.addEventListener('click', function () {
    setMenuOpen(!mobileMenu.classList.contains('is-open'));
  });
  Array.prototype.forEach.call(mobileMenu.querySelectorAll('[data-close-menu]'), function (el) {
    el.addEventListener('click', function () { setMenuOpen(false); });
  });

  /* ---------- Language switch ---------- */
  var langButtons = document.querySelectorAll('[data-lang-btn]');
  function setLang(lang) {
    html.setAttribute('lang', lang);
    var t = dict[lang];
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.textContent = t[key];
    });
    langButtons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang-btn') === lang ? 'true' : 'false');
    });
  }
  langButtons.forEach(function (btn) {
    btn.addEventListener('click', function () { setLang(btn.getAttribute('data-lang-btn')); });
  });

  /* ---------- Reveal on scroll + stats + process steps ---------- */
  var statsAnimated = false;
  function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;
    var el = document.getElementById('stat-years');
    var target = 15;
    var cur = 0;
    function step() {
      cur += 1;
      el.textContent = Math.min(cur, target);
      if (cur < target) requestAnimationFrame(function () { setTimeout(step, 40); });
    }
    step();
  }

  function revealProcessSteps(container) {
    var steps = container.querySelectorAll('[data-process-step]');
    steps.forEach(function (el, idx) {
      setTimeout(function () { el.classList.add('is-visible'); }, idx * 140);
    });
  }

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          el.classList.add('is-visible');
          if (el.hasAttribute('data-stats-box')) animateStats();
          if (el.hasAttribute('data-process-box')) revealProcessSteps(el);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    revealEls.forEach(function (el) {
      if (reduceMotion) {
        el.classList.add('is-visible');
        if (el.hasAttribute('data-stats-box')) animateStats();
        if (el.hasAttribute('data-process-box')) revealProcessSteps(el);
      } else {
        io.observe(el);
      }
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    animateStats();
    revealProcessSteps(document.querySelector('[data-process-box]'));
  }

  /* ---------- Process layout: vertical on mobile ---------- */
  var processLine = document.getElementById('process-line');
  function updateProcessLayout() {
    processLine.classList.toggle('vertical', window.innerWidth < 700);
  }
  window.addEventListener('resize', updateProcessLayout);
  updateProcessLayout();

  /* ---------- Contact form ---------- */
  var form = document.getElementById('contact-form');
  var submitBtn = document.getElementById('submit-btn');
  var confirmBox = document.getElementById('confirm-box');

  function setError(field, message) {
    var errEl = form.querySelector('[data-error-for="' + field + '"]');
    var inputEl = form.elements[field];
    if (message) {
      if (errEl) { errEl.textContent = message; errEl.hidden = false; }
      if (inputEl) inputEl.setAttribute('aria-invalid', 'true');
    } else {
      if (errEl) { errEl.textContent = ''; errEl.hidden = true; }
      if (inputEl) inputEl.removeAttribute('aria-invalid');
    }
  }

  function validate(data) {
    var errors = {};
    if (!data.name.trim()) errors.name = 'Ingresa tu nombre.';
    if (!data.country.trim()) errors.country = 'Ingresa tu país.';
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Ingresa un correo válido.';
    if (!data.type) errors.type = 'Selecciona un tipo de contacto.';
    if (!data.message.trim()) errors.message = 'Escribe tu mensaje.';
    if (!data.privacy) errors.privacy = 'Debes aceptar la política de privacidad.';
    return errors;
  }

  ['name', 'country', 'email', 'type', 'message', 'privacy'].forEach(function (field) {
    var el = form.elements[field];
    if (!el) return;
    el.addEventListener('input', function () { setError(field, null); });
    el.addEventListener('change', function () { setError(field, null); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = {
      name: form.elements.name.value,
      country: form.elements.country.value,
      email: form.elements.email.value,
      type: form.elements.type.value,
      message: form.elements.message.value,
      privacy: form.elements.privacy.checked,
      honeypot: form.elements.company_website.value
    };

    // Spam bot trap: silently drop submissions from bots that fill the hidden field.
    if (data.honeypot) return;

    var errors = validate(data);
    ['name', 'country', 'email', 'type', 'message', 'privacy'].forEach(function (field) {
      setError(field, errors[field] || null);
    });
    if (Object.keys(errors).length) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando…';

    // NOTA: no existe integración real de envío aún; se simula el estado de "enviado" localmente.
    setTimeout(function () {
      form.hidden = true;
      confirmBox.hidden = false;
    }, 700);
  });
})();
