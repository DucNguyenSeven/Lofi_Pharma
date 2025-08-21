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
}); 