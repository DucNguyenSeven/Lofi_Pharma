(function () {
  const PAGE_SIZE = 12;
  const gridEl = document.getElementById('productGrid');
  const pagEl  = document.getElementById('pagination');
  const filtersDesktop = document.getElementById('filters-desktop');
  const filtersOffcanvas = document.getElementById('filters-offcanvas');

  const PRODUCTS = (window.PRODUCTS || window.products || []).map(normalizeProduct);

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

  function syncFilters() { [filtersDesktop, filtersOffcanvas].forEach(buildFilters); }

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
      <div class="col-6 col-md-4 col-lg-4">
        <div class="product-card position-relative h-100 p-3">
          ${discount ? `<span class="badge-sale">-${discount}%</span>` : ''}
          <img class="product-thumb mb-3" src="${escapeHtml(p.image || 'assets/placeholder.png')}" alt="${escapeHtml(p.name)}">
          <div class="product-title mb-1">${escapeHtml(p.name)}</div>
          <div class="d-flex align-items-baseline mb-4">
            <div class="price text-danger me-2">${formatVND(p.price)}</div>
            ${p.oldPrice > p.price ? `<div class="price-old">${formatVND(p.oldPrice)}</div>` : ''}
          </div>
          <div class="card-actions">
            <a href="#" class="icon-circle" title="Chi tiết" aria-label="Xem chi tiết"><i class="bi bi-info"></i></a>
            <a href="#" class="icon-circle" title="Thêm vào giỏ" aria-label="Thêm vào giỏ"><i class="bi bi-bag"></i></a>
          </div>
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

    items.push(make('&laquo;', Math.max(1, state.page-1), state.page===1, false));
    for (let i=1;i<=pages;i++) items.push(make(String(i), i, false, i===state.page));
    items.push(make('&raquo;', Math.min(pages, state.page+1), state.page===pages, false));
    pagEl.innerHTML = items.join('');
  }

  function highlightActiveSort(){
    document.querySelectorAll('.btn-sort').forEach(btn=>{
      btn.classList.toggle('active', btn.dataset.sort === state.sort);
    });
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

    [filtersDesktop, filtersOffcanvas].forEach(root=>{
      root.addEventListener('change', (e)=>{
        const t = e.target;
        if (t.classList.contains('brand-check')) {
          const val = t.value;
          if (t.checked) state.brands.add(val); else state.brands.delete(val);
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
    };
    document.getElementById('btnClearFilter')?.addEventListener('click', clearAll);
    document.getElementById('btnClearFilterMobile')?.addEventListener('click', clearAll);
  }

  function slugify(s){ return (s||'').toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }
  function escapeHtml(s){ return (s??'').toString().replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m])); }

  document.addEventListener('DOMContentLoaded', function(){
    syncFilters();
    attachEvents();
    renderGrid();
  });
})();
