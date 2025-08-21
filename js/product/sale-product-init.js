import { saleProducts } from './product-data.js';
import { renderSaleProductsWithGlide } from './render-products.js';

function isMobileViewport() {
  return window.matchMedia && window.matchMedia('(max-width: 767.98px)').matches;
}
function isTabletViewport() {
  return window.matchMedia && window.matchMedia('(min-width: 768px) and (max-width: 1024px)').matches;
}

function initShockSale() {
  renderSaleProductsWithGlide(saleProducts, 'shock-sale-slides');
}

document.addEventListener('DOMContentLoaded', () => {
  initShockSale();

  // Re-render when crossing mobile/desktop breakpoint so slide groups match (2 on mobile, 4 on desktop)
  let lastKey = `${isMobileViewport()}-${isTabletViewport()}`;
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const nowKey = `${isMobileViewport()}-${isTabletViewport()}`;
      if (nowKey !== lastKey) {
        lastKey = nowKey;
        initShockSale();
      }
    }, 200);
  });
});