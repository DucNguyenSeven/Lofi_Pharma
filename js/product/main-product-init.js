import { renderProducts } from './render-products.js';
import { productData } from './product-data.js';

document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.category-tab');
  renderProducts('tp', productData.newProducts, 'new-products'); // tab mặc định

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const category = tab.getAttribute('data-category');
      renderProducts(category, productData.newProducts, 'new-products');
    });
  });
});