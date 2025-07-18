// render-products.js
import { productData } from './product-data.js';

export function renderProducts(category) {
  const list = document.getElementById('product-list');
  if (!list) return;
  const products = productData[category] || [];
  list.innerHTML = products.map(product => `
    <div class="col">
      <div class="product-card position-relative h-100 bg-white rounded shadow-sm p-3">
        <div class="position-absolute top-0 end-0 d-flex gap-2 p-2 z-2">
          <button class="btn btn-light btn-sm rounded-circle shadow-sm" title="Xem nhanh"><i class="bi bi-eye"></i></button>
          <button class="btn btn-light btn-sm rounded-circle shadow-sm" title="Yêu thích"><i class="bi bi-heart"></i></button>
        </div>
        ${product.discount ? `<span class="badge bg-danger position-absolute top-0 start-0 m-2 fs-6 px-2 py-1 rounded">${product.discount}</span>` : ''}
        <img src="${product.image}" class="img-fluid w-100 mb-2 rounded product-image" alt="${product.name}">
        <div class="fw-bold mb-1 product-title">${product.name}</div>
        <div class="d-flex align-items-end gap-2 mb-2">
          <span class="text-danger fw-bold product-price-current">${product.currentPrice}</span>
          ${product.oldPrice ? `<span class="text-muted text-decoration-line-through product-price-old">${product.oldPrice}</span>` : ''}
        </div>
        <button class="btn btn-primary rounded-circle position-absolute bottom-0 end-0 m-2 shadow cart-button-size"><i class="bi bi-cart-plus fs-5"></i></button>
      </div>
    </div>
  `).join('');
} 