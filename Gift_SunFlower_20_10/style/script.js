window.addEventListener('load', () => {
  // Giữ nguyên nhịp khởi động hoa hiện có.
  window.setTimeout(() => {
    document.body.classList.remove('not-loaded');
  }, 1000);

  // Sao băng tiếp tục chạy độc lập với phong thư.
  const starContainer = document.querySelector('.shooting-stars');
  function createShootingStar() {
    if (!starContainer) return;
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.top = `${Math.random() * 60}%`;
    star.style.animationDelay = '0s';
    star.style.animationDuration = `${Math.random() * 1.5 + 2}s`;
    starContainer.appendChild(star);
    window.setTimeout(() => star.remove(), 4000);
  }
  window.setInterval(() => {
    if (Math.random() > 0.3) createShootingStar();
  }, 3500);

  const scene = document.getElementById('letterScene');
  const envelopeButton = document.getElementById('envelopeButton');
  const greetingOverlay = document.getElementById('greetingOverlay');
  const closeButton = document.getElementById('closeGreeting');
  const backButton = document.getElementById('backToFlowers');

  if (!scene || !envelopeButton || !greetingOverlay) return;

  // Tính 5 giây sau khi bắt đầu hiệu ứng hoa (đã chờ 1 giây ở trên).
  window.setTimeout(() => {
    scene.classList.add('letter-visible');
    scene.setAttribute('aria-hidden', 'false');
  }, 5000);

  function openLetter() {
    if (scene.classList.contains('letter-open')) return;
    scene.classList.add('letter-open');
    envelopeButton.setAttribute('aria-expanded', 'true');
    window.setTimeout(() => {
      greetingOverlay.classList.add('greeting-visible');
      greetingOverlay.setAttribute('aria-hidden', 'false');
      if (closeButton) closeButton.focus({ preventScroll: true });
    }, 850);
  }

  function closeLetter() {
    greetingOverlay.classList.remove('greeting-visible');
    greetingOverlay.setAttribute('aria-hidden', 'true');
    scene.classList.remove('letter-open');
    envelopeButton.setAttribute('aria-expanded', 'false');
    envelopeButton.focus({ preventScroll: true });
  }

  envelopeButton.addEventListener('click', openLetter);
  if (closeButton) closeButton.addEventListener('click', closeLetter);
  if (backButton) backButton.addEventListener('click', closeLetter);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && scene.classList.contains('letter-open')) closeLetter();
  });
});
