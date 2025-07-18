// Hiển thị/ẩn icon mũi tên lên khi scroll, hiệu ứng fade in + translateY
// Cuộn mượt lên đầu trang khi click

document.addEventListener("DOMContentLoaded", function () {
  const scrollTopBtn = document.getElementById("scroll-top");
  const notifyBtn = document.getElementById("notify-icon");
  const contactBtn = document.getElementById("contact-icon");

  // Hiện icon Chuông và Liên hệ với animation khi load trang
  setTimeout(function () {
    notifyBtn.classList.add("show");
    contactBtn.classList.add("show");
  }, 100); // delay nhỏ để trigger animation

  // Show/hide arrow up icon khi scroll
  function handleScroll() {
    if (window.scrollY > 100) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  }
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // init trạng thái khi load

  // Cuộn mượt lên đầu trang khi click icon mũi tên
  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}); 