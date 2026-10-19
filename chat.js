// ═══════════════════════════════════════════════════════════
// 💬 Chat Module - دردشة تفاعلية مع Gemini حول الصورة
// ═══════════════════════════════════════════════════════════
let chatHistory = [];
let chatImageBase64 = null;
let chatImageMime = null;

function openChat(){
    if(currentIndex<0||!gallery[currentIndex]){
        showToast('⚠️ اختر صورة أولاً');
        return;
    }
    if(!aiConfig.geminiKey){
        showToast('⚠️ أدخل مفتاح Gemini أولاً');
        toggleAISettings();
        return;
    }
    document.getElementById('chatPanel').style.display='flex';
    document.getElementById('aiResultPanel').style.display='none';
    document.getElementById('aiSettingsPanel').style.display='none';
    document.getElementById('infoPanel').style.display='none';
    resetChat();
}

function closeChat(){
    document.getElementById('chatPanel').style.display='none';
}

async function resetChat(){
    chatHistory = [];
    const img = gallery[currentIndex];
    const container = document.getElementById('chatMessages');
    container.innerHTML = '<div class="chat-msg ai-msg">⏳ جاري قراءة الصورة...</div>';
    
    try{
        const resp = await fetch(img.url, {mode:'cors'});
        const blob = await resp.blob();
        chatImageMime = blob.type || 'image/jpeg';
        chatImageBase64 = await new Promise((res,rej)=>{
            const r = new FileReader();
            r.onload=()=>res(r.result.split(',')[1]);
            r.onerror=rej;
            r.readAsDataURL(blob);
        });
        container.innerHTML = '';
        addChatMessage('ai', '✅ تم تحميل الصورة! اسألني أي شيء عنها.\n(مثال: ماذا يوجد فيها؟ / اقرأ النص / صف الألوان)');
    }catch(e){
        container.innerHTML = '';
        addChatMessage('ai', '❌ فشل تحميل الصورة: '+e.message);
    }
}

function addChatMessage(role, text){
    const container = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = 'chat-msg ' + (role === 'user' ? 'user-msg' : 'ai-msg');
    div.textContent = text;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return div;
}

async function sendChatMessage(){
    const input = document.getElementById('chatInput');
    const msg = input.value.trim();
    if(!msg) return;
    if(!chatImageBase64){
        showToast('⏳ انتظر تحميل الصورة');
        return;
    }

    addChatMessage('user', msg);
    input.value = '';
    
    const typingEl = addChatMessage('ai', '...');
    typingEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i> يفكر...';

    // إضافة سؤال المستخدم للتاريخ
    chatHistory.push({role:'user', text:msg});

    try{
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${aiConfig.geminiKey}`;
        const body = {
            contents: [{
                parts: [
                    {text: msg},
                    {inline_data: {mime_type: chatImageMime, data: chatImageBase64}}
                ]
            }]
        };

        const res = await fetch(endpoint, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });

        const data = await res.json().catch(()=>({}));
        if(!res.ok){
            throw new Error((data.error && data.error.message) || 'HTTP '+res.status);
        }

        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'لم يتم استلام رد.';
        typingEl.textContent = reply;
        chatHistory.push({role:'ai', text:reply});
    }catch(e){
        typingEl.textContent = '❌ خطأ: '+e.message;
    }
}
