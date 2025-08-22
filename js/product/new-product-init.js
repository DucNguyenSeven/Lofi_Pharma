import { renderProducts } from './render-products.js';
import { productData } from './product-data.js';

document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.category-tab');
  
  // Render products for both mobile and desktop
  function renderProductsForBoth(category) {
    renderProducts(category, productData.newProducts, 'new-products'); // Desktop grid
    renderProducts(category, productData.newProducts, 'new-products-mobile'); // Mobile swiper
  }
  
  renderProductsForBoth('tp'); // Default tab

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const category = tab.getAttribute('data-category');
      renderProductsForBoth(category);
    });
  });
});