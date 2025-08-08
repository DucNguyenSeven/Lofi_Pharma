export function initNavScroll() {
  console.log('initNavScroll called');
  
  const navContainer = document.getElementById('navScroll');
  if (!navContainer) {
    console.warn('navScroll element not found');
    return;
  }
  console.log('navScroll found:', navContainer);

  // Thử nhiều selector khác nhau
  let arrowBtns = document.querySelectorAll('.nav-arrows .btn-arrow');
  if (arrowBtns.length < 2) {
    arrowBtns = document.querySelectorAll('.btn-arrow');
  }
  if (arrowBtns.length < 2) {
    arrowBtns = document.querySelectorAll('.nav-arrows button');
  }
  
  console.log('Arrow buttons found:', arrowBtns.length);
  
  if (arrowBtns.length < 2) {
    console.warn('Arrow buttons not found');
    return;
  }
  
  const [btnPrev, btnNext] = arrowBtns;
  console.log('btnPrev:', btnPrev);
  console.log('btnNext:', btnNext);

  function setInitialWidth() {
    const items = navContainer.querySelectorAll('li.nav-item');
    if (items.length === 0) return;
    
    // Đợi một chút để DOM được render hoàn toàn
    setTimeout(() => {
      let width = 0;
      // Calculate width for first 4 items only
      for (let i = 0; i < items.length && i < 4; i++) {
        width += items[i].offsetWidth;
      }
      
      // Add some padding/margin
      width += 16;
      
      navContainer.style.maxWidth = `${width}px`;
      navContainer.style.flex = `0 0 ${width}px`;
      
      // Update arrows after setting width
      updateArrows();
    }, 50);
  }
  
  setInitialWidth();
  window.addEventListener('resize', setInitialWidth);

  const SCROLL_STEP = 160;

  btnPrev.addEventListener('click', () => {
    console.log('Left arrow clicked');
    navContainer.scrollBy({ left: -SCROLL_STEP, behavior: 'smooth' });
  });

  btnNext.addEventListener('click', () => {
    console.log('Right arrow clicked');
    navContainer.scrollBy({ left: SCROLL_STEP, behavior: 'smooth' });
  });

  function updateArrows() {
    const maxScroll = navContainer.scrollWidth - navContainer.clientWidth;
    const items = navContainer.querySelectorAll('li.nav-item');
    
    console.log('updateArrows - maxScroll:', maxScroll, 'items count:', items.length);

    if (items.length <= 4) {
      btnPrev.disabled = true;
      btnNext.disabled = true;
      console.log('Only 4 or fewer items - disabling both arrows');
    } else {
      btnPrev.disabled = navContainer.scrollLeft <= 0;
      btnNext.disabled = navContainer.scrollLeft >= maxScroll - 1;
      console.log('More than 4 items - prev disabled:', btnPrev.disabled, 'next disabled:', btnNext.disabled);
    }

    btnPrev.classList.toggle('disabled', btnPrev.disabled);
    btnNext.classList.toggle('disabled', btnNext.disabled);
  }

  updateArrows();
  navContainer.addEventListener('scroll', updateArrows);
  window.addEventListener('resize', updateArrows);
}