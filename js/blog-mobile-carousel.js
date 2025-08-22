document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.blog-section');
  if (!section) return;

  const row = section.querySelector('.row.g-4');
  if (!row) return;

  const cards = Array.from(row.children);
  const prevBtn = section.querySelector('.blog-nav-prev');
  const nextBtn = section.querySelector('.blog-nav-next');

  let index = 0;

  const isMobile = () => window.innerWidth <= 767.98;
  const isTablet = () => window.innerWidth > 767.98 && window.innerWidth <= 1024;

  function apply() {
    // Desktop: show all, no changes
    if (!isMobile() && !isTablet()) {
      cards.forEach(el => el.classList.remove('blog-hidden'));
      return;
    }

    const visibleCount = isMobile() ? 1 : 2; // 1 on mobile, 2 on tablet
    const total = cards.length;
    // Normalize index so that there are enough items ahead
    if (index > total - visibleCount) index = 0;
    if (index < 0) index = total - visibleCount;

    cards.forEach((el, i) => {
      const end = index + visibleCount - 1;
      const inRange = i >= index && i <= end;
      el.classList.toggle('blog-hidden', !inRange);
    });
  }

  function next() {
    const step = 1; // slide by 1 item
    index += step;
    apply();
  }

  function prev() {
    const step = 1;
    index -= step;
    apply();
  }

  prevBtn && prevBtn.addEventListener('click', prev);
  nextBtn && nextBtn.addEventListener('click', next);
  window.addEventListener('resize', apply);

  apply();
});


