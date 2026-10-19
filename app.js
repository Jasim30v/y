function toggleInfo(){
    const p=document.getElementById('infoPanel');
    const open = p.style.display==='none';
    p.style.display = open?'block':'none';
    document.getElementById('btnInfo').classList.toggle('active', open);
    if(open){
        document.getElementById('aiSettingsPanel').style.display='none';
        document.getElementById('aiResultPanel').style.display='none';
        document.getElementById('chatPanel').style.display='none';
    }
}

function toggleAutoCopy(){
    const s=loadSettings();
    s.autoCopy=!s.autoCopy;
    saveSettings(s);
    document.getElementById('autoCopyBtn').classList.toggle('active',s.autoCopy);
    showToast(s.autoCopy?'✅ نسخ تلقائي':'❌ نسخ تلقائي');
}

function showToast(m){
    const t=document.getElementById('toast');
    if(!t)return;
    t.textContent=m;
    t.classList.add('show');
    clearTimeout(window._toastTimer);
    window._toastTimer=setTimeout(()=>t.classList.remove('show'),2500);
}

window.addEventListener('DOMContentLoaded',()=>{
    initParticles();
    initVisualizer();
    initGallery();
    initAI();
    const s=loadSettings();
    if(s.autoCopy)document.getElementById('autoCopyBtn').classList.add('active');
    console.log('%c🧠 Pixel Vault Chat Ready','color:#00ffcc;font-size:16px;font-weight:bold');
});