document.addEventListener('DOMContentLoaded', function() {
  const productData = {
    'thuoc-bo': [
      {
        id: 1,
        name: 'Viên uống bổ gan Hepamax 30 viên',
        image: 'assets/ezgif-com-webp-to-jpg-1-337f8ce6-cb61-467e-adda-506259baa032.png',
        currentPrice: '125.000đ',
        oldPrice: '150.000đ',
        discount: '-17%'
      },
      {
        id: 2,
        name: 'Thuốc bổ thận Nephromax hộp 60 viên',
        image: 'assets/ezgif-com-webp-to-jpg-2-2583af64-aa34-4efb-a887-5347a1b405a4.png',
        currentPrice: '280.000đ',
        oldPrice: '320.000đ',
        discount: '-13%'
      },
      {
        id: 3,
        name: 'Viên uống bổ máu Hemamax chai 100 viên',
        image: 'assets/ezgif-com-webp-to-jpg-1-ec8b98f6-5809-428c-b6d5-aa2ecb98bdaa.png',
        currentPrice: '95.000đ',
        oldPrice: '110.000đ',
        discount: '-14%'
      },
      {
        id: 4,
        name: 'Thuốc bổ tim mạch Cardiomax 30 viên',
        image: 'assets/ezgif-com-webp-to-jpg-2-3a132703-4b26-4a28-8e63-cc587d90b5f6.png',
        currentPrice: '165.000đ',
        oldPrice: '190.000đ',
        discount: '-13%'
      },
      {
        id: 5,
        name: 'Viên uống bổ phổi Pulmomax hộp 60 viên',
        image: 'assets/ezgif-com-webp-to-jpg-2-8a4a3cdf-04f2-4c31-9362-30729a08fa5b.png',
        currentPrice: '210.000đ',
        oldPrice: '240.000đ',
        discount: '-13%'
      }
    ],
    'vitamin': [
      {
        id: 6,
        name: 'Vitamin C 1000mg Nature Made 100 viên',
        image: 'assets/ezgif-com-webp-to-jpg-3-e06484ce-a195-49a4-819b-c981bee0b64d.png',
        currentPrice: '185.000đ',
        oldPrice: '220.000đ',
        discount: '-16%'
      },
      {
        id: 7,
        name: 'Vitamin D3 2000IU Kirkland 600 viên',
        image: 'assets/ezgif-com-webp-to-jpg-5-77e8d1d7-902e-4546-bceb-d886f2da75ed.png',
        currentPrice: '320.000đ',
        oldPrice: '380.000đ',
        discount: '-16%'
      },
      {
        id: 8,
        name: 'Vitamin B Complex Nature Made 90 viên',
        image: 'assets/ezgif-com-webp-to-jpg-5-b0275da4-9a4d-4a18-ba9c-52a77e955070.png',
        currentPrice: '145.000đ',
        oldPrice: '170.000đ',
        discount: '-15%'
      },
      {
        id: 9,
        name: 'Multivitamin One A Day 100 viên',
        image: 'assets/ezgif-com-webp-to-jpg-59b2b3de-d24b-48ff-9860-56ae5d290eb6.png',
        currentPrice: '225.000đ',
        oldPrice: '260.000đ',
        discount: '-13%'
      },
      {
        id: 10,
        name: 'Vitamin E 400IU Nature Made 100 viên',
        image: 'assets/ezgif-com-webp-to-jpg-af766159-7ac2-4ae7-83f3-6755dec28531.png',
        currentPrice: '195.000đ',
        oldPrice: '230.000đ',
        discount: '-15%'
      }
    ],
    'cham-soc': []
  };

  // DOM elements
  const tabButtons = document.querySelectorAll('.suggest-tab');
  const productsContainer = document.getElementById('suggest-products');

  function renderProducts(category) {
    const products = productData[category];
    
    if (!products || products.length === 0) {
      productsContainer.innerHTML = `
        <div class="suggest-empty-message">
          Sản phẩm đang được cập nhật.
        </div>
      `;
      return;
    }

    const productsHTML = products.map(product => `
      <div class="card border-0 shadow-sm suggest-product-card position-relative h-100">
        <span class="badge discount-badge position-absolute top-0 start-0 m-2 px-2 py-1">${product.discount}</span>
        
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
              <span class="suggest-price-old">${product.oldPrice}</span>
            </div>
          </div>
        </div>
        
        <button class="btn btn-primary rounded-circle suggest-cart-button position-absolute" onclick="addToCart(${product.id})" title="Thêm vào giỏ">
          <i class="bi bi-cart-plus"></i>
        </button>
      </div>
    `).join('');

    productsContainer.innerHTML = productsHTML;
  }

  function switchTab(targetCategory) {
    tabButtons.forEach(tab => tab.classList.remove('active'));
    const activeTab = document.querySelector(`[data-category="${targetCategory}"]`);
    if (activeTab) activeTab.classList.add('active');
    renderProducts(targetCategory);
  }

  // Event listeners
  tabButtons.forEach(tab => {
    tab.addEventListener('click', function() {
      switchTab(this.getAttribute('data-category'));
    });
  });

  // Initialize
  renderProducts('thuoc-bo');

  function findProduct(productId) {
    for (const category in productData) {
      const product = productData[category].find(p => p.id === productId);
      if (product) return product;
    }
    return null;
  }

  // Global functions
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
});
