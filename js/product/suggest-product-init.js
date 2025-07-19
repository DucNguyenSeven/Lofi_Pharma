import { renderProducts } from './render-products.js';
import { productData } from './product-data.js';

document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.suggest-tab');
  renderProducts('thuoc-bo', productData.suggestProducts, 'suggest-products'); // Default tab

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');
      renderProducts(category, productData.suggestProducts, 'suggest-products');
    });
  });
});