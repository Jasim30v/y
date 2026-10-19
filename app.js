function toggleInfo(){
    const p=document.getElementById('infoPanel');
    p.style.display=p.style.display==='none'?'block':'none';
    document.getElementById('btnInfo').classList.toggle('active',p.style.display==='block');
}

function toggleAutoCopy(){
    const s=loadSettings();
    s.autoCopy=!s.autoCopy;
    saveSettings(s);
    document.getElementById('autoCopyBtn').classList.toggle('active',s.autoCopy);
    showToast(s.autoCopy?'✅ نسخ تلقائي مفعّل':'❌ نسخ تلقائي معطّل');
}

function showToast(m){
    const t=document.getElementById('toast');
    t.textContent=m;
    t.classList.add('show');
    clearTimeout(window._toastTimer);
    window._toastTimer=setTimeout(()=>t.classList.remove('show'),2500);
}

// ─── التهيئة ───
initParticles();
initVisualizer();
initGallery();

// استعادة حالة النسخ التلقائي
const _s=loadSettings();
if(_s.autoCopy)document.getElementById('autoCopyBtn').classList.add('active');

console.log('%c🖼️ Pixel Vault 2044 Ready','color:#00ffcc;font-size:16px;font-weight:bold');
console.log('%c☁️ Cloudinary: dhu9l0lfs','color:#6366f1');
