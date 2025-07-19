// render-products.js
import { productData } from './product-data.js';

function findProduct(productId) {
  // Search in newProducts
  if (productData.newProducts) {
    for (const category in productData.newProducts) {
      const product = productData.newProducts[category].find(p => p.id === productId);
      if (product) return product;
    }
  }
  // Search in suggestProducts
  if (productData.suggestProducts) {
    for (const category in productData.suggestProducts) {
      const product = productData.suggestProducts[category].find(p => p.id === productId);
      if (product) return product;
    }
  }
  return null;
}

// Global functions for product interactions
window.addToCart = function(productId) {
  const product = findProduct(productId);
  if (product) {
    alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
  }
};

window.viewProduct = function(productId) {
  const product = findProduct(productId);
  if (product) {
    alert(`Xem chi tiết sản phẩm: "${product.name}"`);
  }
};

window.addToWishlist = function(productId) {
  const product = findProduct(productId);
  if (product) {
    alert(`Đã thêm "${product.name}" vào danh sách yêu thích!`);
  }
};


// Common function to render products for various purposes
export function renderProducts(category, dataSource, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const products = dataSource[category] || [];

  if (products.length === 0) {
    container.innerHTML = `<div class="suggest-empty-message">Sản phẩm đang được cập nhật.</div>`;
    return;
  }

  container.innerHTML = products.map(product => `
    <div class="card border-0 shadow-sm suggest-product-card position-relative h-100">
      ${product.discount ? `<span class="badge discount-badge position-absolute top-0 start-0 m-2 px-2 py-1">${product.discount}</span>` : ''}
      <div class="suggest-product-image-container position-relative overflow-hidden">
        <div class="hover-icons position-absolute top-0 end-0 m-2 d-flex flex-column gap-2">
          <button class="btn btn-white rounded-circle p-2 shadow-sm" title="Xem nhanh"><i class="bi bi-eye"></i></button>
          <button class="btn btn-white rounded-circle p-2 shadow-sm" title="Yêu thích"><i class="bi bi-heart"></i></button>
        </div>
        <img src="${product.image}" alt="${product.name}" class="suggest-product-image img-fluid">
      </div>
      <div class="suggest-product-info p-3 d-flex flex-column flex-grow-1">
        <h6 class="suggest-product-title mb-2">${product.name}</h6>
        <div class="suggest-product-prices mt-auto mb-2">
          <div class="d-flex align-items-center gap-2">
            <span class="suggest-price-current">${product.currentPrice}</span>
            ${product.oldPrice ? `<span class="suggest-price-old">${product.oldPrice}</span>` : ''}
          </div>
        </div>
      </div>
      <button class="btn btn-primary rounded-circle suggest-cart-button position-absolute" title="Thêm vào giỏ"><i class="bi bi-cart-plus"></i></button>
    </div>
  `).join('');
}

// Function to render sale products with Glide.js carousel
export function renderSaleProductsWithGlide(products, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (products.length === 0) {
    container.innerHTML = `<li class="glide__slide"><div class="suggest-empty-message">Sản phẩm đang được cập nhật.</div></li>`;
    return;
  }

  container.innerHTML = products.map(product => `
    <li class="glide__slide">
      <div class="card border-0 shadow-sm suggest-product-card position-relative h-100">
        ${product.discount ? `<span class="badge discount-badge position-absolute top-0 start-0 m-2 px-2 py-1">${product.discount}</span>` : ''}
        <div class="suggest-product-image-container position-relative overflow-hidden">
          <div class="hover-icons position-absolute top-0 end-0 m-2 d-flex flex-column gap-2">
            <button class="btn btn-white rounded-circle p-2 shadow-sm" title="Xem nhanh"><i class="bi bi-eye"></i></button>
            <button class="btn btn-white rounded-circle p-2 shadow-sm" title="Yêu thích"><i class="bi bi-heart"></i></button>
          </div>
          <img src="${product.image}" alt="${product.name}" class="suggest-product-image img-fluid">
        </div>
        <div class="suggest-product-info p-3 d-flex flex-column flex-grow-1">
          <h6 class="suggest-product-title mb-2">${product.name}</h6>
          <div class="suggest-product-prices mt-auto mb-2">
            <div class="d-flex align-items-center gap-2">
              <span class="suggest-price-current">${product.currentPrice}</span>
              ${product.oldPrice ? `<span class="suggest-price-old">${product.oldPrice}</span>` : ''}
            </div>
          </div>
        </div>
        <button class="btn btn-primary rounded-circle suggest-cart-button position-absolute" title="Thêm vào giỏ"><i class="bi bi-cart-plus"></i></button>
      </div>
    </li>
  `).join('');

  // Initialize Glide.js carousel
  if (typeof Glide !== 'undefined') {
    new Glide('#shock-sale-carousel', {
      type: 'carousel',
      perView: 4,
      gap: 20,
      breakpoints: {
        1200: {
          perView: 3
        },
        768: {
          perView: 2
        },
        576: {
          perView: 1
        }
      }
    }).mount();
  }
}
