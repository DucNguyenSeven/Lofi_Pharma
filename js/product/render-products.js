// render-products.js
import { productData } from './product-data.js';

function findProduct(productId) {
  for (const category in productData) {
    const product = productData[category].find(p => p.id === productId);
    if (product) return product;
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

export function renderProducts(category) {
  const list = document.getElementById('product-list');
  if (!list) return;
  const products = productData[category] || [];
  list.innerHTML = products.map(product => `
    <div class="col">
      <div class="card border-0 shadow-sm suggest-product-card position-relative h-100">
        <div class="suggest-product-image-container position-relative overflow-hidden">
          <div class="hover-icons position-absolute top-0 end-0 m-2 d-flex flex-column gap-2">
            <button class="btn btn-white rounded-circle p-2 shadow-sm" onclick="viewProduct(${product.id})" title="Xem nhanh">
              <i class="bi bi-eye"></i>
            </button>
            <button class="btn btn-white rounded-circle p-2 shadow-sm" onclick="addToWishlist(${product.id})" title="Yêu thích">
              <i class="bi bi-heart"></i>
            </button>
          </div>
          <img src="${product.image}" alt="${product.name}" class="suggest-product-image img-fluid">
        </div>
        
        <div class="suggest-product-info p-3 d-flex flex-column flex-grow-1">
          <h6 class="suggest-product-title mb-2">${product.name}</h6>
          
          <div class="suggest-product-prices mt-auto mb-2">
            <div class="d-flex align-items-center gap-2">
              <span class="suggest-price-current">${product.currentPrice}</span>
            </div>
          </div>
        </div>
        
        <button class="btn btn-primary rounded-circle suggest-cart-button position-absolute" onclick="addToCart(${product.id})" title="Thêm vào giỏ">
          <i class="bi bi-cart-plus"></i>
        </button>
      </div>
    </div>
  `).join('');
} 