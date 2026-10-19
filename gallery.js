let gallery=[],currentIndex=-1,isUploading=false;

function initGallery(){
    gallery=loadGallery();
    renderGallery();
    if(gallery.length){currentIndex=0;selectImage(0,false)}
}

async function handleFiles(input){
    if(isUploading){showToast('⏳ انتظر انتهاء الرفع');return}
    const files=Array.from(input.files||[]);
    if(!files.length)return;
    isUploading=true;
    document.getElementById('uploadBtn').disabled=true;
    let ok=0,fail=0;
    for(const f of files){
        const res=await uploadImage(f);
        if(res){
            gallery.unshift(res);
            saveGallery(gallery);
            renderGallery();
            ok++;
            if(loadSettings().autoCopy)copyLink(res.url);
        }else fail++;
    }
    isUploading=false;
    document.getElementById('uploadBtn').disabled=false;
    input.value='';
    if(ok){
        showToast(`✅ تم رفع ${ok} صورة${fail?` (${fail} فشلت)`:''}`);
        if(currentIndex<0)selectImage(0,false);
    }else if(fail){
        showToast(`❌ فشل رفع ${fail} صورة`);
    }
}

function renderGallery(){
    const c=document.getElementById('imageGallery');
    if(!gallery.length){
        c.innerHTML='<div class="empty-playlist"><span>🖼️</span><p>اضغط الزر الأزرق لرفع أول صورة</p></div>';
        return;
    }
    c.innerHTML=gallery.map((g,i)=>`
        <div class="img-card ${i===currentIndex?'selected':''}" onclick="selectImage(${i})">
            <img src="${g.url}" alt="${escapeHtml(g.name)}" loading="lazy">
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
    if(!confirm('حذف هذه الصورة من المعرض؟'))return;
    const removed=gallery[i];
    gallery.splice(i,1);
    saveGallery(gallery);
    if(currentIndex>=gallery.length)currentIndex=gallery.length-1;
    renderGallery();
    if(gallery.length)selectImage(currentIndex,false);
    else showPreview(null);
    showToast('🗑️ تم الحذف من المعرض');
    // ملاحظة: الحذف من Cloudinary يحتاج Backend
}

function deleteCurrent(){
    if(currentIndex>=0)removeImage(currentIndex);
}

function clearGallery(){
    if(!confirm('مسح كل الصور من المعرض المحلي؟'))return;
    gallery=[];
    currentIndex=-1;
    saveGallery([]);
    renderGallery();
    showPreview(null);
    showToast('🗑️ تم مسح المعرض');
}

function copyLink(url){
    if(navigator.clipboard&&navigator.clipboard.writeText){
        navigator.clipboard.writeText(url)
            .then(()=>showToast('📋 تم نسخ الرابط'))
            .catch(fallbackCopy);
    }else fallbackCopy();
    function fallbackCopy(){
        const ta=document.createElement('textarea');
        ta.value=url;
        ta.style.position='fixed';
        ta.style.opacity='0';
        document.body.appendChild(ta);
        ta.select();
        try{document.execCommand('copy');showToast('📋 تم النسخ')}
        catch(e){showToast('❌ لم يتم النسخ')}
        ta.remove();
    }
}

function shareLink(url){
    if(navigator.share){
        navigator.share({url:url,title:'Pixel Vault 2044'}).catch(()=>{});
    }else{
        copyLink(url);
    }
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
}