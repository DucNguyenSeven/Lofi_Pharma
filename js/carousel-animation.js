// js/hero-carousel-animation.js
document.addEventListener('DOMContentLoaded', () => {
  const heroCarousel = document.getElementById('heroCarousel');
  if (!heroCarousel) return;

  const resetAll = () => {
    heroCarousel.querySelectorAll('.hero-anim').forEach(el =>
      el.classList.remove('animate-in')
    );
  };

  const animateSlide = (slide) => {
    slide.querySelectorAll('.hero-anim').forEach(el =>
      requestAnimationFrame(() => el.classList.add('animate-in'))
    );
  };

  resetAll();
  animateSlide(heroCarousel.querySelector('.carousel-item.active'));

  heroCarousel.addEventListener('slide.bs.carousel', () => resetAll());

  heroCarousel.addEventListener('slid.bs.carousel', (e) =>
    animateSlide(e.relatedTarget)
  );
}); 