document.addEventListener("DOMContentLoaded", function () {
  const phrases = [
    "Thực phẩm chức năng...",
    "Dược mỹ phẩm...",
    "Chăm sóc cá nhân...",
    "Thiết bị y tế...",
    "Vitamin & khoáng chất..."
  ];
  const input = document.querySelector(".search-input");
  if (!input) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 100;    // typing speed (ms per character)
  const deleteSpeed = 60;   // deleting speed
  const pause = 1500;       // pause at end of each phrase

  function type() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
      charIndex--;
      input.setAttribute("placeholder", current.substring(0, charIndex));
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 300);
      } else {
        setTimeout(type, deleteSpeed);
      }
    } else {
      charIndex++;
      input.setAttribute("placeholder", current.substring(0, charIndex));
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(type, pause);
      } else {
        setTimeout(type, typeSpeed);
      }
    }
  }

  // Start effect after short delay
  setTimeout(type, 600);
}); 