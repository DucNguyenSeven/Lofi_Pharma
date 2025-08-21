// SwiperJS Initialization
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all product swipers
  const productSwipers = document.querySelectorAll('.product-swiper');
  
  productSwipers.forEach(function(swiperElement) {
    new Swiper(swiperElement, {
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: swiperElement.querySelector('.swiper-button-next'),
        prevEl: swiperElement.querySelector('.swiper-button-prev'),
      },
      pagination: {
        el: swiperElement.querySelector('.swiper-pagination'),
        clickable: true,
      },
      breakpoints: {
        576: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 5,
          spaceBetween: 20,
        }
      },
      loop: false,
      autoplay: false,
      grabCursor: true,
      centeredSlides: false,
      watchOverflow: true,
    });
  });

  // Initialize/destroy service highlights swiper based on viewport (mobile only)
  const serviceSwiperEl = document.querySelector('.service-swiper');
  let serviceSwiper = null;
  function initServiceSwiper() {
    if (!serviceSwiperEl) return;
    const isMobile = window.matchMedia('(max-width: 767.98px)').matches;
    if (isMobile && !serviceSwiper) {
      serviceSwiper = new Swiper(serviceSwiperEl, {
        slidesPerView: 1,
        spaceBetween: 16,
        pagination: {
          el: serviceSwiperEl.querySelector('.swiper-pagination'),
          clickable: true,
        },
        loop: false,
        autoplay: false,
        watchOverflow: true,
      });
    } else if (!isMobile && serviceSwiper) {
      serviceSwiper.destroy(true, true);
      serviceSwiper = null;
    }
  }
  initServiceSwiper();
  window.addEventListener('resize', initServiceSwiper);

  // Initialize/destroy promo banners swiper based on viewport (mobile only)
  const promoSwiperEl = document.querySelector('.promo-swiper');
  let promoSwiper = null;
  function initPromoSwiper() {
    if (!promoSwiperEl) return;
    const isMobile = window.matchMedia('(max-width: 767.98px)').matches;
    if (isMobile && !promoSwiper) {
      promoSwiper = new Swiper(promoSwiperEl, {
        slidesPerView: 1,
        spaceBetween: 12,
        pagination: {
          el: promoSwiperEl.querySelector('.swiper-pagination'),
          clickable: true,
        },
        loop: false,
        autoplay: false,
        watchOverflow: true,
      });
    } else if (!isMobile && promoSwiper) {
      promoSwiper.destroy(true, true);
      promoSwiper = null;
    }
  }
  initPromoSwiper();
  window.addEventListener('resize', initPromoSwiper);

  // Initialize/destroy new products swiper based on viewport (mobile only)
  const newProductsSwiperEl = document.querySelector('.new-products-swiper');
  let newProductsSwiper = null;
  function initNewProductsSwiper() {
    if (!newProductsSwiperEl) return;
    const isMobile = window.matchMedia('(max-width: 767.98px)').matches;
    if (isMobile && !newProductsSwiper) {
      newProductsSwiper = new Swiper(newProductsSwiperEl, {
        slidesPerView: 1,
        spaceBetween: 16,
        pagination: {
          el: newProductsSwiperEl.querySelector('.swiper-pagination'),
          clickable: true,
        },
        loop: false,
        autoplay: false,
        watchOverflow: true,
        breakpoints: {
          480: {
            slidesPerView: 1,
            spaceBetween: 16,
          }
        }
      });
    } else if (!isMobile && newProductsSwiper) {
      newProductsSwiper.destroy(true, true);
      newProductsSwiper = null;
    }
  }
  initNewProductsSwiper();
  window.addEventListener('resize', initNewProductsSwiper);

  // Initialize/destroy suggest products swiper on mobile & tablet (<=1024px)
  const suggestProductsSwiperEl = document.querySelector('.suggest-products-swiper');
  let suggestProductsSwiper = null;
  function initSuggestProductsSwiper() {
    if (!suggestProductsSwiperEl) return;
    const isMobileOrTablet = window.matchMedia('(max-width: 1024px)').matches;
    if (isMobileOrTablet && !suggestProductsSwiper) {
      suggestProductsSwiper = new Swiper(suggestProductsSwiperEl, {
        slidesPerView: 1,
        spaceBetween: 16,
        pagination: {
          el: suggestProductsSwiperEl.querySelector('.swiper-pagination'),
          clickable: true,
        },
        loop: false,
        autoplay: false,
        watchOverflow: true,
        breakpoints: {
          768: {
            slidesPerView: 1,
            spaceBetween: 16,
          }
        }
      });
    } else if (!isMobileOrTablet && suggestProductsSwiper) {
      suggestProductsSwiper.destroy(true, true);
      suggestProductsSwiper = null;
    }
  }
  initSuggestProductsSwiper();
  window.addEventListener('resize', initSuggestProductsSwiper);
}); 