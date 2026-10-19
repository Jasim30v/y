function toggleSettings(){
    const p=document.getElementById('settingsPanel');
    p.style.display=p.style.display==='none'?'block':'none';
    document.getElementById('btnSettings').classList.toggle('active',p.style.display==='block');
    if(p.style.display==='block')document.getElementById('infoPanel').style.display='none';
}

function toggleInfo(){
    const p=document.getElementById('infoPanel');
    p.style.display=p.style.display==='none'?'block':'none';
    document.getElementById('btnInfo').classList.toggle('active',p.style.display==='block');
    if(p.style.display==='block')document.getElementById('settingsPanel').style.display='none';
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

initParticles();
initVisualizer();
initGallery();
loadCloudConfig();
if(!loadSettings().cloudName){setTimeout(()=>{showToast('⚙️ اضبط إعدادات Cloudinary');toggleSettings()},700)}
