import { productData } from './product-data.js';
import { renderProducts } from './render-products.js';

const $ = (s) => document.querySelector(s);

function getParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function findProduct() {
  const byName = decodeURIComponent(getParam('name') || '').trim().toLowerCase();
  const byId = getParam('id');

  const buckets = [
    ...(Object.values(productData.newProducts || {})),
    productData.saleProducts || [],
    ...(Object.values(productData.suggestProducts || {})),
  ];

  const all = buckets.flat();

  if (byId) {
    const p = all.find(x => String(x.id) === String(byId));
    if (p) return p;
  }
  if (byName) {
    const p = all.find(x => (x.name || '').toLowerCase() === byName);
    if (p) return p;
  }
  return all[0] || null;
}

function setText(el, v) {
  if (!el) return;
  if (!v) { 
    el.closest && el.closest('.mb-2, .mb-3, .d-flex')?.classList?.add('d-none'); 
    return; 
  }
  el.textContent = v;
}

function initQty() {
  const minus = $('#qtyMinus');
  const plus = $('#qtyPlus');
  const input = $('#qtyInput');
  
  if (minus && plus && input) {
    minus.addEventListener('click', () => {
      const currentValue = parseInt(input.value, 10) || 1;
      const newValue = Math.max(1, currentValue - 1);
      input.value = newValue;
    });
    
    plus.addEventListener('click', () => {
      const currentValue = parseInt(input.value, 10) || 1;
      const newValue = currentValue + 1;
      input.value = newValue;
    });
    
    // Đảm bảo giá trị không âm
    input.addEventListener('change', () => {
      if (parseInt(input.value, 10) < 1) {
        input.value = 1;
      }
    });
  }
}

function renderRelated() {
  const groups = productData.suggestProducts || {};
  const firstKey = Object.keys(groups)[0];
  if (firstKey) {
    renderProducts(firstKey, groups, 'relatedProducts');
  }
}

function updateProductInfo(product) {
  // Cập nhật tiêu đề trang
  document.title = `${product.name} - Lofi Pharma`;
  
  // Cập nhật breadcrumb và tiêu đề
  setText($('#pdPageTitle'), product.name);
  setText($('#pdBreadcrumb'), product.name);
  setText($('#pdTitle'), product.name);

  // Cập nhật giá
  const price = product.currentPrice || product.price || '';
  const oldPrice = product.oldPrice || '';
  setText($('#pdPrice'), price);
  
  if (oldPrice) {
    setText($('#pdOldPrice'), oldPrice);
  }

  // Cập nhật discount
  const discount = product.discount || '';
  if (discount) {
    const el = $('#pdDiscount');
    el.textContent = discount;
    el.classList.remove('d-none');
  }

  // Cập nhật brand
  const brand = product.brand || '';
  if (brand) {
    const b = $('#pdBrand');
    b.textContent = brand;
    b.href = 'products.html';
  } else {
    $('#pdBrand')?.closest('div')?.classList?.add('d-none');
  }

  // Cập nhật ảnh chính
  const main = $('#pdMainImg');
  main.src = product.image || 'assets/placeholder.png';
  main.alt = product.name || 'Sản phẩm';

  // Tạo thumbnail gallery
  const thumbs = $('#pdThumbs');
  thumbs.innerHTML = '';
  
  // Tạo 4 thumbnail giống nhau (có thể mở rộng sau)
  for (let i = 0; i < 4; i++) {
    const btn = document.createElement('button');
    btn.innerHTML = `<img src="${product.image || 'assets/placeholder.png'}" alt="${product.name} thumb ${i+1}">`;
    btn.dataset.index = String(i);
    if (i === 0) btn.classList.add('active');
    
    btn.addEventListener('click', () => {
      main.src = product.image || 'assets/placeholder.png';
      thumbs.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
    
    thumbs.appendChild(btn);
  }

  // Khởi tạo chức năng điều hướng ảnh
  initImageNavigation();

  // Cập nhật mô tả sản phẩm
  const desc = $('#pdDesc');
  if (desc) {
    desc.innerHTML = `
      <h4 class="fw-bold mb-3">Mô tả sản phẩm</h4>
      <h5 class="fw-semibold mb-2">Chống mẫn đỏ, tái tạo và chăm sóc da chuyên sâu</h5>
      <p>${product.name} là sản phẩm được thiết kế đặc biệt để chăm sóc làn da nhạy cảm, dễ bị mẫn đỏ. 
      Với công thức độc đáo, sản phẩm giúp:</p>
      <ul>
        <li>Làm dịu và giảm mẫn đỏ ngay lập tức</li>
        <li>Tái tạo và phục hồi làn da tổn thương</li>
        <li>Cung cấp độ ẩm sâu và lâu dài</li>
        <li>Tăng cường hàng rào bảo vệ da</li>
        <li>Phù hợp cho mọi loại da, đặc biệt là da nhạy cảm</li>
      </ul>
      <p class="mb-0">Sử dụng đều đặn hàng ngày để có kết quả tốt nhất.</p>
    `;
  }
}

// Thêm function điều hướng ảnh
function initImageNavigation() {
  const mainImg = $('#pdMainImg');
  const thumbs = $('#pdThumbs');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  if (!mainImg || !thumbs || !prevBtn || !nextBtn) return;
  
  let currentIndex = 0;
  const totalImages = thumbs.children.length;
  
  function updateNavButtons() {
    prevBtn.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
    nextBtn.style.visibility = currentIndex === totalImages - 1 ? 'hidden' : 'visible';
  }
  
  function playSlide(direction) {
    // direction: 'left' | 'right'
    mainImg.classList.remove('slide-in-left', 'slide-in-right');
    void mainImg.offsetWidth; // force reflow to restart animation
    mainImg.classList.add(direction === 'left' ? 'slide-in-left' : 'slide-in-right');
  }
  
  function updateMainImage(index, direction) {
    if (index < 0) index = 0;
    if (index >= totalImages) index = totalImages - 1;
    
    const dir = direction || (index > currentIndex ? 'right' : 'left');
    currentIndex = index;
    const activeThumb = thumbs.children[index];
    if (activeThumb) {
      const imgSrc = activeThumb.querySelector('img').src;
      mainImg.src = imgSrc;
      playSlide(dir);
      thumbs.querySelectorAll('button').forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
      });
    }
    updateNavButtons();
  }
  
  prevBtn.addEventListener('click', () => {
    updateMainImage(currentIndex - 1, 'left');
  });
  
  nextBtn.addEventListener('click', () => {
    updateMainImage(currentIndex + 1, 'right');
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      updateMainImage(currentIndex - 1, 'left');
    } else if (e.key === 'ArrowRight') {
      updateMainImage(currentIndex + 1, 'right');
    }
  });
  
  updateNavButtons();
}

document.addEventListener('DOMContentLoaded', () => {
  const product = findProduct();
  if (!product) {
    console.error('Không tìm thấy sản phẩm');
    return;
  }

  // Cập nhật thông tin sản phẩm
  updateProductInfo(product);

  // Khởi tạo các chức năng
  initQty();
  renderRelated();

  // Xử lý nút mua hàng
  $('#btnBuy')?.addEventListener('click', () => {
    const qty = parseInt($('#qtyInput').value, 10) || 1;
    alert(`Đã thêm ${qty} "${product.name}" vào giỏ hàng!`);
  });

  // Xử lý nút tìm nhà thuốc
  document.querySelector('a[href="#"]')?.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Tính năng tìm nhà thuốc đang được phát triển!');
  });
});
