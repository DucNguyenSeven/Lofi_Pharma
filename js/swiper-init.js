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
}); 