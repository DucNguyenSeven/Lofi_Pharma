/**
 * Floating Icons Module
 */

export function initFloatingIcons() {
  const scrollTopBtn = document.getElementById("scroll-top");
  const notifyBtn = document.getElementById("notify-icon");
  const contactBtn = document.getElementById("contact-icon");
  const notifyPanel = document.getElementById("notify-panel");
  const notifyCloseBtn = document.getElementById("notify-close");
  const contactPanel = document.getElementById("contact-panel");
  const contactCloseBtn = document.getElementById("contact-close");

  // Kiểm tra xem các elements có tồn tại không
  if (!scrollTopBtn || !notifyBtn || !contactBtn || !notifyPanel || !contactPanel) {
    console.warn('Floating icons elements not found, skipping initialization');
    return;
  }

  // Add references to icon and label inside Liên hệ button
  const contactIconEl = contactBtn.querySelector("i");
  const contactLabelEl = contactBtn.querySelector(".contact-label");

  // Toggle contact panel
  contactBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    const isOpen = contactPanel.classList.toggle("show");

    // sync button appearance
    if (isOpen) {
      contactBtn.classList.add("open");
      contactIconEl.className = "bi bi-x-lg";
      contactLabelEl.style.display = "none";
      notifyPanel.classList.remove("show");
    } else {
      contactBtn.classList.remove("open");
      contactIconEl.className = "bi bi-chat-dots-fill";
      contactLabelEl.style.display = "";
    }
  });

  setTimeout(function () {
    notifyBtn.classList.add("show", "ring-animation");
    contactPanel.classList.remove("show"); //ẩn panel liên hệ
    contactBtn.classList.add("show", "ring-animation");
  }, 100);

  // Toggle notification panel
  notifyBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    // Hide contact panel & reset button before showing notifyPanel
    contactPanel.classList.remove("show");
    contactBtn.classList.remove("open");
    contactIconEl.className = "bi bi-chat-dots-fill";
    contactLabelEl.style.display = "";
    notifyPanel.classList.toggle("show");
  });

  // Close button inside panel
  notifyCloseBtn.addEventListener("click", function () {
    notifyPanel.classList.remove("show");
  });
  
  // Nút đóng (✖)
  contactCloseBtn.addEventListener("click", function () {
    contactPanel.classList.remove("show");
    contactBtn.classList.remove("open");
    contactIconEl.className = "bi bi-chat-dots-fill";
    contactLabelEl.style.display = "";
  });
  
  // Click outside to close
  document.addEventListener("click", function (e) {
    if (!notifyPanel.contains(e.target) && !notifyBtn.contains(e.target)) {
      notifyPanel.classList.remove("show");
    }
    if (!contactPanel.contains(e.target) && !contactBtn.contains(e.target)) {
      contactPanel.classList.remove("show");
      contactBtn.classList.remove("open");
      contactIconEl.className = "bi bi-chat-dots-fill";
      contactLabelEl.style.display = "";
    }
  });

  function handleScroll() {
    if (window.scrollY > 100) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  }
  
  window.addEventListener("scroll", handleScroll);
  handleScroll();

  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Legacy support for direct script loading
if (typeof document !== 'undefined') {
  document.addEventListener("DOMContentLoaded", initFloatingIcons);
}
