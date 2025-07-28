document.addEventListener("DOMContentLoaded", function () {
  const scrollTopBtn = document.getElementById("scroll-top");
  const notifyBtn = document.getElementById("notify-icon");
  const contactBtn = document.getElementById("contact-icon");

  setTimeout(function () {
    notifyBtn.classList.add("show", "ring-animation");
    contactBtn.classList.add("show", "ring-animation");
  }, 100);

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