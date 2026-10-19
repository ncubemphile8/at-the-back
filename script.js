document.getElementById('year').textContent = new Date().getFullYear();
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  toggle.textContent = open ? '×' : '☰';
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
  if (toggle) { toggle.textContent = '☰'; toggle.setAttribute('aria-label', 'Open navigation'); }
}));
const whatsappOrder = document.querySelector('.hero-actions .btn-outline');
if (whatsappOrder) whatsappOrder.href = 'https://wa.me/263779372899?text=Hi%20At%20the%20Back%21%20I%27d%20like%20to%20place%20an%20order.';
const heroVideo = document.querySelector('.hero-video');
if (heroVideo && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const clips = [
    'https://videos.pexels.com/video-files/3134563/3134563-hd_1920_1080_30fps.mp4',
    'https://videos.pexels.com/video-files/856399/856399-hd_1920_1080_30fps.mp4'
  ];
  let activeClip = 0;
  const loadClip = () => {
    heroVideo.src = clips[activeClip];
    heroVideo.load();
    const play = heroVideo.play();
    if (play && typeof play.catch === 'function') play.catch(() => {});
  };
  heroVideo.addEventListener('error', () => {
    if (activeClip < clips.length - 1) { activeClip += 1; loadClip(); }
    else heroVideo.classList.add('video-unavailable');
  });
  loadClip();
}
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: .12 });
  document.querySelectorAll('.intro,.fire-section,.menu-card,.combos,.story-copy,.visit-copy').forEach(el => {
    el.classList.add('reveal'); observer.observe(el);
  });
}