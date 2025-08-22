// Hover mega menu cho desktop (≥992px). Mobile giữ hành vi click mặc định.
(function () {
  var DESKTOP_MQ = window.matchMedia('(min-width: 992px)');
  var OPEN_DELAY = 120;   // hover intent
  var CLOSE_DELAY = 200;

  function setupDropdown(dropdown) {
    var toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');
    var menu = dropdown.querySelector('.dropdown-menu');
    
    if (!toggle || !menu) return;

    var openTimer = null;
    var closeTimer = null;

    function clearTimers() {
      if (openTimer) { clearTimeout(openTimer); openTimer = null; }
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
    }

    function open() {
      clearTimers();
      openTimer = setTimeout(function () {
        // Thêm class show trực tiếp
        dropdown.classList.add('show');
        menu.classList.add('show');
        toggle.setAttribute('aria-expanded', 'true');
      }, OPEN_DELAY);
    }

    function close() {
      clearTimers();
      closeTimer = setTimeout(function () {
        // Xóa class show trực tiếp
        dropdown.classList.remove('show');
        menu.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
      }, CLOSE_DELAY);
    }

    function onEnter() { 
      if (DESKTOP_MQ.matches) open(); 
    }
    function onLeave() { 
      if (DESKTOP_MQ.matches) close(); 
    }

    dropdown.addEventListener('mouseenter', onEnter);
    dropdown.addEventListener('mouseleave', onLeave);

    // Giữ mở khi rê trong menu
    menu.addEventListener('mouseenter', function () {
      if (DESKTOP_MQ.matches) clearTimers();
    });

    toggle.addEventListener('click', function (e) {
      if (!DESKTOP_MQ.matches) return;
      e.preventDefault();
      var href = toggle.getAttribute('href');
      if (href && href !== '#') {
        window.location.href = href;
      }
    });

    // Keyboard accessibility
    toggle.addEventListener('focus', onEnter);
    toggle.addEventListener('blur', onLeave);
    menu.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        close();
        toggle.focus();
      }
    });

    // Click ngoài để đóng (desktop)
    document.addEventListener('click', function (e) {
      if (!DESKTOP_MQ.matches) return;
      if (!dropdown.contains(e.target)) close();
    });

    // Chuyển breakpoint: reset trạng thái
    DESKTOP_MQ.addEventListener('change', function (e) {
      clearTimers();
      if (!e.matches) {
        close();
      }
    });
  }

  // Thử setup ngay lập tức và sau khi DOM load
  function initMegaMenu() {
    var megaDropdowns = document.querySelectorAll('.dropdown-mega');
    megaDropdowns.forEach(setupDropdown);
  }

  // Thử setup ngay lập tức
  initMegaMenu();

  // Setup sau khi DOM load
  document.addEventListener('DOMContentLoaded', function () {
    initMegaMenu();
  });

  // Setup sau khi window load (để đảm bảo partials đã load)
  window.addEventListener('load', function () {
    setTimeout(initMegaMenu, 100); // Delay nhỏ để đảm bảo partials load xong
  });
})();
