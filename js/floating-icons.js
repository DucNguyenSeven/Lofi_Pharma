document.addEventListener("DOMContentLoaded", function () {
  const scrollTopBtn = document.getElementById("scroll-top");
  const notifyBtn = document.getElementById("notify-icon");
  const contactBtn = document.getElementById("contact-icon");
  const notifyPanel = document.getElementById("notify-panel");
  const notifyCloseBtn = document.getElementById("notify-close");
  const contactPanel = document.getElementById("contact-panel");
  const contactCloseBtn = document.getElementById("contact-close");

  contactBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    contactPanel.classList.toggle("show");
  });
  setTimeout(function () {
    notifyBtn.classList.add("show", "ring-animation");
    contactPanel.classList.remove("show");   //ẩn panel liên hệ 
    contactBtn.classList.add("show", "ring-animation");
  }, 100);

  // Toggle notification panel
  notifyBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    notifyPanel.classList.toggle("show");
    notifyPanel.classList.remove("show");
  });

  // Close button inside panel
  notifyCloseBtn.addEventListener("click", function () {
    notifyPanel.classList.remove("show");
  });

  // Click outside to close
  document.addEventListener("click", function (e) {
    if (!notifyPanel.contains(e.target) && !notifyBtn.contains(e.target)) {
      notifyPanel.classList.remove("show");
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
});