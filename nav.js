/* ═══════════════════════════════════════════
   CHINA CHEAT SHEET — Shared Navigation JS
═══════════════════════════════════════════ */

(function() {

  // ── Inject nav HTML into every page ──
  function buildNav() {
    var page = window.location.pathname.split('/').pop() || 'index.html';

    var links = [
      { href: 'tours.html',        label: 'Tours' },
      { href: 'destinations.html', label: 'Destinations' },
      { href: 'blog.html',         label: 'Travel Tips' },
      { href: 'about.html',        label: 'About' },
      { href: 'contact.html',      label: 'Contact' },
    ];

    var desktopLinks = links.map(function(l) {
      var active = (page === l.href) ? ' class="active"' : '';
      return '<li><a href="' + l.href + '"' + active + '>' + l.label + '</a></li>';
    }).join('');

    var mobileLinks = links.map(function(l) {
      var active = (page === l.href) ? ' active' : '';
      return '<a href="' + l.href + '" class="' + active + '">' + l.label + '</a>';
    }).join('');

    var html = [
      '<div class="nav-inner">',
        '<a href="index.html" class="nav-logo">China <span>Cheat Sheet</span></a>',
        '<ul class="nav-links">' + desktopLinks + '</ul>',
        '<a href="contact.html" class="nav-cta">Plan My Trip</a>',
        '<button class="nav-hamburger" id="nav-hamburger" aria-label="Open menu" aria-expanded="false">',
          '<span></span><span></span><span></span>',
        '</button>',
      '</div>',
      '<div class="nav-mobile" id="nav-mobile" role="navigation" aria-label="Mobile menu">',
        mobileLinks,
        '<a href="contact.html" class="nav-mobile-cta">Plan My Trip →</a>',
      '</div>',
    ].join('');

    var navbar = document.getElementById('navbar');
    if (navbar) navbar.innerHTML = html;
  }

  // ── Hamburger toggle ──
  function initHamburger() {
    var btn = document.getElementById('nav-hamburger');
    var menu = document.getElementById('nav-mobile');
    if (!btn || !menu) return;

    btn.addEventListener('click', function() {
      var isOpen = menu.classList.toggle('open');
      btn.classList.toggle('open', isOpen);
      btn.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
      if (!btn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
      }
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        menu.classList.remove('open');
        btn.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Scroll shrink ──
  function initScroll() {
    window.addEventListener('scroll', function() {
      var navbar = document.getElementById('navbar');
      if (!navbar) return;
      if (window.scrollY > 60) {
        navbar.style.boxShadow = '0 4px 20px rgba(26,20,16,0.15)';
      } else {
        navbar.style.boxShadow = '0 2px 16px rgba(26,20,16,0.10)';
      }
    });
  }

  // ── Run on DOM ready ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      buildNav();
      initHamburger();
      initScroll();
    });
  } else {
    buildNav();
    initHamburger();
    initScroll();
  }

})();
