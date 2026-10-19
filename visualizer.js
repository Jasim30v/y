let vizCanvas,vizCtx,vizData=[],previewImg=null;

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
}