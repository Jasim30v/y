let cloudName='',uploadPreset='';

function loadCloudConfig(){
    const s=loadSettings();
    cloudName=s.cloudName||'';
    uploadPreset=s.uploadPreset||'';
    document.getElementById('cloudNameInput').value=cloudName;
    document.getElementById('uploadPresetInput').value=uploadPreset;
    document.getElementById('autoCopyBtn').classList.toggle('active',!!s.autoCopy);
}

function saveCloudSettings(){
    cloudName=document.getElementById('cloudNameInput').value.trim();
    uploadPreset=document.getElementById('uploadPresetInput').value.trim();
    if(!cloudName||!uploadPreset){showToast('❌ املأ الحقلين أولًا');return}
    const s=loadSettings();
    s.cloudName=cloudName;s.uploadPreset=uploadPreset;
    saveSettings(s);
    showToast('✅ تم الحفظ');
}

async function uploadImage(file){
    if(!cloudName||!uploadPreset){showToast('⚙️ اضبط إعدادات Cloudinary أولًا');toggleSettings();return null}
    if(!file.type.startsWith('image/')){showToast('❌ ليس ملف صورة');return null}

    const fd=new FormData();
    fd.append('file',file);
    fd.append('upload_preset',uploadPreset);

    try{
        setProgress(5,'⏳ جاري الرفع...');
        const xhr=new XMLHttpRequest();
        const url=`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
        return await new Promise((resolve,reject)=>{
            xhr.upload.onprogress=e=>{
                if(e.lengthComputable)setProgress((e.loaded/e.total)*100,`⏳ ${Math.round((e.loaded/e.total)*100)}%`);
            };
            xhr.onload=()=>{
                try{
                    const data=JSON.parse(xhr.responseText);
                    if(xhr.status>=200&&xhr.status<300){
                        setProgress(100,'✅ تم الرفع');
                        setTimeout(()=>setProgress(0,'جاهز'),1200);
                        resolve({url:data.secure_url,publicId:data.public_id,name:file.name,size:file.size,at:Date.now()});
                    }else{
                        setProgress(0,'❌ فشل: '+((data.error&&data.error.message)||'خطأ'));
                        reject(new Error((data.error&&data.error.message)||'upload failed'));
                    }
                }catch(err){setProgress(0,'❌ خطأ في الاستجابة');reject(err)}
            };
            xhr.onerror=()=>{setProgress(0,'❌ خطأ شبكة');reject(new Error('network'))};
            xhr.open('POST',url);
            xhr.send(fd);
        });
    }catch(e){
        showToast('❌ '+e.message);
        return null;
    }
}

function setProgress(pct,status){
    document.getElementById('progressFill').style.width=pct+'%';
    document.getElementById('progressStatus').innerText=status||'';
}