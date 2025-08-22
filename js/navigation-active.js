export function initNavActive() {
  // Lấy đường dẫn hiện tại (chỉ tên file, không query/hash)
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';

  // Xóa tất cả active classes hiện tại
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach(link => link.classList.remove('active'));

  // Tìm link khớp theo tên file và set active
  // Ví dụ: health.html, products.html, video.html, contact.html, consultation.html, v.v.
  const selector = `.navbar-nav .nav-link[href$="${currentPage}"]`;
  let activeLink = document.querySelector(selector);

  // Trường hợp đặc biệt cho trang chủ (khi currentPage có thể rỗng)
  if (!activeLink && (currentPage === '' || currentPage === 'index.html')) {
    activeLink = document.querySelector('.navbar-nav .nav-link[href="index.html"]');
  }

  if (activeLink) {
    activeLink.classList.add('active');
  }
}
