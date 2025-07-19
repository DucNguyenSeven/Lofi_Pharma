import { saleProducts } from './product-data.js';
import { renderSaleProductsWithGlide } from './render-products.js';

document.addEventListener('DOMContentLoaded', () => {
  renderSaleProductsWithGlide(saleProducts, 'shock-sale-slides');
});