// Year
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Scroll progress bar
  const bar = document.querySelector('.scroll-bar');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    bar.style.width = `${progress}%`;
  });

  // Reveal animations
  const cards = document.querySelectorAll('.card');
  const reveal = () => {
    const vh = window.innerHeight * 0.9;
    cards.forEach(c => {
      if (c.getBoundingClientRect().top < vh) c.classList.add('visible');
    });
  };
  reveal();
  window.addEventListener('scroll', reveal);
});
