#!/usr/bin/env python3
"""
╔══════════════════════════════════════════════════════════════╗
║  🖼️  PIXEL VAULT 2044 - FIXED BUILD  🖼️                  ║
║                                                            ║
║  ☁️  Cloudinary: dhu9l0lfs                                 ║
║  🔑 Upload Preset: go_fk3                                  ║
║                                                            ║
║  ✅ يعمل على: Web + Capacitor + WebView APK               ║
║                                                            ║
╚══════════════════════════════════════════════════════════════╝
"""

import os

TOTAL_LINES = 0

# ═══════════════════════════════════════════════════════════
# 🔑 إعداداتك الجاهزة
# ═══════════════════════════════════════════════════════════
CLOUD_NAME = "dhu9l0lfs"
UPLOAD_PRESET = "go_fk3"

def write(filename, content):
    global TOTAL_LINES
    os.makedirs(os.path.dirname(filename) if os.path.dirname(filename) else '.', exist_ok=True)
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    lines = content.count('\n') + 1
    TOTAL_LINES += lines
    print(f"  ✅ {filename} ({lines} سطر)")

def section(title):
    print(f"\n{'='*60}")
    print(f"  🖼️ {title}")
    print(f"{'='*60}")

# ═══════════════════════════════════════════════════════════
# 🖼️ 1. index.html
# ═══════════════════════════════════════════════════════════

def build_index():
    return """<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <meta http-equiv="Content-Security-Policy" content="default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; img-src * data: blob:; connect-src *;">
    <title>🖼️ Pixel Vault 2044</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Orbitron:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="bg-void"></div>
    <div class="bg-ring bg-ring-1"></div>
    <div class="bg-ring bg-ring-2"></div>
    <div class="bg-ring bg-ring-3"></div>
    <div id="particlesContainer"></div>

    <div class="app">
        <div class="header">
            <div class="header-left">
                <div class="logo">🖼️</div>
                <div class="header-text">
                    <h1>Pixel Vault</h1>
                    <span>✦ Cloud Image Vault ✦</span>
                </div>
            </div>
            <div class="header-right">
                <button class="btn-icon" onclick="toggleInfo()" id="btnInfo"><i class="fas fa-circle-info"></i></button>
            </div>
        </div>

        <div class="visualizer-3d" id="visualizer3D">
            <canvas id="vizCanvas"></canvas>
            <img class="preview-img" id="previewImg" alt="">
            <div class="viz-overlay">
                <div class="track-info">
                    <div class="track-title" id="trackTitle">اختر صورة</div>
                    <div class="track-artist" id="trackArtist">Pixel Vault 2044</div>
                </div>
                <div class="track-time">
                    <span id="currentTime">—</span>
                    <span id="totalTime">—</span>
                </div>
            </div>
        </div>

        <div class="progress-section">
            <div class="progress-track">
                <div class="progress-fill" id="progressFill"></div>
            </div>
            <div class="progress-status" id="progressStatus">جاهز للرفع</div>
        </div>

        <div class="controls">
            <button class="ctrl-btn" onclick="toggleAutoCopy()" id="autoCopyBtn" title="نسخ تلقائي"><i class="fas fa-copy"></i></button>
            <button class="ctrl-btn" onclick="prevImage()"><i class="fas fa-backward-step"></i></button>
            <button class="ctrl-play" id="uploadBtn" onclick="document.getElementById('imageInput').click()"><i class="fas fa-cloud-arrow-up"></i></button>
            <input type="file" id="imageInput" accept="image/*" multiple style="display:none" onchange="handleFiles(this)">
            <button class="ctrl-btn" onclick="nextImage()"><i class="fas fa-forward-step"></i></button>
            <button class="ctrl-btn" onclick="deleteCurrent()" title="حذف"><i class="fas fa-trash"></i></button>
        </div>

        <div class="lyrics-panel" id="infoPanel" style="display:none">
            <div class="lyrics-header">
                <h3>ℹ️ عن التطبيق</h3>
            </div>
            <div class="lyrics-content">
                <p class="lyrics-line">📤 ارفع صورك إلى السحابة بضغطة</p>
                <p class="lyrics-line">🔗 كل صورة تحصل على رابط مباشر</p>
                <p class="lyrics-line">📋 انسخ أو شارك أو احذف</p>
                <p class="lyrics-line">💾 معرضك محفوظ محليًا</p>
                <p class="lyrics-line">☁️ مرتبط بحساب Cloudinary</p>
            </div>
        </div>

        <div class="playlist-section">
            <div class="playlist-header">
                <h3>🖼️ معرض الصور</h3>
                <button class="btn-action" onclick="clearGallery()">🗑️ مسح الكل</button>
            </div>
            <div class="playlist image-gallery" id="imageGallery">
                <div class="empty-playlist">
                    <span>🖼️</span>
                    <p>اضغط الزر الأزرق لرفع أول صورة</p>
                </div>
            </div>
        </div>
    </div>

    <div class="toast" id="toast"></div>

    <script src="storage.js"></script>
    <script src="particles.js"></script>
    <script src="visualizer.js"></script>
    <script src="uploader.js"></script>
    <script src="gallery.js"></script>
    <script src="app.js"></script>
</body>
</html>"""

# ═══════════════════════════════════════════════════════════
# 🎨 2. style.css
# ═══════════════════════════════════════════════════════════

def build_style():
    return """*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#050510;--card:rgba(10,10,30,0.85);--card2:rgba(15,15,40,0.7);--text:#e8e0f0;--text2:#9088a8;--text3:#504868;--accent:#00ffcc;--accent2:#ff44aa;--accent3:#ffaa00;--accent4:#6366f1;--glass:rgba(0,255,204,0.06);--border:rgba(0,255,204,0.12);--radius:24px;--radius-sm:16px;--radius-xs:12px}
body{font-family:'Cairo',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;overflow-x:hidden;-webkit-tap-highlight-color:transparent;direction:rtl;user-select:none}

.bg-void{position:fixed;inset:0;z-index:0;background:radial-gradient(ellipse at 30% 20%,rgba(0,255,204,0.04) 0%,transparent 60%),radial-gradient(ellipse at 70% 80%,rgba(255,68,170,0.03) 0%,transparent 60%),var(--bg)}
.bg-ring{position:fixed;border-radius:50%;border:1px solid rgba(0,255,204,0.06);z-index:0;pointer-events:none;animation:ringRotate 30s linear infinite}
.bg-ring-1{width:600px;height:600px;top:-200px;left:-100px;animation-duration:25s}
.bg-ring-2{width:500px;height:500px;bottom:-150px;right:-80px;animation-duration:35s;animation-direction:reverse}
.bg-ring-3{width:400px;height:400px;top:30%;left:40%;animation-duration:40s}
@keyframes ringRotate{to{transform:rotate(360deg)}}

.app{width:100%;max-width:520px;margin:0 auto;padding:12px;position:relative;z-index:1}

.header{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:var(--card);backdrop-filter:blur(40px);border-radius:var(--radius);border:1px solid var(--border);margin-bottom:12px}
.header-left{display:flex;align-items:center;gap:10px}
.logo{width:46px;height:46px;background:var(--glass);border:1px solid var(--border);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:24px;animation:logoGlow 3s ease-in-out infinite}
@keyframes logoGlow{0%,100%{box-shadow:0 0 20px rgba(0,255,204,0.3)}50%{box-shadow:0 0 35px rgba(255,68,170,0.6)}}
.header-text h1{font-family:'Orbitron',sans-serif;font-size:18px;font-weight:800;background:linear-gradient(135deg,#00ffcc,#6366f1);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.header-text span{font-size:7px;color:var(--text3);letter-spacing:3px}
.header-right{display:flex;gap:6px}
.btn-icon{width:38px;height:38px;background:var(--card2);border:1px solid var(--border);border-radius:var(--radius-xs);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:15px;color:var(--text2);transition:all 0.3s}
.btn-icon:hover{border-color:var(--accent);color:var(--accent)}
.btn-icon.active{background:var(--glass);border-color:var(--accent);color:var(--accent);box-shadow:0 0 20px rgba(0,255,204,0.3)}

.visualizer-3d{position:relative;width:100%;aspect-ratio:1;max-height:350px;background:var(--card);backdrop-filter:blur(40px);border-radius:var(--radius);border:1px solid var(--border);overflow:hidden;margin-bottom:10px}
.visualizer-3d canvas{width:100%;height:100%;display:block}
.visualizer-3d .preview-img{width:100%;height:100%;object-fit:cover;display:none;position:absolute;inset:0}
.visualizer-3d.has-image .preview-img{display:block}
.visualizer-3d.has-image canvas{display:none}
.viz-overlay{position:absolute;bottom:0;left:0;right:0;padding:16px;background:linear-gradient(to top,rgba(5,5,16,0.9),transparent);z-index:2}
.track-title{font-family:'Orbitron',sans-serif;font-size:16px;font-weight:700;color:var(--accent);margin-bottom:2px;text-shadow:0 0 20px rgba(0,255,204,0.5);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.track-artist{font-size:11px;color:var(--text2)}
.track-time{display:flex;justify-content:space-between;font-family:'Orbitron',sans-serif;font-size:10px;color:var(--accent2);margin-top:6px}

.progress-section{padding:4px 0;margin-bottom:10px}
.progress-track{width:100%;height:4px;background:rgba(255,255,255,0.08);border-radius:2px;position:relative;overflow:hidden}
.progress-fill{height:100%;background:linear-gradient(90deg,var(--accent),var(--accent2),var(--accent3));border-radius:2px;width:0;transition:width 0.2s linear}
.progress-status{text-align:center;font-size:9px;color:var(--text3);margin-top:6px;font-family:'Orbitron',sans-serif}

.controls{display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:12px}
.ctrl-btn{width:42px;height:42px;background:var(--card2);border:1px solid var(--border);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:15px;color:var(--text2);transition:all 0.3s}
.ctrl-btn:hover{border-color:var(--accent);color:var(--accent)}
.ctrl-btn.active{border-color:var(--accent);color:var(--accent);box-shadow:0 0 20px rgba(0,255,204,0.3)}
.ctrl-play{width:60px;height:60px;background:linear-gradient(135deg,var(--accent),var(--accent4));border:none;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:22px;color:#000;box-shadow:0 8px 30px rgba(0,255,204,0.3);transition:all 0.3s}
.ctrl-play:hover{transform:scale(1.05);box-shadow:0 12px 40px rgba(99,102,241,0.5)}
.ctrl-play:active{transform:scale(0.95)}
.ctrl-play:disabled{opacity:0.5;cursor:not-allowed;transform:none}

.lyrics-panel{background:var(--card);backdrop-filter:blur(40px);border-radius:var(--radius);border:1px solid var(--border);padding:16px;margin-bottom:12px;max-height:300px;overflow-y:auto;animation:slideDown 0.4s ease}
@keyframes slideDown{from{opacity:0;max-height:0}to{opacity:1;max-height:300px}}
.lyrics-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
.lyrics-header h3{font-family:'Orbitron',sans-serif;font-size:13px;font-weight:700;color:var(--accent2)}
.lyrics-line{padding:6px 0;font-size:12px;color:var(--text2);text-align:center;border-bottom:1px solid rgba(255,255,255,0.03)}

.playlist-section{margin-top:8px;padding-bottom:30px}
.playlist-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
.playlist-header h3{font-family:'Orbitron',sans-serif;font-size:13px;font-weight:700;color:var(--text)}
.btn-action{padding:7px 14px;background:var(--card2);border:1px solid var(--border);color:var(--accent);cursor:pointer;border-radius:20px;font-size:10px;font-family:'Cairo',sans-serif;transition:all 0.3s}
.btn-action:hover{border-color:var(--accent);box-shadow:0 0 15px rgba(0,255,204,0.2)}
.image-gallery{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}
.img-card{position:relative;border-radius:var(--radius-sm);overflow:hidden;background:var(--card2);border:1px solid var(--border);transition:all 0.3s;cursor:pointer;aspect-ratio:1}
.img-card:hover{border-color:var(--accent);box-shadow:0 0 20px rgba(0,255,204,0.2)}
.img-card.selected{border-color:var(--accent);box-shadow:0 0 25px rgba(0,255,204,0.4)}
.img-card img{width:100%;height:100%;object-fit:cover;display:block}
.img-card .img-name{position:absolute;top:0;left:0;right:0;padding:6px 8px;background:linear-gradient(to bottom,rgba(0,0,0,0.85),transparent);font-size:9px;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;z-index:2}
.img-card .img-actions{position:absolute;bottom:0;left:0;right:0;display:flex;gap:3px;padding:5px;background:linear-gradient(to top,rgba(0,0,0,0.9),transparent);opacity:0;transition:0.3s;z-index:2}
.img-card:hover .img-actions,.img-card.selected .img-actions{opacity:1}
.img-card .img-actions button{flex:1;background:rgba(0,255,204,0.2);border:1px solid var(--accent);color:var(--accent);border-radius:8px;padding:6px 2px;font-size:8px;cursor:pointer;font-family:'Cairo',sans-serif}
.img-card .img-actions button.danger{background:rgba(255,68,68,0.2);border-color:#ff4466;color:#ff4466}
.empty-playlist{text-align:center;padding:30px;color:var(--text3);grid-column:1/-1}
.empty-playlist span{font-size:40px;display:block;margin-bottom:8px}

.toast{position:fixed;bottom:35px;left:50%;transform:translateX(-50%) translateY(130px);background:var(--card);border:1px solid var(--accent);color:var(--text);padding:10px 22px;border-radius:25px;font-size:11px;z-index:300;transition:transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275);font-family:'Cairo',sans-serif;max-width:80%;text-align:center}.toast.show{transform:translateX(-50%) translateY(0)}
.particle{position:fixed;border-radius:50%;pointer-events:none;z-index:0}
@keyframes particleFloat{0%{transform:translateY(110vh) scale(0);opacity:0}15%{opacity:0.7}85%{opacity:0.1}100%{transform:translateY(-10vh) scale(1.5);opacity:0}}

@media(max-width:400px){.controls{gap:10px}}"""

# ═══════════════════════════════════════════════════════════
# 💾 3. storage.js
# ═══════════════════════════════════════════════════════════

def build_storage_js():
    return """const KEYS={gallery:'pixelvault_gallery',settings:'pixelvault_settings'};
function saveData(k,v){try{localStorage.setItem(k,JSON.stringify(v));return 1}catch(e){console.warn('storage full',e);return 0}}
function loadData(k,d=null){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}}

function saveGallery(g){return saveData(KEYS.gallery,g)}
function loadGallery(){return loadData(KEYS.gallery,[])}

function saveSettings(s){return saveData(KEYS.settings,s)}
function loadSettings(){return loadData(KEYS.settings,{autoCopy:false})}"""

# ═══════════════════════════════════════════════════════════
# ✨ 4. particles.js
# ═══════════════════════════════════════════════════════════

def build_particles_js():
    return """function initParticles(){const c=document.getElementById('particlesContainer');c.innerHTML='';const cols=['#00ffcc','#ff44aa','#6366f1'];for(let i=0;i<40;i++){const p=document.createElement('div');p.className='particle';p.style.cssText=`left:${Math.random()*100}%;bottom:-10px;width:${Math.random()*4+1}px;height:${Math.random()*4+1}px;background:radial-gradient(circle,${cols[i%3]} 0%,transparent 70%);animation:particleFloat ${Math.random()*5+5}s ease-in infinite;animation-delay:${Math.random()*5}s`;c.appendChild(p)}}"""

# ═══════════════════════════════════════════════════════════
# 🎨 5. visualizer.js
# ═══════════════════════════════════════════════════════════

def build_visualizer_js():
    return """let vizCanvas,vizCtx,vizData=[],previewImg=null;

function initVisualizer(){
    vizCanvas=document.getElementById('vizCanvas');
    vizCtx=vizCanvas.getContext('2d');
    previewImg=document.getElementById('previewImg');
    resizeViz();
    window.addEventListener('resize',resizeViz);
    for(let i=0;i<128;i++)vizData.push(0);
    drawViz();
}

function resizeViz(){
    const c=vizCanvas.parentElement;
    vizCanvas.width=c.clientWidth;
    vizCanvas.height=c.clientHeight;
}

function drawViz(){
    requestAnimationFrame(drawViz);
    if(!vizCtx)return;
    const w=vizCanvas.width,h=vizCanvas.height;
    vizCtx.fillStyle='rgba(5,5,16,0.3)';
    vizCtx.fillRect(0,0,w,h);
    const cx=w/2,cy=h/2,r=Math.min(w,h)*0.3;
    for(let i=0;i<vizData.length;i++){
        const a=(i/vizData.length)*Math.PI*2;
        const val=vizData[i]*0.7;
        const x1=cx+Math.cos(a)*(r+val*30);
        const y1=cy+Math.sin(a)*(r+val*30);
        const x2=cx+Math.cos(a)*(r-val*20);
        const y2=cy+Math.sin(a)*(r-val*20);
        const grad=vizCtx.createLinearGradient(x1,y1,x2,y2);
        grad.addColorStop(0,`rgba(0,255,204,${0.3+val})`);
        grad.addColorStop(0.5,`rgba(99,102,241,${0.2+val})`);
        grad.addColorStop(1,`rgba(255,68,170,${0.1+val})`);
        vizCtx.beginPath();
        vizCtx.moveTo(x1,y1);
        vizCtx.lineTo(x2,y2);
        vizCtx.strokeStyle=grad;
        vizCtx.lineWidth=1+val;
        vizCtx.stroke();
    }
    vizCtx.beginPath();
    vizCtx.arc(cx,cy,5,0,Math.PI*2);
    vizCtx.fillStyle='#fff';
    vizCtx.shadowColor='#00ffcc';
    vizCtx.shadowBlur=20;
    vizCtx.fill();
    vizCtx.shadowBlur=0;
}

function pulseViz(){
    for(let i=0;i<vizData.length;i++)vizData[i]=Math.random()*0.6+0.1;
    setTimeout(()=>{for(let i=0;i<vizData.length;i++)vizData[i]*=0.5},300);
}

function showPreview(url,name){
    const box=document.getElementById('visualizer3D');
    if(!url){
        box.classList.remove('has-image');
        previewImg.removeAttribute('src');
        document.getElementById('trackTitle').innerText='اختر صورة';
        document.getElementById('trackArtist').innerText='Pixel Vault 2044';
        document.getElementById('currentTime').innerText='—';
        document.getElementById('totalTime').innerText='—';
        return;
    }
    previewImg.src=url;
    box.classList.add('has-image');
    document.getElementById('trackTitle').innerText=name||'صورة';
    document.getElementById('trackArtist').innerText='Pixel Vault 2044';
}"""

# ═══════════════════════════════════════════════════════════
# ☁️ 6. uploader.js  ← الملف الأساسي المُصلَح
# ═══════════════════════════════════════════════════════════

def build_uploader_js():
    return """// ═══════════════════════════════════════════════════════════
// ☁️ Cloudinary Uploader - Fixed Version
// يستخدم fetch + يدعم Capacitor + WebView + Web
// ═══════════════════════════════════════════════════════════
const CLOUD_NAME='""" + CLOUD_NAME + """';
const UPLOAD_PRESET='""" + UPLOAD_PRESET + """';
const UPLOAD_URL=`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

// تحويل الملف إلى Base64 (fallback موثوق في WebView)
function fileToBase64(file){
    return new Promise((resolve,reject)=>{
        const reader=new FileReader();
        reader.onload=()=>resolve(reader.result);
        reader.onerror=reject;
        reader.readAsDataURL(file);
    });
}

// الرفع الرئيسي
async function uploadImage(file){
    // فحص النوع
    if(!file.type||!file.type.startsWith('image/')){
        showToast('❌ ليس ملف صورة');
        return null;
    }
    if(file.size>10485760){
        showToast('⚠️ الصورة كبيرة (10MB)');
    }

    setProgress(10,'⏳ تجهيز الملف...');

    try{
        // ─── المحاولة 1: fetch + FormData (الأفضل) ───
        const fd=new FormData();
        fd.append('file',file);
        fd.append('upload_preset',UPLOAD_PRESET);

        setProgress(25,'⏳ جاري الرفع...');

        const res=await fetch(UPLOAD_URL,{
            method:'POST',
            body:fd,
            mode:'cors',
            cache:'no-cache'
        });

        const data=await res.json().catch(()=>({}));

        if(res.ok&&data.secure_url){
            setProgress(100,'✅ تم الرفع');
            setTimeout(()=>setProgress(0,'جاهز للرفع'),1500);
            return {
                url:data.secure_url,
                publicId:data.public_id,
                name:file.name,
                size:file.size,
                at:Date.now()
            };
        }

        // فشل fetch — نحاول Base64
        const errMsg=(data.error&&data.error.message)||`HTTP ${res.status}`;
        console.warn('fetch upload failed:',errMsg);

        // ─── المحاولة 2: Base64 (يعمل دائمًا في WebView) ───
        setProgress(40,'⏳ محاولة بديلة...');
        const base64=await fileToBase64(file);

        const res2=await fetch(UPLOAD_URL,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                file:base64,
                upload_preset:UPLOAD_PRESET
            })
        });

        const data2=await res2.json().catch(()=>({}));

        if(res2.ok&&data2.secure_url){
            setProgress(100,'✅ تم الرفع');
            setTimeout(()=>setProgress(0,'جاهز للرفع'),1500);
            return {
                url:data2.secure_url,
                publicId:data2.public_id,
                name:file.name,
                size:file.size,
                at:Date.now()
            };
        }

        const err2=(data2.error&&data2.error.message)||`HTTP ${res2.status}`;
        throw new Error(err2);

    }catch(e){
        console.error('upload error:',e);
        setProgress(0,'❌ '+e.message);
        showToast('❌ فشل الرفع: '+e.message);
        return null;
    }
}

function setProgress(pct,status){
    const fill=document.getElementById('progressFill');
    const text=document.getElementById('progressStatus');
    if(fill)fill.style.width=pct+'%';
    if(text)text.innerText=status||'';
}"""

# ═══════════════════════════════════════════════════════════
# 🖼️ 7. gallery.js  ← مُصلَح
# ═══════════════════════════════════════════════════════════

def build_gallery_js():
    return """let gallery=[],currentIndex=-1,isUploading=false;

function initGallery(){
    gallery=loadGallery();
    renderGallery();
    if(gallery.length>0){
        currentIndex=0;
        selectImage(0,false);
    }else{
        currentIndex=-1;
        showPreview(null);
    }
}

async function handleFiles(input){
    if(isUploading){showToast('⏳ انتظر انتهاء الرفع');return}
    const files=Array.from(input.files||[]);
    if(!files.length)return;

    isUploading=true;
    const btn=document.getElementById('uploadBtn');
    if(btn)btn.disabled=true;

    let ok=0,fail=0;
    const wasEmpty=gallery.length===0;

    for(const f of files){
        const res=await uploadImage(f);
        if(res){
            // الصورة المرفوعة حديثًا تُضاف في البداية
            gallery.unshift(res);
            saveGallery(gallery);
            ok++;
            if(loadSettings().autoCopy)copyLink(res.url);
        }else fail++;
    }

    // بعد انتهاء كل الرفع — نحدّد الصورة الأولى كـ selected
    if(ok>0){
        currentIndex=0;
        renderGallery();
        selectImage(0,false);
        // تأثير بصري احتفالي
        if(typeof pulseViz==='function')pulseViz();
    }

    isUploading=false;
    if(btn)btn.disabled=false;
    input.value='';

    if(ok>0){
        showToast(`✅ تم رفع ${ok} صورة${fail?` · ${fail} فشلت`:''}`);
    }else if(fail>0){
        showToast(`❌ فشل رفع ${fail} صورة`);
    }
}

function renderGallery(){
    const c=document.getElementById('imageGallery');
    if(!c)return;
    if(!gallery.length){
        c.innerHTML='<div class="empty-playlist"><span>🖼️</span><p>اضغط الزر الأزرق لرفع أول صورة</p></div>';
        return;
    }
    c.innerHTML=gallery.map((g,i)=>`
        <div class="img-card ${i===currentIndex?'selected':''}" onclick="selectImage(${i})">
            <img src="${g.url}" alt="${escapeHtml(g.name)}" loading="lazy" onerror="this.style.opacity=0.3">
            <div class="img-name">${escapeHtml(g.name)}</div>
            <div class="img-actions">
                <button onclick="event.stopPropagation();copyLink('${g.url}')">🔗</button>
                <button onclick="event.stopPropagation();shareLink('${g.url}')">📤</button>
                <button class="danger" onclick="event.stopPropagation();removeImage(${i})">🗑️</button>
            </div>
        </div>
    `).join('');
}

function selectImage(i,silent=true){
    if(i<0||i>=gallery.length)return;
    currentIndex=i;
    const g=gallery[i];
    showPreview(g.url,g.name);
    document.getElementById('currentTime').innerText=formatSize(g.size);
    document.getElementById('totalTime').innerText=formatDate(g.at);
    renderGallery();
    if(silent)showToast('👁️ '+g.name);
}

function nextImage(){
    if(!gallery.length)return;
    selectImage((currentIndex+1)%gallery.length);
}

function prevImage(){
    if(!gallery.length)return;
    selectImage((currentIndex-1+gallery.length)%gallery.length);
}

function removeImage(i){
    if(!gallery.length)return;
    if(!confirm('حذف هذه الصورة من المعرض المحلي؟'))return;
    gallery.splice(i,1);
    saveGallery(gallery);
    if(gallery.length===0){
        currentIndex=-1;
        renderGallery();
        showPreview(null);
    }else{
        if(currentIndex>=gallery.length)currentIndex=gallery.length-1;
        if(currentIndex<0)currentIndex=0;
        renderGallery();
        selectImage(currentIndex,false);
    }
    showToast('🗑️ تم الحذف من المعرض');
}

function deleteCurrent(){
    if(currentIndex>=0)removeImage(currentIndex);
    else showToast('⚠️ لا توجد صورة محددة');
}

function clearGallery(){
    if(!gallery.length){showToast('⚠️ المعرض فارغ');return}
    if(!confirm('مسح كل الصور من المعرض المحلي؟'))return;
    gallery=[];
    currentIndex=-1;
    saveGallery([]);
    renderGallery();
    showPreview(null);
    showToast('🗑️ تم مسح المعرض');
}

function copyLink(url){
    const done=()=>showToast('📋 تم نسخ الرابط');
    const fallback=()=>{
        const ta=document.createElement('textarea');
        ta.value=url;
        ta.style.position='fixed';
        ta.style.opacity='0';
        document.body.appendChild(ta);
        ta.select();
        try{document.execCommand('copy');done()}
        catch(e){showToast('❌ لم يتم النسخ')}
        ta.remove();
    };
    if(navigator.clipboard&&navigator.clipboard.writeText){
        navigator.clipboard.writeText(url).then(done).catch(fallback);
    }else fallback();
}

function shareLink(url){
    if(navigator.share){
        navigator.share({url:url,title:'Pixel Vault 2044'}).catch(()=>{});
    }else copyLink(url);
}

function formatSize(b){
    if(b>1048576)return (b/1048576).toFixed(1)+' MB';
    return (b/1024).toFixed(1)+' KB';
}

function formatDate(ts){
    const d=new Date(ts);
    return d.toLocaleDateString('ar')+' '+d.getHours()+':'+String(d.getMinutes()).padStart(2,'0');
}

function escapeHtml(s){
    return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}"""

# ═══════════════════════════════════════════════════════════
# ⚙️ 8. app.js
# ═══════════════════════════════════════════════════════════

def build_app_js():
    return """function toggleInfo(){
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
    if(!t)return;
    t.textContent=m;
    t.classList.add('show');
    clearTimeout(window._toastTimer);
    window._toastTimer=setTimeout(()=>t.classList.remove('show'),2500);
}

// ─── التهيئة ───
window.addEventListener('DOMContentLoaded',()=>{
    initParticles();
    initVisualizer();
    initGallery();

    const s=loadSettings();
    if(s.autoCopy)document.getElementById('autoCopyBtn').classList.add('active');

    console.log('%c🖼️ Pixel Vault 2044 Ready','color:#00ffcc;font-size:16px;font-weight:bold');
    console.log('%c☁️ Cloudinary: """ + CLOUD_NAME + """','color:#6366f1');
});"""

# ═══════════════════════════════════════════════════════════
# 🚀 MAIN
# ═══════════════════════════════════════════════════════════

def main():
    print(f"""
╔══════════════════════════════════════════════════════════╗
║  🖼️  PIXEL VAULT 2044 - FIXED BUILD  🖼️                ║
║     Cloudinary: {CLOUD_NAME:<40}║
║     Preset: {UPLOAD_PRESET:<45}║
╚══════════════════════════════════════════════════════════╝
    """)
    section("BUILDING FIXED PIXEL VAULT")

    write("index.html", build_index())
    write("style.css", build_style())
    write("storage.js", build_storage_js())
    write("particles.js", build_particles_js())
    write("visualizer.js", build_visualizer_js())
    write("uploader.js", build_uploader_js())
    write("gallery.js", build_gallery_js())
    write("app.js", build_app_js())

    print(f"""
{'='*60}
  ✅ BUILD COMPLETE! - {TOTAL_LINES} سطر
  📁 8 ملفات جاهزة

  🔧 الإصلاحات:
     ✅ fetch بدل XHR (أخف وأكثر توافقًا)
     ✅ fallback Base64 إذا فشل FormData
     ✅ إصلاح currentIndex بعد الرفع
     ✅ معاينة فورية للصورة المرفوعة
     ✅ إظهار الأخطاء الحقيقية في toast
     ✅ DOMContentLoaded للتهيئة الآمنة
     ✅ CSP meta لتجنب حظر الطلبات
     ✅ onerror للصور التالفة

  🚀 الخطوات:
     1. شغّل السكربت
     2. انسخ الـ 8 ملفات إلى www/
     3. ارفع على GitHub → APK
     4. ثبّت واختبر

  🖼️ PIXEL VAULT 2044 READY!
{'='*60}
    """)

if __name__ == "__main__":
    main()
