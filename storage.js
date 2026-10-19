const KEYS={gallery:'pixelvault_gallery',settings:'pixelvault_settings',ai:'pixelvault_ai',results:'pixelvault_results'};
function saveData(k,v){try{localStorage.setItem(k,JSON.stringify(v));return 1}catch(e){console.warn('storage full',e);return 0}}
function loadData(k,d=null){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}}

function saveGallery(g){return saveData(KEYS.gallery,g)}
function loadGallery(){return loadData(KEYS.gallery,[])}

function saveSettings(s){return saveData(KEYS.settings,s)}
function loadSettings(){return loadData(KEYS.settings,{autoCopy:false})}

function saveAIConfig(c){return saveData(KEYS.ai,c)}
// ✅ القيمة الافتراضية للموديل أصبحت gemini-2.5-flash
function loadAIConfig(){return loadData(KEYS.ai,{geminiKey:'',geminiModel:'gemini-2.5-flash',lang:'ar'})}

function saveAIResult(imageId,result){
    const all=loadData(KEYS.results,{});
    all[imageId]={result:result,at:Date.now()};
    saveData(KEYS.results,all);
}
function getAIResult(imageId){
    const all=loadData(KEYS.results,{});
    return all[imageId]||null;
}