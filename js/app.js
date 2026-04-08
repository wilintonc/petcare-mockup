
document.addEventListener('DOMContentLoaded', () => {

  // --- NAVEGACIÓN (CU01) ---
  const navBtns = document.querySelectorAll('.nav-btn');
  const menuBtns = document.querySelectorAll('.menu-btn');
  const sections = document.querySelectorAll('.content-section');
  const screenLabel = document.getElementById('activeScreenLabel');

  function activateScreen(name) {
    sections.forEach(s => s.classList.remove('active'));
    document.getElementById('section-' + name)?.classList.add('active');
    
    navBtns.forEach(b => b.classList.toggle('active', b.dataset.screen === name));
    menuBtns.forEach(b => b.classList.toggle('active', b.dataset.target === name));
    
    if (screenLabel) screenLabel.textContent = name.charAt(0).toUpperCase() + name.slice(1);
  }

  navBtns.forEach(btn => btn.addEventListener('click', () => activateScreen(btn.dataset.screen)));
  menuBtns.forEach(btn => btn.addEventListener('click', () => activateScreen(btn.dataset.target)));

  // --- GALERÍA (CU03) ---
  const photoItems = document.querySelectorAll('.photo-item');
  const photoDescBox = document.getElementById('photoDescBox');
  const photoDescTxt = document.getElementById('photoDescText');

  photoItems.forEach(item => {
    item.addEventListener('click', () => {
      photoDescTxt.textContent = item.dataset.desc;
      photoDescBox.style.display = 'block';
    });
  });

  document.getElementById('descClose')?.addEventListener('click', () => {
    photoDescBox.style.display = 'none';
  });

  // --- VIDEO (CU04) ---
  let playing = false;
  let progress = 0;
  let interval;

  function toggleVideo() {
    playing = !playing;
    const btn = document.getElementById('playBtn');
    const ppBtn = document.getElementById('playPauseBtn');
    const fill = document.getElementById('progressFill');

    if (playing) {
      btn.textContent = ppBtn.textContent = '⏸';
      interval = setInterval(() => {
        progress += 1;
        fill.style.width = progress + '%';
        if (progress >= 100) clearInterval(interval);
      }, 100);
    } else {
      btn.textContent = ppBtn.textContent = '▶';
      clearInterval(interval);
    }
  }

  document.getElementById('playBtn')?.addEventListener('click', toggleVideo);
  document.getElementById('playPauseBtn')?.addEventListener('click', toggleVideo);

  // --- WEB (CU04) ---
  document.getElementById('goBtn')?.addEventListener('click', () => {
    const url = document.getElementById('urlInput').value || 'petcare-info.com';
    document.getElementById('wbUrlDisplay').textContent = url.replace('https://', '');
    document.getElementById('webviewContent').innerHTML = `
      <div style="padding:15px">
        <h4 style="color:#2D6A4F">🔍 Resultados para: ${url}</h4>
        <div style="height:10px; background:#f0f0f0; margin:10px 0; width:80%"></div>
        <div style="height:10px; background:#f0f0f0; margin:10px 0; width:95%"></div>
        <p style="font-size:10px; color:#666">Cargando información veterinaria...</p>
      </div>
    `;
  });

  // --- BOTONES / TOAST (CU05) ---
  const toast = document.getElementById('toast');
  document.querySelectorAll('.news-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      toast.textContent = btn.dataset.msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    });
  });
});
