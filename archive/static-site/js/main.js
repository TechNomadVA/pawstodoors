/**
 * Olivia's Gift — minimal shared JS
 * Nav behaviour and any shared UI (non-blocking)
 */

(function () {
  'use strict';

  // Optional: mark current page in nav (if not already set in HTML)
  var nav = document.querySelector('.main-nav');
  if (nav) {
    var path = window.location.pathname.replace(/\/$/, '') || '/';
    var base = path.split('/').pop() || 'index.html';
    nav.querySelectorAll('a').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      if (href === base || (base === '' && href === 'index.html')) {
        a.setAttribute('aria-current', 'page');
      }
    });
  }
})();
