document.addEventListener('DOMContentLoaded', () => {
  const navContainer = document.getElementById('navScroll');
  if (!navContainer) return;

  const arrowBtns = document.querySelectorAll('.nav-arrows .btn-arrow');
  if (arrowBtns.length < 2) return;
  const [btnPrev, btnNext] = arrowBtns;

  function setInitialWidth() {
    const items = navContainer.querySelectorAll('li.nav-item');
    let width = 0;
    for (let i = 0; i < items.length && i < 4; i++) {
      width += items[i].offsetWidth;
    }
    width += 8;                     
    navContainer.style.maxWidth = `${width}px`;
    navContainer.style.flex = `0 0 ${width}px`;
  }
  
  setInitialWidth();
  window.addEventListener('resize', setInitialWidth);

  const SCROLL_STEP = 160;

  btnPrev.addEventListener('click', () => {
    navContainer.scrollBy({ left: -SCROLL_STEP, behavior: 'smooth' });
  });

  btnNext.addEventListener('click', () => {
    navContainer.scrollBy({ left: SCROLL_STEP, behavior: 'smooth' });
  });

  function updateArrows() {
    const maxScroll = navContainer.scrollWidth - navContainer.clientWidth;
    const hasScroll = maxScroll > 2;           

    if (!hasScroll) {
      btnPrev.disabled = true;
      btnNext.disabled = true;
    } else {
      btnPrev.disabled = navContainer.scrollLeft <= 0;
      btnNext.disabled = navContainer.scrollLeft >= maxScroll - 1;
    }

    btnPrev.classList.toggle('disabled', btnPrev.disabled);
    btnNext.classList.toggle('disabled', btnNext.disabled);
  }

  updateArrows();
  navContainer.addEventListener('scroll', updateArrows);
  window.addEventListener('resize', updateArrows);
}); 