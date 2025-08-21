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

  // Check if this is for mobile swiper
  if (containerId === 'new-products-mobile') {
    // Render for mobile swiper: 2 products per slide
    const chunkSize = 2;
    const chunks = [];
    for (let i = 0; i < products.length; i += chunkSize) {
      chunks.push(products.slice(i, i + chunkSize));
    }

    container.innerHTML = chunks.map((group, slideIdx) => `
      <div class="swiper-slide" data-slide-idx="${slideIdx}">
        <div class="row row-cols-2 g-2">
          ${group.map(product => {
            const detailHref = `product-detail.html?name=${encodeURIComponent(product.name)}`;
            return `
              <div class="col">
                <div class="card border-0 shadow-sm suggest-product-card position-relative h-100">
                  ${product.discount ? `<span class="badge discount-badge position-absolute top-0 start-0 m-2 px-2 py-1">${product.discount}</span>` : ''}
                  <div class="suggest-product-image-container position-relative overflow-hidden">
                    <a class="stretched-link" href="${detailHref}"></a>
                    <div class="hover-icons position-absolute top-0 end-0 m-2 d-flex flex-column gap-2">
                      <button class="btn btn-white rounded-circle p-2 shadow-sm" title="Xem nhanh"><i class="bi bi-eye"></i></button>
                      <button class="btn btn-white rounded-circle p-2 shadow-sm" title="Yêu thích"><i class="bi bi-heart"></i></button>
                    </div>
                    <img src="${product.image}" alt="${product.name}" class="suggest-product-image img-fluid">
                  </div>
                  <div class="suggest-product-info p-3 d-flex flex-column flex-grow-1">
                    <h6 class="suggest-product-title mb-2"><a href="${detailHref}" class="text-decoration-none text-dark">${product.name}</a></h6>
                    <div class="suggest-product-prices mt-auto mb-2">
                      <div class="d-flex align-items-center gap-2">
                        <span class="suggest-price-current">${product.currentPrice}</span>
                        ${product.oldPrice ? `<span class="suggest-price-old">${product.oldPrice}</span>` : ''}
                      </div>
                    </div>
                  </div>
                  <button class="btn btn-primary rounded-circle suggest-cart-button position-absolute" title="Thêm vào giỏ"><i class="bi bi-cart-plus"></i></button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `).join('');
  } else {
    // Render for desktop grid: 1 product per column
    container.innerHTML = products.map(product => {
      const detailHref = `product-detail.html?name=${encodeURIComponent(product.name)}`;
      return `
        <div class="col">
          <div class="card border-0 shadow-sm suggest-product-card position-relative h-100">
            ${product.discount ? `<span class="badge discount-badge position-absolute top-0 start-0 m-2 px-2 py-1">${product.discount}</span>` : ''}
            <div class="suggest-product-image-container position-relative overflow-hidden">
              <a class="stretched-link" href="${detailHref}"></a>
              <div class="hover-icons position-absolute top-0 end-0 m-2 d-flex flex-column gap-2">
                <button class="btn btn-white rounded-circle p-2 shadow-sm" title="Xem nhanh"><i class="bi bi-eye"></i></button>
                <button class="btn btn-white rounded-circle p-2 shadow-sm" title="Yêu thích"><i class="bi bi-heart"></i></button>
              </div>
              <img src="${product.image}" alt="${product.name}" class="suggest-product-image img-fluid">
            </div>
            <div class="suggest-product-info p-3 d-flex flex-column flex-grow-1">
              <h6 class="suggest-product-title mb-2"><a href="${detailHref}" class="text-decoration-none text-dark">${product.name}</a></h6>
              <div class="suggest-product-prices mt-auto mb-2">
                <div class="d-flex align-items-center gap-2">
                  <span class="suggest-price-current">${product.currentPrice}</span>
                  ${product.oldPrice ? `<span class="suggest-price-old">${product.oldPrice}</span>` : ''}
                </div>
              </div>
            </div>
            <button class="btn btn-primary rounded-circle suggest-cart-button position-absolute" title="Thêm vào giỏ"><i class="bi bi-cart-plus"></i></button>
          </div>
        </div>
      `;
    }).join('');
  }
}

export function renderSaleProductsWithGlide(products, containerId, bulletsContainerId = 'shock-sale-bullets') {
  const slidesUl = document.getElementById(containerId);
  if (!slidesUl) return;

  const bulletsEl = document.getElementById(bulletsContainerId) 
    || document.querySelector('#shock-sale-carousel .glide__bullets');

  if (!products || products.length === 0) {
    slidesUl.innerHTML = `
      <li class="glide__slide">
        <div class="suggest-empty-message text-center p-5">Sản phẩm đang được cập nhật.</div>
      </li>`;
    if (bulletsEl) bulletsEl.innerHTML = '';
    return;
  }

  const chunkSize = 4;
  const chunks = [];
  for (let i = 0; i < products.length; i += chunkSize) {
    chunks.push(products.slice(i, i + chunkSize));
  }

  slidesUl.innerHTML = chunks.map((group, slideIdx) => `
    <li class="glide__slide" data-slide-idx="${slideIdx}">
      <div class="row row-cols-2 row-cols-md-2 row-cols-lg-4 g-4 shock-sale-slide-row">
        ${group.map((p, i) => saleCardTpl(p, slideIdx, i)).join('')}
      </div>
    </li>
  `).join('');

  if (bulletsEl) {
    bulletsEl.innerHTML = chunks.map((_, i) => `
      <button class="glide__bullet" data-glide-dir="=${i}" aria-label="Trang ${i+1}"></button>
    `).join('');
  }

  if (typeof Glide !== 'undefined') {
    new Glide('#shock-sale-carousel', {
      type: 'carousel',
      perView: 1,
      gap: 0,
      focusAt: 0,
      animationDuration: 600,
      animationTimingFunc: 'cubic-bezier(0.165,0.84,0.44,1)',
      rewind: true
    }).mount();
  }

  attachSaleCardEvents(slidesUl, products);
}

function saleCardTpl(product, slideIdx, itemIdx) {
  const pid = product.id ?? `sale-${slideIdx}-${itemIdx}`;
  const detailHref = `product-detail.html?name=${encodeURIComponent(product.name)}`;
  return `
    <div class="col">
      <div class="card border-0 shadow-sm suggest-product-card position-relative h-100">
        ${product.discount ? `<span class="badge discount-badge position-absolute top-0 start-0 m-2 px-2 py-1">${product.discount}</span>` : ''}
        <div class="suggest-product-image-container position-relative overflow-hidden">
          <a class="stretched-link" href="${detailHref}"></a>
          <div class="hover-icons position-absolute top-0 end-0 m-2 d-flex flex-column gap-2">
            <button class="btn btn-white rounded-circle p-2 shadow-sm quick-view-btn" data-product-id="${pid}" title="Xem nhanh"><i class="bi bi-eye"></i></button>
            <button class="btn btn-white rounded-circle p-2 shadow-sm wishlist-btn" data-product-id="${pid}" title="Yêu thích"><i class="bi bi-heart"></i></button>
          </div>
          <img src="${product.image}" alt="${product.name}" class="suggest-product-image img-fluid">
        </div>
        <div class="suggest-product-info p-3 d-flex flex-column flex-grow-1">
          <h6 class="suggest-product-title mb-2"><a href="${detailHref}" class="text-decoration-none text-dark">${product.name}</a></h6>
          <div class="suggest-product-prices mt-auto mb-2">
            <div class="d-flex align-items-center gap-2">
              <span class="suggest-price-current">${product.currentPrice}</span>
              ${product.oldPrice ? `<span class="suggest-price-old">${product.oldPrice}</span>` : ''}
            </div>
          </div>
        </div>
        <button class="btn btn-primary rounded-circle suggest-cart-button position-absolute add-to-cart-btn" data-product-id="${pid}" title="Thêm vào giỏ"><i class="bi bi-cart-plus"></i></button>
      </div>
    </div>
  `;
}

function attachSaleCardEvents(rootEl, products) {
  const getProduct = (id) => products.find(p => p.id === id);

  rootEl.querySelectorAll('.quick-view-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const pid = btn.dataset.productId;
      const p = getProduct(pid);
      if (p) alert(`Xem nhanh: "${p.name}"`);
    });
  });

  rootEl.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const pid = btn.dataset.productId;
      const p = getProduct(pid);
      if (p) alert(`Yêu thích: "${p.name}"`);
    });
  });

  rootEl.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const pid = btn.dataset.productId;
      const p = getProduct(pid);
      if (p) alert(`Đã thêm vào giỏ: "${p.name}"`);
    });
  });
}