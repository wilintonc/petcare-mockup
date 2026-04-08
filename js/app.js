  document.addEventListener('DOMContentLoaded', () => {
    
    const sections = document.querySelectorAll('.section');
    const navBtns = document.querySelectorAll('.nav-btn');
    const sideBtns = document.querySelectorAll('.sidebar-btn');
    const label = document.getElementById('activeLabel');

    function navigate(id) {
      sections.forEach(s => s.classList.remove('active'));
      const target = document.getElementById('s-' + id);
      if(target) target.classList.add('active');

      navBtns.forEach(b => b.classList.toggle('active', b.dataset.screen === id));
      sideBtns.forEach(b => b.classList.toggle('active', b.dataset.target === id));
      
      label.innerText = id.charAt(0).toUpperCase() + id.slice(1);
      
      // Reset video
      document.getElementById('vBar').style.width = "0%";
      document.getElementById('vidPlay').innerText = "▶";
    }

    navBtns.forEach(b => b.addEventListener('click', () => navigate(b.dataset.screen)));
    sideBtns.forEach(b => b.addEventListener('click', () => navigate(b.dataset.target)));

    // Galería Info
    const descBox = document.getElementById('descBox');
    document.querySelectorAll('.species-item').forEach(item => {
      item.addEventListener('click', () => {
        descBox.innerText = item.dataset.info;
        descBox.style.display = 'block';
        setTimeout(() => descBox.classList.add('active'), 10);
      });
    });

    document.addEventListener('click', (e) => {
      if(!e.target.closest('.species-item')) {
        descBox.classList.remove('active');
        setTimeout(() => descBox.style.display = 'none', 300);
      }
    });

    // Mock Video
    let playing = false;
    document.getElementById('vidPlay').addEventListener('click', function() {
      playing = !playing;
      this.innerText = playing ? "⏸" : "▶";
      if(playing) {
        let w = 0;
        const itv = setInterval(() => {
          if(!playing || w >= 100) { clearInterval(itv); return; }
          w += 1;
          document.getElementById('vBar').style.width = w + "%";
        }, 50);
      }
    });

    // Mock Web
    document.getElementById('webGo').addEventListener('click', () => {
      const val = document.getElementById('webIn').value;
      const frame = document.getElementById('webFrame');
      frame.innerHTML = `<div style="font-size:10px; color:#666; padding:20px">Cargando resultados para:<br><b>${val || 'clínicas cercanas'}</b>...</div>`;
    });

    // Toasts
    const toast = document.getElementById('toast');
    document.querySelectorAll('.t-msg').forEach(btn => {
      btn.addEventListener('click', () => {
        toast.innerText = btn.dataset.msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    });

  });
