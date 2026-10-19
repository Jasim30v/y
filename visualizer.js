let previewImg=null;
function initVisualizer(){
    const box=document.getElementById('visualizer3D');
    previewImg=document.createElement('img');
    previewImg.className='preview-img';
    box.insertBefore(previewImg,box.firstChild);
}
function showPreview(url,name){
    const box=document.getElementById('visualizer3D');
    if(!url){box.classList.remove('has-image');document.getElementById('trackTitle').innerText='اختر صورة';document.getElementById('trackArtist').innerText='Pixel Vault 2044';return}
    previewImg.src=url;
    box.classList.add('has-image');
    document.getElementById('trackTitle').innerText=name||'صورة';
    document.getElementById('trackArtist').innerText='Pixel Vault 2044';
}