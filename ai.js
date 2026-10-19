// ═══════════════════════════════════════════════════════════
// 🧠 AI Vision Module - Flexible Model
// ═══════════════════════════════════════════════════════════
let aiConfig = {geminiKey:'',geminiModel:'gemini-2.5-flash',lang:'ar'};
let lastAIResult = '';

function initAI(){
    aiConfig = loadAIConfig();
    document.getElementById('geminiKey').value = aiConfig.geminiKey||'';
    document.getElementById('geminiModel').value = aiConfig.geminiModel||'gemini-2.5-flash';
    document.getElementById('aiLang').value = aiConfig.lang||'ar';
}

function toggleAISettings(){
    const p = document.getElementById('aiSettingsPanel');
    const open = p.style.display==='none';
    p.style.display = open?'block':'none';
    document.getElementById('btnAI').classList.toggle('active', open);
    if(open){
        document.getElementById('infoPanel').style.display='none';
        document.getElementById('aiResultPanel').style.display='none';
        document.getElementById('chatPanel').style.display='none';
    }
}

function saveAISettings(){
    aiConfig = {
        geminiKey: document.getElementById('geminiKey').value.trim(),
        geminiModel: document.getElementById('geminiModel').value.trim() || 'gemini-2.5-flash',
        lang: document.getElementById('aiLang').value
    };
    saveAIConfig(aiConfig);
    showToast('✅ تم الحفظ');
    document.getElementById('aiSettingsPanel').style.display='none';
    document.getElementById('btnAI').classList.remove('active');
}

// ═══════════════════════════════════════════════════════════
// 📤 مشاركة الصورة
// ═══════════════════════════════════════════════════════════
async function shareImageToAI(siteName){
    if(currentIndex<0||!gallery[currentIndex]){
        showToast('⚠️ اختر صورة أولاً');
        return;
    }
    const img = gallery[currentIndex];
    showToast('⏳ جاري تجهيز الصورة...');
    try {
        const response = await fetch(img.url, { mode: 'cors' });
        const blob = await response.blob();
        const file = new File([blob], img.name || 'image.jpg', { type: blob.type });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({ files: [file], title: 'تحليل صورة', text: 'قم بتحليل هذه الصورة' });
            showToast(`✅ اختر ${siteName} من القائمة`);
        } else {
            showToast('⚠️ جهازك لا يدعم المشاركة');
        }
    } catch (error) {
        console.error('Share error:', error);
        showToast('❌ فشل التجهيز');
    }
}

async function sendToGemini(){ await shareImageToAI('Gemini'); }
async function sendToChatGPT(){ await shareImageToAI('ChatGPT'); }

// ═══════════════════════════════════════════════════════════
// 🧠 الوصف السريع
// ═══════════════════════════════════════════════════════════
function getPrompt(){
    if(aiConfig.lang==='en') return 'Describe this image in detail.';
    return 'صف هذه الصورة بالتفصيل: المحتوى، الألوان، المشاعر، وأي نص موجود.';
}

async function analyzeWithGemini(imageUrl, customPrompt=null){
    if(!aiConfig.geminiKey) throw new Error('أدخل مفتاح Gemini أولاً');

    const imgResp = await fetch(imageUrl, {mode:'cors'});
    if(!imgResp.ok) throw new Error('تعذر تحميل الصورة');
    const blob = await imgResp.blob();
    const base64 = await new Promise((res,rej)=>{
        const r = new FileReader();
        r.onload=()=>res(r.result.split(',')[1]);
        r.onerror=rej;
        r.readAsDataURL(blob);
    });
    const mime = blob.type || 'image/jpeg';

    // ✅ استخدام الموديل من الإعدادات
    const model = aiConfig.geminiModel || 'gemini-2.5-flash';
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${aiConfig.geminiKey}`;
    const body = {
        contents:[{
            parts:[
                {text: customPrompt || getPrompt()},
                {inline_data:{mime_type:mime,data:base64}}
            ]
        }]
    };

    const res = await fetch(endpoint,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(body)
    });
    const data = await res.json().catch(()=>({}));
    if(!res.ok){
        throw new Error((data.error&&data.error.message)||`HTTP ${res.status}`);
    }
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if(!text) throw new Error('لم يتم استلام رد');
    return text;
}

async function analyzeCurrentImage(){
    if(currentIndex<0||!gallery[currentIndex]){ showToast('⚠️ اختر صورة أولاً'); return; }
    const img = gallery[currentIndex];
    const btn = document.getElementById('aiAnalyzeBtn');
    const panel = document.getElementById('aiResultPanel');
    const content = document.getElementById('aiResultContent');

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري...';
    panel.style.display='block';
    content.innerHTML = '<p class="ai-placeholder">🧠 يقرأ الصورة...</p>';
    setProgress(20,'🧠 تحليل...');

    try{
        const result = await analyzeWithGemini(img.url);
        lastAIResult = result;
        content.textContent = result;
        saveAIResult(img.publicId||img.url, result);
        setProgress(100,'✅ تم');
        setTimeout(()=>setProgress(0,'جاهز'),1500);
    }catch(e){
        content.innerHTML = `<p class="ai-placeholder" style="color:#ff6688">❌ ${e.message}</p>`;
        setProgress(0,'❌ فشل');
    }finally{
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-brain"></i> وصف سريع';
    }
}

function closeAIResult(){ document.getElementById('aiResultPanel').style.display='none'; }
function copyAIResult(){ if(lastAIResult)copyLink(lastAIResult); }