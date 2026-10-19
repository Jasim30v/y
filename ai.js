// ═══════════════════════════════════════════════════════════
// 🧠 AI Vision Module
// 3 طرق:
// 1. إرسال الرابط إلى Gemini (نسخ + فتح الموقع)
// 2. إرسال الرابط إلى ChatGPT (نسخ + فتح الموقع)
// 3. تحليل داخلي عبر Gemini API مباشرة
// ═══════════════════════════════════════════════════════════

let aiConfig = {geminiKey:'',lang:'ar'};
let lastAIResult = '';

function initAI(){
    aiConfig = loadAIConfig();
    document.getElementById('geminiKey').value = aiConfig.geminiKey||'';
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
    }
}

function saveAISettings(){
    aiConfig = {
        geminiKey: document.getElementById('geminiKey').value.trim(),
        lang: document.getElementById('aiLang').value
    };
    saveAIConfig(aiConfig);
    showToast('✅ تم حفظ إعدادات AI');
    document.getElementById('aiSettingsPanel').style.display='none';
    document.getElementById('btnAI').classList.remove('active');
}

// ═══════════════════════════════════════════════════════════
// 📋 دالة مساعدة: نسخ الرابط + فتح الموقع
// ═══════════════════════════════════════════════════════════
async function copyAndOpen(url, siteName, siteUrl){
    if(currentIndex<0||!gallery[currentIndex]){
        showToast('⚠️ اختر صورة أولاً');
        return;
    }
    const imgUrl = gallery[currentIndex].url;

    // نسخ الرابط
    try{
        await navigator.clipboard.writeText(imgUrl);
        showToast(`📋 تم نسخ الرابط! افتح ${siteName} والصقه`);
    }catch(e){
        const ta = document.createElement('textarea');
        ta.value = imgUrl;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try{document.execCommand('copy');showToast(`📋 تم النسخ! افتح ${siteName}`)}
        catch(err){showToast('❌ لم يتم النسخ')}
        ta.remove();
    }

    // فتح الموقع
    setTimeout(()=>{
        window.open(siteUrl, '_blank');
    }, 600);
}

// ═══════════════════════════════════════════════════════════
// 💬 إرسال إلى Gemini (نسخ + فتح)
// ═══════════════════════════════════════════════════════════
async function sendToGemini(){
    await copyAndOpen(null, 'Gemini', 'https://gemini.google.com/app');
}

// ═══════════════════════════════════════════════════════════
// 💬 إرسال إلى ChatGPT (نسخ + فتح)
// ═══════════════════════════════════════════════════════════
async function sendToChatGPT(){
    await copyAndOpen(null, 'ChatGPT', 'https://chatgpt.com/');
}

// ═══════════════════════════════════════════════════════════
// 🧠 التحليل الداخلي عبر Gemini API
// ═══════════════════════════════════════════════════════════
function getPrompt(){
    if(aiConfig.lang==='en'){
        return 'Describe this image in detail: content, colors, mood, possible use, and any text. Be concise but complete.';
    }
    return 'صف هذه الصورة بالتفصيل: ماذا تحتوي، الألوان، المشاعر، الاستخدام المحتمل، وأي نص موجود. كن موجزًا لكن شاملًا.';
}

async function analyzeWithGemini(imageUrl){
    if(!aiConfig.geminiKey){
        throw new Error('أدخل مفتاح Gemini أولاً (زر 🤖)');
    }

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

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${aiConfig.geminiKey}`;
    const body = {
        contents:[{
            parts:[
                {text:getPrompt()},
                {inline_data:{mime_type:mime,data:base64}}
            ]
        }],
        generationConfig:{temperature:0.4,maxOutputTokens:1024}
    };

    const res = await fetch(endpoint,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(body)
    });
    const data = await res.json().catch(()=>({}));
    if(!res.ok){
        const msg = (data.error&&data.error.message)||`HTTP ${res.status}`;
        throw new Error(msg);
    }
    const text = data.candidates
        && data.candidates[0]
        && data.candidates[0].content
        && data.candidates[0].content.parts
        && data.candidates[0].content.parts[0]
        && data.candidates[0].content.parts[0].text;
    if(!text) throw new Error('لم يتم استلام رد من Gemini');
    return text;
}

// ═══════════════════════════════════════════════════════════
// 🎯 تحليل الصورة الحالية داخل التطبيق
// ═══════════════════════════════════════════════════════════
async function analyzeCurrentImage(){
    if(currentIndex<0||!gallery[currentIndex]){
        showToast('⚠️ اختر صورة أولاً');
        return;
    }
    const img = gallery[currentIndex];
    const btn = document.getElementById('aiAnalyzeBtn');
    const panel = document.getElementById('aiResultPanel');
    const content = document.getElementById('aiResultContent');

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحليل...';
    panel.style.display='block';
    content.innerHTML = '<p class="ai-placeholder">🧠 الذكاء الاصطناعي يقرأ الصورة...</p>';
    setProgress(20,'🧠 تحليل...');

    try{
        const result = await analyzeWithGemini(img.url);
        lastAIResult = result;
        content.textContent = result;
        saveAIResult(img.publicId||img.url, result);
        setProgress(100,'✅ تم التحليل');
        setTimeout(()=>setProgress(0,'جاهز'),1500);
        showToast('🧠 اكتمل التحليل');
    }catch(e){
        console.error('AI error:',e);
        content.innerHTML = `<p class="ai-placeholder" style="color:#ff6688">❌ ${e.message}</p>`;
        setProgress(0,'❌ فشل التحليل');
        showToast('❌ '+e.message);
    }finally{
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-brain"></i> حلّل داخل التطبيق';
    }
}

function closeAIResult(){
    document.getElementById('aiResultPanel').style.display='none';
}

function copyAIResult(){
    if(!lastAIResult){showToast('⚠️ لا نتيجة للنسخ');return}
    copyLink(lastAIResult);
}