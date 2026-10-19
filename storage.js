const KEYS={gallery:'pixelvault_gallery',settings:'pixelvault_settings'};
function saveData(k,v){try{localStorage.setItem(k,JSON.stringify(v));return 1}catch(e){console.warn('storage full',e);return 0}}
function loadData(k,d=null){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}}

function saveGallery(g){return saveData(KEYS.gallery,g)}
function loadGallery(){return loadData(KEYS.gallery,[])}

function saveSettings(s){return saveData(KEYS.settings,s)}
function loadSettings(){return loadData(KEYS.settings,{cloudName:'',uploadPreset:'',autoCopy:false})}