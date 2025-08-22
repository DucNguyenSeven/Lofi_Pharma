import { renderProducts } from './render-products.js';
import { productData } from './product-data.js';

document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.suggest-tab');

  function renderSuggestForBoth(category) {
    // Desktop/Tablet grid
    renderProducts(category, productData.suggestProducts, 'suggest-products');
    // Mobile swiper
    renderProducts(category, productData.suggestProducts, 'suggest-products-mobile');
  }

  function isMobileViewport() {
    return window.matchMedia && window.matchMedia('(max-width: 767.98px)').matches;
  }
  function isTabletViewport() {
    return window.matchMedia && window.matchMedia('(min-width: 768px) and (max-width: 1024px)').matches;
  }

  // Default category
  renderSuggestForBoth('thuoc-bo');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const category = tab.getAttribute('data-category');
      renderSuggestForBoth(category);
    });
  });

  // Re-render when crossing breakpoints so per-slide grouping updates (mobile=2, tablet=3)
  let lastKey = `${isMobileViewport()}-${isTabletViewport()}`;
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const nowKey = `${isMobileViewport()}-${isTabletViewport()}`;
      if (nowKey !== lastKey) {
        lastKey = nowKey;
        const active = document.querySelector('.suggest-tab.active');
        const category = active ? active.getAttribute('data-category') : 'thuoc-bo';
        renderSuggestForBoth(category);
      }
    }, 200);
  });
});