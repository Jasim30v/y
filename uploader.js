// ═══════════════════════════════════════════════════════════
// ☁️ إعدادات Cloudinary (جاهزة)
// ═══════════════════════════════════════════════════════════
const CLOUD_NAME='dhu9l0lfs';
const UPLOAD_PRESET='go_fk3';
const UPLOAD_URL=`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

async function uploadImage(file){
    if(!file.type.startsWith('image/')){
        showToast('❌ ليس ملف صورة');
        return null;
    }
    if(file.size>10485760){
        showToast('⚠️ الصورة كبيرة (10MB)');
    }
    const fd=new FormData();
    fd.append('file',file);
    fd.append('upload_preset',UPLOAD_PRESET);
    try{
        setProgress(5,'⏳ جاري الرفع...');
        const xhr=new XMLHttpRequest();
        return await new Promise((resolve,reject)=>{
            xhr.upload.onprogress=e=>{
                if(e.lengthComputable){
                    const pct=Math.round((e.loaded/e.total)*100);
                    setProgress(pct,`⏳ ${pct}%`);
                }
            };
            xhr.onload=()=>{
                try{
                    const data=JSON.parse(xhr.responseText);
                    if(xhr.status>=200&&xhr.status<300){
                        setProgress(100,'✅ تم الرفع بنجاح');
                        setTimeout(()=>setProgress(0,'جاهز للرفع'),1500);
                        resolve({
                            url:data.secure_url,
                            publicId:data.public_id,
                            name:file.name,
                            size:file.size,
                            at:Date.now()
                        });
                    }else{
                        const msg=(data.error&&data.error.message)||'خطأ';
                        setProgress(0,'❌ '+msg);
                        reject(new Error(msg));
                    }
                }catch(err){
                    setProgress(0,'❌ استجابة غير صالحة');
                    reject(err);
                }
            };
            xhr.onerror=()=>{
                setProgress(0,'❌ خطأ شبكة');
                reject(new Error('network error'));
            };
            xhr.open('POST',UPLOAD_URL);
            xhr.send(fd);
        });
    }catch(e){
        console.error('upload failed',e);
        showToast('❌ فشل الرفع: '+e.message);
        return null;
    }
}

function setProgress(pct,status){
    document.getElementById('progressFill').style.width=pct+'%';
    document.getElementById('progressStatus').innerText=status||'';
}