export function initNavActive() {
  // Lấy đường dẫn hiện tại
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';
  
  // Xóa tất cả active classes hiện tại
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
  });
  
  // Set active class dựa trên trang hiện tại
  if (currentPage === 'index.html' || currentPage === '') {
    // Trang chủ
    const homeLink = document.querySelector('.nav-link[href="index.html"]');
    if (homeLink) {
      homeLink.classList.add('active');
    }
  } else if (currentPage === 'about.html') {
    // Trang giới thiệu
    const aboutLink = document.querySelector('.nav-link[href="about.html"]');
    if (aboutLink) {
      aboutLink.classList.add('active');
    }
  }
  // Có thể thêm các trang khác ở đây
}
