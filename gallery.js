let gallery=[],currentIndex=-1;

function initGallery(){
    gallery=loadGallery();
    renderGallery();
    if(gallery.length){currentIndex=0;selectImage(0,false)}
}

async function handleFiles(input){
    const files=Array.from(input.files||[]);
    if(!files.length)return;
    let ok=0;
    for(const f of files){
        const res=await uploadImage(f);
        if(res){
            gallery.unshift(res);
            saveGallery(gallery);
            renderGallery();
            ok++;
            if(loadSettings().autoCopy)copyLink(res.url);
        }
    }
    input.value='';
    if(ok){
        showToast(`✅ تم رفع ${ok} صورة`);
        if(currentIndex<0)selectImage(0,false);
    }
}

function renderGallery(){
    const c=document.getElementById('imageGallery');
    if(!gallery.length){
        c.innerHTML='<div class="empty-playlist"><span>🖼️</span><p>ارفع أول صورة لك</p></div>';
        return;
    }
    c.innerHTML=gallery.map((g,i)=>`
        <div class="img-card ${i===currentIndex?'selected':''}" onclick="selectImage(${i})">
            <img src="${g.url}" alt="${escapeHtml(g.name)}" loading="lazy">
            <div class="img-name">${escapeHtml(g.name)}</div>
            <div class="img-actions">
                <button onclick="event.stopPropagation();copyLink('${g.url}')">🔗 نسخ</button>
                <button onclick="event.stopPropagation();shareLink('${g.url}')">📤 مشاركة</button>
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

function nextImage(){if(!gallery.length)return;selectImage((currentIndex+1)%gallery.length)}
function prevImage(){if(!gallery.length)return;selectImage((currentIndex-1+gallery.length)%gallery.length)}

function removeImage(i){
    if(!confirm('حذف هذه الصورة من المعرض المحلي؟'))return;
    gallery.splice(i,1);
    saveGallery(gallery);
    if(currentIndex>=gallery.length)currentIndex=gallery.length-1;
    renderGallery();
    if(gallery.length)selectImage(currentIndex,false);
    else showPreview(null);
    showToast('🗑️ تم الحذف');
}

function deleteCurrent(){if(currentIndex>=0)removeImage(currentIndex)}
function clearGallery(){if(!confirm('مسح كل الصور من المعرض المحلي؟'))return;gallery=[];saveGallery([]);renderGallery();showPreview(null);showToast('🗑️ تم المسح')}

function copyLink(url){
    navigator.clipboard.writeText(url).then(()=>showToast('📋 تم نسخ الرابط')).catch(()=>{
        const ta=document.createElement('textarea');ta.value=url;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();showToast('📋 تم النسخ');
    });
}

function shareLink(url){
    if(navigator.share){navigator.share({url,title:'Pixel Vault 2044'}).catch(()=>{})}
    else copyLink(url);
}

function formatSize(b){return b>1048576?(b/1048576).toFixed(1)+' MB':(b/1024).toFixed(1)+' KB'}
function formatDate(ts){const d=new Date(ts);return d.toLocaleDateString('ar')+' '+d.getHours()+':'+String(d.getMinutes()).padStart(2,'0')}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}