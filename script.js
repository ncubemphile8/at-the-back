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
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const heroVideo = document.querySelector('.hero-video');
if (heroVideo && !reducedMotion) {
  const clips = [
    'https://videos.pexels.com/video-files/5032152/5032152-hd_1920_1080_25fps.mp4',
    'https://videos.pexels.com/video-files/32546598/13879991_1920_1080_24fps.mp4'
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
  const firePanel = document.querySelector('.fire-photo');
  if (firePanel) {
    const fireVideo = document.createElement('video');
    fireVideo.className = 'fire-panel-video';
    fireVideo.autoplay = true;
    fireVideo.muted = true;
    fireVideo.loop = true;
    fireVideo.playsInline = true;
    fireVideo.preload = 'metadata';
    fireVideo.setAttribute('aria-hidden', 'true');
    fireVideo.src = clips[1];
    fireVideo.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.74;z-index:0;';
    firePanel.querySelectorAll('.photo-label,.photo-caption').forEach(el => { el.style.zIndex = '1'; });
    firePanel.prepend(fireVideo);
    fireVideo.addEventListener('error', () => fireVideo.remove(), { once: true });
    const firePlay = fireVideo.play();
    if (firePlay && typeof firePlay.catch === 'function') firePlay.catch(() => {});
  }
}
if ('IntersectionObserver' in window && !reducedMotion) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: .12 });
  document.querySelectorAll('.intro,.fire-section,.menu-card,.combos,.story-copy,.visit-copy').forEach(el => {
    el.classList.add('reveal'); observer.observe(el);
  });
}