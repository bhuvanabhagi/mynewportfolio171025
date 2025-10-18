// Year + Animations + Scroll Progress + PDF Download
document.addEventListener('DOMContentLoaded', () => {
  // --- Update current year ---
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // --- Scroll progress bar ---
  const bar = document.querySelector('.scroll-bar');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    if (bar) bar.style.width = `${progress}%`;
  });

  // --- Reveal animations ---
  const cards = document.querySelectorAll('.card');
  const reveal = () => {
    const vh = window.innerHeight * 0.9;
    cards.forEach(c => {
      if (c.getBoundingClientRect().top < vh) c.classList.add('visible');
    });
  };
  reveal();
  window.addEventListener('scroll', reveal);

  // --- Download Resume (supports multiple buttons) ---
  const downloadBtns = document.querySelectorAll('[data-resume]');
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      // Use forward slashes only, never backslashes
      const resumePath = btn.getAttribute('data-resume').replace(/\\/g, '/');
      const filename = resumePath.split('/').pop();

      try {
        const res = await fetch(resumePath, { cache: 'no-store' });
        if (!res.ok) throw new Error('File not found');

        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(blobUrl);
      } catch (e) {
        alert('Resume file not found. Please contact site owner.');
      }
    });
  });

  // --- Contact form: open mail client with prefilled content ---
  const contactForm = document.getElementById('contact-form');
  const feedback = document.getElementById('contact-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      const subject = encodeURIComponent('Portfolio contact from ' + name);
      const bodyLines = [
        `Name: ${name}`,
        `Email: ${email}`,
        '',
        message
      ];
      const body = encodeURIComponent(bodyLines.join('\n'));
      const mailto = `mailto:bhagibhuvaneswari@gmail.com?subject=${subject}&body=${body}`;

      window.location.href = mailto;

      if (feedback) {
        feedback.style.display = 'block';
        feedback.textContent = 'Mail client opened — if nothing happened, copy/paste your message to bhagibhuvaneswari@gmail.com';
        setTimeout(() => { feedback.style.display = 'none'; }, 7000);
      }
      contactForm.reset();
    });
  }
});
