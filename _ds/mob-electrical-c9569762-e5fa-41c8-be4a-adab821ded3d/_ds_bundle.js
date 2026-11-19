/* @ds-bundle: {"format":3,"namespace":"MobElectrical_c95697","components":[],"sourceHashes":{"js/main.js":"d5325766b735"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MobElectrical_c95697 = window.MobElectrical_c95697 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// js/main.js
try { (() => {
/* ==========================================================================
   THE ELECTRICAL MOB — main.js
   Nav, scroll reveal, project filters, contact form, header state
   ========================================================================== */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    /* ---- 1. Mobile menu toggle ---- */
    var menuBtn = document.getElementById('mobileMenuBtn');
    var nav = document.getElementById('navigationMenu');
    if (menuBtn && nav) {
      menuBtn.addEventListener('click', function () {
        var open = nav.classList.toggle('open');
        menuBtn.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
      });
      // close when a link is tapped
      nav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          nav.classList.remove('open');
          menuBtn.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }

    /* ---- 2. Header shadow on scroll ---- */
    var header = document.querySelector('.header');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('scrolled', window.scrollY > 12);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, {
        passive: true
      });
    }

    /* ---- 3. Active nav link by current page ---- */
    var path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === path || path === '' && href === 'index.html') {
        link.classList.add('active');
      }
    });

    /* ---- 4. Scroll reveal ---- */
    var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    var show = function (el) {
      el.classList.add('in-view');
    };

    // Reveal anything already within (or near) the viewport right away,
    // so above-the-fold content never sits invisible.
    var revealVisible = function () {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      revealEls.forEach(function (el) {
        if (el.classList.contains('in-view')) return;
        var r = el.getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) show(el);
      });
    };
    if ('IntersectionObserver' in window && revealEls.length) {
      var io = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            show(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -8% 0px'
      });
      revealEls.forEach(function (el) {
        io.observe(el);
      });
      revealVisible();
      window.addEventListener('load', revealVisible);
      window.addEventListener('scroll', revealVisible, {
        passive: true
      });
      // Safety net: never leave content hidden.
      setTimeout(function () {
        revealEls.forEach(show);
      }, 2500);
    } else {
      revealEls.forEach(show);
    }

    /* ---- 5. Project filters ---- */
    var filterBtns = document.querySelectorAll('.filter-btn');
    var projectCards = document.querySelectorAll('.project-card');
    if (filterBtns.length && projectCards.length) {
      filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          filterBtns.forEach(function (b) {
            b.classList.remove('active');
          });
          btn.classList.add('active');
          var filter = btn.getAttribute('data-filter');
          projectCards.forEach(function (card) {
            var cat = card.getAttribute('data-category');
            var show = filter === 'all' || cat === filter || filter === 'industrial' && (cat === 'industrial' || cat === 'mining');
            card.classList.toggle('hide', !show);
          });
        });
      });
    }

    /* ---- 6. Contact form (front-end validation + feedback) ---- */
    var form = document.getElementById('contactForm');
    var status = document.getElementById('formStatus');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = document.getElementById('formName');
        var email = document.getElementById('formEmail');
        var message = document.getElementById('formMessage');
        var fields = [name, email, message];
        var valid = true;
        fields.forEach(function (f) {
          if (!f) return;
          f.classList.remove('error');
          if (!f.value.trim()) {
            f.classList.add('error');
            valid = false;
          }
        });
        var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && email.value.trim() && !emailRe.test(email.value.trim())) {
          email.classList.add('error');
          valid = false;
        }
        if (!status) return;
        if (!valid) {
          status.className = 'form-status error';
          status.textContent = 'Please complete the required fields with a valid email address.';
          return;
        }
        status.className = 'form-status success';
        status.textContent = 'Thank you — your enquiry has been received. Our operations team will respond shortly.';
        form.reset();
        status.scrollIntoView ? null : null; // no-op (avoid scrollIntoView)
      });
    }
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "js/main.js", error: String((e && e.message) || e) }); }

})();
