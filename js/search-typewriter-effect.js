export function initSearchTypewriter() {
  const phrases = [
    "Thực phẩm chức năng...",
    "Dược mỹ phẩm...",
    "Chăm sóc cá nhân...",
    "Thiết bị y tế...",
    "Vitamin & khoáng chất...",
  ];

  const inputs = document.querySelectorAll(".search-input");
  if (inputs.length === 0) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 100;
  const deleteSpeed = 60;
  const pause = 1500;

  function type() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
      charIndex--;
      inputs.forEach((input) => {
        input.setAttribute("placeholder", current.substring(0, charIndex));
      });
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 300);
      } else {
        setTimeout(type, deleteSpeed);
      }
    } else {
      charIndex++;
      inputs.forEach((input) => {
        input.setAttribute("placeholder", current.substring(0, charIndex));
      });
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(type, pause);
      } else {
        setTimeout(type, typeSpeed);
      }
    }
  }

  setTimeout(type, 600);
}
