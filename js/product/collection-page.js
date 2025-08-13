import { productData } from './product-data.js';

const PAGE_SIZE = 12;
const gridEl = document.getElementById('productGrid');
const pagEl  = document.getElementById('pagination');
let filtersDesktop = document.getElementById('filters-desktop');
let filtersOffcanvas = document.getElementById('filters-offcanvas');
  
  // Combine all products from different categories
  const allProducts = [];
  
  // Add new products
  if (productData.newProducts) {
    Object.values(productData.newProducts).forEach(category => {
      category.forEach(product => {
        allProducts.push({
          ...product,
          id: product.id || Math.random().toString(36).substr(2, 9),
          brand: product.brand || 'Khác',
          price: toNumber(product.currentPrice),
          oldPrice: toNumber(product.oldPrice),
          image: product.image || 'assets/placeholder.png',
          createdAt: Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000 // Random date within 30 days
        });
      });
    });
  }
  
  // Add sale products
  if (productData.saleProducts) {
    productData.saleProducts.forEach(product => {
      allProducts.push({
        ...product,
        id: product.id || Math.random().toString(36).substr(2, 9),
        brand: product.brand || 'Khác',
        price: toNumber(product.currentPrice),
        oldPrice: toNumber(product.oldPrice),
        image: product.image || 'assets/placeholder.png',
        createdAt: Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      });
    });
  }
  
  // Add suggest products
  if (productData.suggestProducts) {
    Object.values(productData.suggestProducts).forEach(category => {
      category.forEach(product => {
        allProducts.push({
          ...product,
          id: product.id || Math.random().toString(36).substr(2, 9),
          brand: product.brand || 'Khác',
          price: toNumber(product.currentPrice),
          oldPrice: toNumber(product.oldPrice),
          image: product.image || 'assets/placeholder.png',
          createdAt: Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
        });
      });
    });
  }
  
  const PRODUCTS = allProducts.map(normalizeProduct);

  function normalizeProduct(p, idx) {
    return {
      id: p.id ?? idx + 1,
      name: p.name ?? p.title ?? '',
      brand: p.brand ?? p.manufacturer ?? 'Khác',
      price: toNumber(p.price ?? p.currentPrice ?? 0),
      oldPrice: toNumber(p.oldPrice ?? p.compareAt ?? p.listPrice ?? 0),
      image: p.image ?? p.thumbnail ?? (Array.isArray(p.images) ? p.images[0] : ''),
      createdAt: p.createdAt ?? p.date ?? Date.now() - idx * 8.64e7
    };
  }
  function toNumber(v){ return typeof v === 'string' ? +v.toString().replace(/[^\d]/g,'') : +v || 0; }
  function formatVND(n){ return n.toLocaleString('vi-VN') + 'đ'; }

  let state = {
    brands: new Set(),
    priceRange: null,
    sort: 'default',
    page: 1
  };

  const PRICE_RANGES = [
    { key: 'lt-500', label: 'Giá dưới 500.000đ', test: p => p.price < 500_000 },
    { key: '500-1m', label: '500.000đ - 1.000.000đ', test: p => p.price >= 500_000 && p.price < 1_000_000 },
    { key: '1-3m', label: '1.000.000đ - 3.000.000đ', test: p => p.price >= 1_000_000 && p.price < 3_000_000 },
    { key: '3-5m', label: '3.000.000đ - 5.000.000đ', test: p => p.price >= 3_000_000 && p.price < 5_000_000 },
    { key: '5-7m', label: '5.000.000đ - 7.000.000đ', test: p => p.price >= 5_000_000 && p.price < 7_000_000 },
    { key: 'gt-7m', label: 'Giá trên 7.000.000đ', test: p => p.price >= 7_000_000 },
  ];

  function buildFilters(targetEl){
    const brandsFromData = (window.BRANDS || []);
    const brandsFromProducts = [...new Set(PRODUCTS.map(p => p.brand).filter(Boolean))];
    const brands = [...new Set([...brandsFromData, ...brandsFromProducts])].sort((a,b)=>a.localeCompare(b,'vi'));

    targetEl.innerHTML = `
      <div class="mb-3">
        <div class="filter-title">Thương hiệu</div>
        <div class="brands-list">
          ${brands.map(b => `
            <div class="form-check">
              <input class="form-check-input brand-check" type="checkbox" value="${escapeHtml(b)}" id="brand-${slugify(b)}">
              <label class="form-check-label" for="brand-${slugify(b)}">${b}</label>
            </div>
          `).join('')}
        </div>
      </div>
      <hr class="filter-divider">
      <div class="mt-3">
        <div class="filter-title">Chọn mức giá</div>
        ${PRICE_RANGES.map(r => `
          <div class="form-check">
            <input class="form-check-input price-check" type="radio" name="price-range" id="pr-${r.key}" value="${r.key}">
            <label class="form-check-label" for="pr-${r.key}">${r.label}</label>
          </div>
        `).join('')}
      </div>
    `;
  }

  function syncFilters() { [filtersDesktop, filtersOffcanvas].filter(Boolean).forEach(buildFilters); }

  const SORTERS = {
    'default': (a,b)=> a.id - b.id,
    'az': (a,b)=> a.name.localeCompare(b.name,'vi'),
    'za': (a,b)=> b.name.localeCompare(a.name,'vi'),
    'price-asc': (a,b)=> a.price - b.price,
    'price-desc': (a,b)=> b.price - a.price,
    'newest': (a,b)=> new Date(b.createdAt) - new Date(a.createdAt),
    'oldest': (a,b)=> new Date(a.createdAt) - new Date(b.createdAt),
  };

  function getFiltered() {
    let arr = PRODUCTS.slice();
    if (state.brands.size) arr = arr.filter(p => state.brands.has(p.brand));
    if (state.priceRange) {
      const r = PRICE_RANGES.find(x => x.key === state.priceRange);
      if (r) arr = arr.filter(r.test);
    }
    arr.sort(SORTERS[state.sort] || SORTERS.default);
    return arr;
  }

  function renderGrid() {
    const items = getFiltered();
    const total = items.length;
    const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    state.page = Math.min(state.page, pages);

    const start = (state.page - 1) * PAGE_SIZE;
    const slice = items.slice(start, start + PAGE_SIZE);

    gridEl.innerHTML = slice.map(cardTemplate).join('') || emptyTemplate();

    renderPagination(pages);
    highlightActiveSort();
  }

  function cardTemplate(p) {
    const discount = p.oldPrice > p.price ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
    return `
      <div class="col-6 col-md-4 col-lg-3">
        <div class="card border-0 shadow-sm suggest-product-card position-relative h-100">
          ${discount ? `<span class="badge discount-badge position-absolute top-0 start-0 m-2 px-2 py-1">-${discount}%</span>` : ''}
          <div class="suggest-product-image-container position-relative overflow-hidden">
            <div class="hover-icons position-absolute top-0 end-0 m-2 d-flex flex-column gap-2">
              <button class="btn btn-white rounded-circle p-2 shadow-sm" title="Xem nhanh"><i class="bi bi-eye"></i></button>
              <button class="btn btn-white rounded-circle p-2 shadow-sm" title="Yêu thích"><i class="bi bi-heart"></i></button>
            </div>
            <img src="${escapeHtml(p.image || 'assets/placeholder.png')}" alt="${escapeHtml(p.name)}" class="suggest-product-image img-fluid">
          </div>
          <div class="suggest-product-info p-3 d-flex flex-column flex-grow-1">
            <h6 class="suggest-product-title mb-2">${escapeHtml(p.name)}</h6>
            <div class="suggest-product-prices mt-auto mb-2">
              <div class="d-flex align-items-center gap-2">
                <span class="suggest-price-current">${formatVND(p.price)}</span>
                ${p.oldPrice > p.price ? `<span class="suggest-price-old">${formatVND(p.oldPrice)}</span>` : ''}
              </div>
            </div>
          </div>
          <button class="btn btn-primary rounded-circle suggest-cart-button position-absolute" title="Thêm vào giỏ"><i class="bi bi-cart-plus"></i></button>
        </div>
      </div>
    `;
  }
  function emptyTemplate(){ return `<div class="col-12 text-center text-muted py-5">Không có sản phẩm phù hợp.</div>`; }

  function renderPagination(pages) {
    const items = [];
    const make = (label, page, disabled=false, active=false) =>
      `<li class="page-item ${disabled?'disabled':''} ${active?'active':''}">
         <a class="page-link" href="#" data-page="${page}">${label}</a>
       </li>`;

    // Previous button - chỉ hiển thị khi không ở trang 1
    if (state.page > 1) {
      items.push(make('<i class="bi bi-chevron-left"></i>', state.page-1, false, false));
    }
    
    // Page numbers - chỉ hiển thị 3 trang
    const startPage = Math.max(1, Math.min(state.page - 1, pages - 2));
    const endPage = Math.min(pages, startPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
      items.push(make(String(i), i, false, i === state.page));
    }
    
    // Next button - chỉ hiển thị khi không ở trang cuối
    if (state.page < pages) {
      items.push(make('<i class="bi bi-chevron-right"></i>', state.page+1, false, false));
    }
    
    pagEl.innerHTML = items.join('');
  }

  function highlightActiveSort(){
    document.querySelectorAll('.btn-sort').forEach(btn=>{
      btn.classList.toggle('active', btn.dataset.sort === state.sort);
    });
  }

  function updateClearButtonsVisibility(){
    const shouldShow = state.brands.size > 0;
    const btnDesktop = document.getElementById('btnClearFilter');
    const btnMobile  = document.getElementById('btnClearFilterMobile');
    btnDesktop?.classList.toggle('d-none', !shouldShow);
    btnMobile?.classList.toggle('d-none', !shouldShow);
  }

  function attachEvents(){
    document.querySelectorAll('.btn-sort').forEach(btn=>{
      btn.addEventListener('click', (e)=>{
        e.preventDefault();
        state.sort = btn.dataset.sort || 'default';
        state.page = 1;
        renderGrid();
      });
    });

    pagEl.addEventListener('click', (e)=>{
      const a = e.target.closest('[data-page]');
      if (!a) return;
      e.preventDefault();
      state.page = parseInt(a.dataset.page, 10) || 1;
      renderGrid();
      const sec = document.querySelector('.products-section');
      if (sec) window.scrollTo({ top: sec.offsetTop - 60, behavior: 'smooth' });
    });

    [filtersDesktop, filtersOffcanvas].filter(Boolean).forEach(root=>{
      root.addEventListener('change', (e)=>{
        const t = e.target;
        if (t.classList.contains('brand-check')) {
          const val = t.value;
          if (t.checked) state.brands.add(val); else state.brands.delete(val);
          updateClearButtonsVisibility();
        }
        if (t.classList.contains('price-check')) {
          state.priceRange = t.checked ? t.value : null;
          document.querySelectorAll('.price-check').forEach(r => { if (r !== t) r.checked = r.value === state.priceRange; });
        }
        state.page = 1;
        renderGrid();
      });
    });

    const clearAll = ()=>{
      state.brands.clear();
      state.priceRange = null;
      document.querySelectorAll('.brand-check, .price-check').forEach(i=>{ i.checked=false; });
      renderGrid();
      updateClearButtonsVisibility();
    };
    document.getElementById('btnClearFilter')?.addEventListener('click', (e)=>{ e.preventDefault(); clearAll(); });
    document.getElementById('btnClearFilterMobile')?.addEventListener('click', (e)=>{ e.preventDefault(); clearAll(); });
  }

  function slugify(s){ return (s||'').toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }
  function escapeHtml(s){ return (s??'').toString().replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m])); }

  document.addEventListener('DOMContentLoaded', function(){
    // Re-query after full DOM is parsed so offcanvas container exists
    filtersDesktop = document.getElementById('filters-desktop');
    filtersOffcanvas = document.getElementById('filters-offcanvas');
    syncFilters();
    attachEvents();
    renderGrid();
    updateClearButtonsVisibility();
  });
