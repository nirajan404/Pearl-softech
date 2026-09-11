(function () {
  'use strict';
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }
  ready(function () {
    var reducedMotion = false;
    try { reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

    setTimeout(function () {
      try {
        var all = document.querySelectorAll('.reveal');
        for (var i = 0; i < all.length; i++) all[i].classList.add('revealed');
      } catch (e) {}
    }, 2000);

    try {
      var toggle = document.querySelector('.menu-toggle');
      var menu = document.querySelector('.mobile-menu');
      if (toggle && menu) {
        toggle.addEventListener('click', function () {
          var open = menu.classList.toggle('open');
          toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        var links = menu.querySelectorAll('a');
        for (var i = 0; i < links.length; i++) {
          links[i].addEventListener('click', function () {
            menu.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
          });
        }
        document.addEventListener('click', function (ev) {
          if (!menu.classList.contains('open')) return;
          if (menu.contains(ev.target)) return;
          if (toggle.contains(ev.target)) return;
          menu.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      }
    } catch (e) {}

    try {
      var header = document.querySelector('.header');
      var bar = document.querySelector('.scroll-progress');
      var topBtn = document.querySelector('.back-to-top');
      function onScroll() {
        var y = window.pageYOffset || document.documentElement.scrollTop;
        if (header) header.classList.toggle('scrolled', y > 12);
        if (bar) {
          var max = document.documentElement.scrollHeight - window.innerHeight;
          bar.style.width = (max > 0 ? (y / max) * 100 : 0).toFixed(2) + '%';
        }
        if (topBtn) topBtn.classList.toggle('visible', y > 600);
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      if (topBtn) topBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
      });
    } catch (e) {}

    try {
      var reveals = document.querySelectorAll('.reveal');
      if (!reducedMotion && 'IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries, obs) {
          for (var i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
              entries[i].target.classList.add('revealed');
              obs.unobserve(entries[i].target);
            }
          }
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        for (var j = 0; j < reveals.length; j++) io.observe(reveals[j]);
      } else {
        for (var k = 0; k < reveals.length; k++) reveals[k].classList.add('revealed');
      }
    } catch (e) {
      var r2 = document.querySelectorAll('.reveal');
      for (var m = 0; m < r2.length; m++) r2[m].classList.add('revealed');
    }

    try {
      if (!reducedMotion) {
        var mags = document.querySelectorAll('.magnetic');
        for (var n = 0; n < mags.length; n++) {
          (function (btn) {
            btn.addEventListener('pointermove', function (ev) {
              var r = btn.getBoundingClientRect();
              var x = (ev.clientX - r.left - r.width / 2) * 0.08;
              var y = (ev.clientY - r.top - r.height / 2) * 0.08;
              btn.style.transform = 'translate(' + x + 'px,' + y + 'px)';
            });
            btn.addEventListener('pointerleave', function () { btn.style.transform = ''; });
          })(mags[n]);
        }
      }
    } catch (e) {}

    try {
      if (!reducedMotion) {
        var as = document.querySelectorAll('a[href]');
        for (var p = 0; p < as.length; p++) {
          (function (a) {
            var href = a.getAttribute('href');
            if (!href) return;
            if (href.charAt(0) === '#') return;
            if (/^(https?:|mailto:|tel:)/.test(href)) return;
            if (a.target) return;
            if (a.hostname && a.hostname !== window.location.hostname) return;
            a.addEventListener('click', function (ev) {
              if (ev.metaKey || ev.ctrlKey || ev.shiftKey) return;
              ev.preventDefault();
              document.body.classList.add('leaving');
              setTimeout(function () { window.location.href = href; }, 260);
            });
          })(as[p]);
        }
      }
    } catch (e) {}

    try {
      var faqItems = document.querySelectorAll('.faq');
      for (var q = 0; q < faqItems.length; q++) {
        (function (item) {
          var summary = item.querySelector('summary');
          if (!summary) return;
          summary.addEventListener('click', function (ev) {
            ev.preventDefault();
            var isOpen = item.hasAttribute('open');
            var allOpen = document.querySelectorAll('.faq[open]');
            for (var s = 0; s < allOpen.length; s++) {
              if (allOpen[s] !== item) allOpen[s].removeAttribute('open');
            }
            if (isOpen) item.removeAttribute('open');
            else item.setAttribute('open', '');
          });
        })(faqItems[q]);
      }
    } catch (e) {}

    try {
      var form = document.getElementById('contact-form');
      var success = document.getElementById('form-success');
      if (form && success) {
        form.addEventListener('submit', function (ev) {
          ev.preventDefault();
          success.textContent = 'Thanks — your enquiry has been received. We will reply within one business day.';
          success.classList.add('visible');
          form.reset();
        });
      }
    } catch (e) {}

    try {
      var page = document.body.getAttribute('data-page');
      if (page) {
        var navLinks = document.querySelectorAll('.desktop-nav a[data-page]');
        for (var t = 0; t < navLinks.length; t++) {
          if (navLinks[t].getAttribute('data-page') === page) navLinks[t].classList.add('active');
        }
      }
    } catch (e) {}

    try {
      var years = document.querySelectorAll('#year');
      var now = new Date().getFullYear();
      for (var u = 0; u < years.length; u++) years[u].textContent = now;
    } catch (e) {}
  });
})();