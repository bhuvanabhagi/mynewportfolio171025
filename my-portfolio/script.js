// Year + Animations + Scroll Progress + PDF Download
document.addEventListener('DOMContentLoaded', () => {
  // Update current year
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

  // Download PDF Functionality
  const downloadBtn = document.getElementById('download-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const element = document.body; // capture whole page

      const opt = {
        margin: 0.5,
        filename: 'B_Bhuvaneswari_Portfolio.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().set(opt).from(element).save();
    });
  }
});
