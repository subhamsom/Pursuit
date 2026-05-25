// ── Config ──────────────────────────────────────────────
const PEXELS_API_KEY  = 'YOUR_PEXELS_API_KEY';
const PEXELS_QUERY    = 'landscape nature';
const CACHE_DURATION  = 6 * 60 * 60 * 1000; // 6 hours

// ── Clock ────────────────────────────────────────────────
function updateClock() {
  const now = new Date();
  const h   = now.getHours().toString().padStart(2, '0');
  const m   = now.getMinutes().toString().padStart(2, '0');

  document.getElementById('h1').textContent = h[0];
  document.getElementById('h2').textContent = h[1];
  document.getElementById('m1').textContent = m[0];
  document.getElementById('m2').textContent = m[1];

  const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  document.getElementById('date').textContent =
    `${days[now.getDay()]}  ·  ${months[now.getMonth()]} ${now.getDate()}`;
}
updateClock();
setInterval(updateClock, 1000);

// ── Quotes ───────────────────────────────────────────────
async function loadQuote() {
  try {
    const res    = await fetch(chrome.runtime.getURL('quotes.json'));
    const quotes = await res.json();
    const today  = new Date();
    const seed   = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const quote  = quotes[seed % quotes.length];
    document.getElementById('headline').textContent     = quote.headline;
    document.getElementById('full-thought').textContent = quote.full;
  } catch (e) {
    document.getElementById('headline').textContent = 'Keep going. One day at a time.';
  }
}
loadQuote();

// ── Background ───────────────────────────────────────────
async function loadBackground() {
  const cached   = localStorage.getItem('pursuit_bg');
  const cachedAt = parseInt(localStorage.getItem('pursuit_bg_at') || '0');

  if (cached && (Date.now() - cachedAt) < CACHE_DURATION) {
    applyBackground(JSON.parse(cached));
    return;
  }

  if (!PEXELS_API_KEY || PEXELS_API_KEY === 'YOUR_PEXELS_API_KEY') {
    applyFallback();
    return;
  }

  try {
    const page = Math.floor(Math.random() * 30) + 1;
    const res  = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(PEXELS_QUERY)}&per_page=15&page=${page}&orientation=landscape`,
      { headers: { Authorization: PEXELS_API_KEY } }
    );
    const data = await res.json();

    if (data.photos && data.photos.length > 0) {
      const photo = data.photos[Math.floor(Math.random() * data.photos.length)];
      const bg    = { src: photo.src.large2x };
      localStorage.setItem('pursuit_bg',    JSON.stringify(bg));
      localStorage.setItem('pursuit_bg_at', Date.now().toString());
      applyBackground(bg);
    } else {
      applyFallback();
    }
  } catch (e) {
    applyFallback();
  }
}

function applyBackground({ src }) {
  const img  = document.getElementById('bg-image');
  const temp = new Image();
  temp.onload  = () => {
    img.style.backgroundImage    = `url(${src})`;
    img.style.backgroundSize     = 'cover';
    img.style.backgroundPosition = 'center';
    img.classList.add('visible');
  };
  temp.onerror = applyFallback;
  temp.src     = src;
  document.getElementById('bg-video').style.display = 'none';
}

function applyFallback() {
  const gradients = [
    'linear-gradient(135deg, #0a0a0f 0%, #1a1025 50%, #0f1e38 100%)',
    'linear-gradient(135deg, #0d1b2a 0%, #1b2838 50%, #162032 100%)',
    'linear-gradient(135deg, #0f1923 0%, #1a2d3a 50%, #0d2233 100%)',
    'linear-gradient(160deg, #0a0f1e 0%, #111827 50%, #1a1025 100%)',
    'linear-gradient(135deg, #12100e 0%, #1c1917 50%, #0f172a 100%)',
  ];
  document.body.style.background =
    gradients[Math.floor(Math.random() * gradients.length)];
}

loadBackground();

// ── Hover to expand ──────────────────────────────────────
const quoteWrap = document.getElementById('quote-wrap');
quoteWrap.addEventListener('mouseenter', () => document.body.classList.add('expanded'));
quoteWrap.addEventListener('mouseleave', () => document.body.classList.remove('expanded'));
