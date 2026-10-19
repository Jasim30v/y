const CLOUD_NAME='dhu9l0lfs';
const UPLOAD_PRESET='go_fk3';
const UPLOAD_URL=`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

function fileToBase64(file){
    return new Promise((resolve,reject)=>{
        const reader=new FileReader();
        reader.onload=()=>resolve(reader.result);
        reader.onerror=reject;
        reader.readAsDataURL(file);
    });
}

async function uploadImage(file){
    if(!file.type||!file.type.startsWith('image/')){
        showToast('❌ ليس ملف صورة');
        return null;
    }
    if(file.size>10485760){
        showToast('⚠️ الصورة كبيرة (10MB)');
    }
    setProgress(10,'⏳ تجهيز الملف...');
    try{
        const fd=new FormData();
        fd.append('file',file);
        fd.append('upload_preset',UPLOAD_PRESET);
        setProgress(25,'⏳ جاري الرفع...');
        const res=await fetch(UPLOAD_URL,{method:'POST',body:fd,mode:'cors',cache:'no-cache'});
        const data=await res.json().catch(()=>({}));
        if(res.ok&&data.secure_url){
            setProgress(100,'✅ تم الرفع');
            setTimeout(()=>setProgress(0,'جاهز'),1500);
            return {url:data.secure_url,publicId:data.public_id,name:file.name,size:file.size,at:Date.now()};
        }
        const errMsg=(data.error&&data.error.message)||`HTTP ${res.status}`;
        console.warn('fetch upload failed:',errMsg);
        setProgress(40,'⏳ محاولة بديلة...');
        const base64=await fileToBase64(file);
        const res2=await fetch(UPLOAD_URL,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({file:base64,upload_preset:UPLOAD_PRESET})
        });
        const data2=await res2.json().catch(()=>({}));
        if(res2.ok&&data2.secure_url){
            setProgress(100,'✅ تم الرفع');
            setTimeout(()=>setProgress(0,'جاهز'),1500);
            return {url:data2.secure_url,publicId:data2.public_id,name:file.name,size:file.size,at:Date.now()};
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
}