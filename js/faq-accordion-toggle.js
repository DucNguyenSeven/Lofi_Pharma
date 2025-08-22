// FAQ Accordion - smooth expand/collapse, one item open at a time

document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  // Setup event listeners for each FAQ item
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    if (!question || !answer) return;
    
    // Set initial state
    question.setAttribute('aria-expanded', 'false');
    answer.style.maxHeight = '0px';
    
    // Click handler
    question.addEventListener('click', function() {
      toggleFAQ(item);
    });
    
    // Keyboard support
    question.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFAQ(item);
      }
    });
  });
  
  // Toggle FAQ - close all others, open current if not active
  function toggleFAQ(currentItem) {
    const isActive = currentItem.classList.contains('active');
    
    // Close all items first
    faqItems.forEach(item => {
      closeFAQ(item);
    });
    
    // Open current item if it wasn't active
    if (!isActive) {
      openFAQ(currentItem);
    }
  }
  
  // Open FAQ item with smooth height animation
  function openFAQ(item) {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const answerContent = answer.querySelector('.faq-answer-content');
    
    // Add active styling
    item.classList.add('active');
    question.setAttribute('aria-expanded', 'true');
    
    // Calculate height for smooth animation
    if (answerContent) {
      // Measure content height
      answer.style.maxHeight = 'none';
      const contentHeight = answerContent.scrollHeight + 32;
      answer.style.maxHeight = '0px';
      
      // Animate to full height
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          answer.style.maxHeight = contentHeight + 'px';
        });
      });
    }
  }
  
  // Close FAQ item
  function closeFAQ(item) {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    item.classList.remove('active');
    question.setAttribute('aria-expanded', 'false');
    answer.style.maxHeight = '0px';
  }
  
  // Recalculate heights on window resize
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      // Update heights for open items
      faqItems.forEach(item => {
        if (item.classList.contains('active')) {
          const answer = item.querySelector('.faq-answer');
          const answerContent = answer.querySelector('.faq-answer-content');
          if (answerContent) {
            answer.style.maxHeight = 'none';
            const contentHeight = answerContent.scrollHeight + 32;
            answer.style.maxHeight = contentHeight + 'px';
          }
        }
      });
    }, 150);
  });
});
