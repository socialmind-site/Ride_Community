/* RIDE V37 - Shared road safety markers and category filters */
(function(){
'use strict';
const FALLBACK_CATEGORIES=[
 {key:'hazard',label:'Pericolo',icon:'\u26a0\ufe0f',color:'#ef4444'},
 {key:'accident',label:'Incidente',icon:'\ud83d\udea8',color:'#e11d48'},
 {key:'roadworks',label:'Lavori',icon:'\ud83d\udea7',color:'#f59e0b'},
 {key:'closed',label:'Strada chiusa',icon:'\u26d4',color:'#64748b'},
 {key:'gravel',label:'Ghiaia / detriti',icon:'\ud83e\udda8',color:'#b7794c'},
 {key:'damaged_road',label:'Asfalto',icon:'\ud83d\udd73\ufe0f',color:'#eab308'},
 {key:'weather',label:'Meteo',icon:'\ud83c\udf27\ufe0f',color:'#38bdf8'},
 {key:'traffic',label:'Traffico',icon:'\ud83d\udea6',color:'#a78bfa'},
 {key:'other',label:'Altro',icon:'\ud83d\udccd',color:'#94a3b8'}
];
let categories=FALLBACK_CATEGORIES.slice();
let allReports=[];
let visibleReports=[];
let selectedCategory='all';
let boundMap=null;
let boundMapElement=null;
let mapOverlay=null;
let mapElement=null;
let waitTimer=null;
let resizeObserver=null;
let domObserver=null;
const markerNodes=new Map();
function api(){return window.RIDE_ROAD_SAFETY||null}
function esc(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function category(key){return categories.find(item=>item.key===key)||FALLBACK_CATEGORIES.find(item=>item.key===key)||FALLBACK_CATEGORIES[FALLBACK_CATEGORIES.length-1]}
function injectStyles(){
 if(document.getElementById('ride-road-safety-map-style'))return;
 const style=document.createElement('style');style.id='ride-road-safety-map-style';
 style.textContent=[
 '.rs-map-filters{display:flex;align-items:center;gap:7px;overflow-x:auto;scrollbar-width:none;padding:11px 1px 12px;margin:0 0 3px}',
 '.rs-map-filters::-webkit-scrollbar{display:none}',
 '.rs-map-filter{flex:none;display:inline-flex;align-items:center;gap:7px;min-height:34px;padding:0 11px;border:1px solid #34483a;border-radius:999px;background:#111d15;color:#b8c7b7;font-size:8px;font-weight:900;white-space:nowrap;transition:background .16s,border-color .16s,transform .16s}',
 '.rs-map-filter:hover{transform:translateY(-1px);border-color:#738b61}',
 '.rs-map-filter.active{border-color:var(--rs-filter-color,#b8f52e);background:#213323;color:#f1f6ed;box-shadow:inset 0 0 0 1px var(--rs-filter-color,#b8f52e)}',
 '.rs-map-filter-dot{width:9px;height:9px;border-radius:50%;background:var(--rs-filter-color,#b8f52e);box-shadow:0 0 0 2px #ffffff18;flex:none}',
 '.rs-map-filter-count{padding:3px 5px;border-radius:999px;background:#ffffff12;color:#dce8d8;font-size:7px;min-width:17px;text-align:center}',
 '.rs-map-filter-note{display:block;margin:-3px 1px 10px;color:#829385;font-size:7px;line-height:1.4}',
 '.rs-map-marker-layer{position:absolute;inset:0;z-index:520;overflow:hidden;pointer-events:none}',
 '.rs-map-marker{position:absolute;left:0;top:0;width:36px;height:36px;display:grid;place-items:center;padding:0;border:2px solid #f5f8f1;border-radius:50%;background:var(--rs-marker-color,#94a3b8);color:#11190c;box-shadow:0 0 0 4px #ffffff1c,0 4px 14px #000b;cursor:pointer;pointer-events:auto;transform:translate(-50%,-50%);transition:transform .14s,filter .14s}',
 '.rs-map-marker:hover,.rs-map-marker:focus-visible{transform:translate(-50%,-50%) scale(1.15);filter:brightness(1.08);z-index:2}',
 '.rs-map-marker span{font-size:16px;line-height:1;filter:drop-shadow(0 1px 1px #0004)}',
 '.rs-map-marker[hidden]{display:none!important}',
 '.rs-map-report-modal{display:grid;gap:9px}',
 '.rs-map-report-modal .rs-map-report-kind{display:inline-flex;align-items:center;gap:7px;color:#b8f52e;font-size:8px;font-weight:950;letter-spacing:1px}',
 '.rs-map-report-modal .rs-map-report-dot{width:9px;height:9px;border-radius:50%;background:var(--rs-report-color);box-shadow:0 0 0 3px #ffffff18}',
 '.rs-map-report-modal h3{margin:0;color:#eef5ea;font-size:17px;line-height:1.2}',
 '.rs-map-report-modal p{margin:0;color:#a7b6a8;font-size:9px;line-height:1.55;white-space:pre-wrap;overflow-wrap:anywhere}',
 '.rs-map-report-meta{display:flex;flex-wrap:wrap;gap:6px;margin-top:2px}',
 '.rs-map-report-meta span{padding:6px 8px;border:1px solid #344a38;border-radius:8px;background:#101c14;color:#b7c7b6;font-size:7px}',
 '.rs-map-report-actions{display:flex;flex-wrap:wrap;gap:7px;margin-top:4px}',
 '.rs-map-report-actions button,.rs-map-report-actions a{display:inline-flex;align-items:center;justify-content:center;min-height:36px;padding:0 11px;border:1px solid #40583a;border-radius:999px;background:#1b2d1c;color:#e0ecd9;font-size:8px;font-weight:900;text-decoration:none}',
 '.rs-map-report-actions [data-rs-vote="still_there"]{border-color:#805d38;background:#382b1c;color:#ffe0a5}',
 '.rs-map-report-actions [data-rs-vote="resolved"]{border-color:#405b47;background:#1a3324;color:#bff0c7}',
 '.rs-map-report-actions .rs-map-report-close{border-color:#624040;background:#2b1a1a;color:#e5aaaa}',
 '@media(max-width:560px){.rs-map-filter{min-height:32px;padding:0 9px;font-size:7px}.rs-map-marker{width:33px;height:33px}.rs-map-marker span{font-size:15px}}'
 ].join('\n');
 document.head.appendChild(style);
}
function ensureFilterBar(){
 const panel=document.getElementById('road-safety-panel');
 const summary=panel?.querySelector('.road-safety-summary');
 if(!panel||!summary)return;
 let bar=document.getElementById('rs-map-filters');
 if(!bar){
  bar=document.createElement('div');bar.id='rs-map-filters';bar.className='rs-map-filters';
  bar.setAttribute('role','group');bar.setAttribute('aria-label','Filtra le segnalazioni per categoria');
  summary.insertAdjacentElement('afterend',bar);
  const note=document.createElement('small');note.className='rs-map-filter-note';note.textContent='I filtri aggiornano contemporaneamente i marker sulla mappa e la lista delle segnalazioni.';
  bar.insertAdjacentElement('afterend',note);
  renderFilterBar();
 }
}
function renderFilterBar(){
 const bar=document.getElementById('rs-map-filters');if(!bar)return;
 const counts=new Map();allReports.forEach(report=>counts.set(report.category,(counts.get(report.category)||0)+1));
 const items=[{key:'all',label:'Tutte',color:'#b8f52e'},...categories];
 bar.innerHTML=items.map(item=>{
  const count=item.key==='all'?allReports.length:(counts.get(item.key)||0);
  const active=selectedCategory===item.key;
  return '<button type="button" class="rs-map-filter'+(active?' active':'')+'" data-rs-filter="'+esc(item.key)+'" aria-pressed="'+(active?'true':'false')+'" style="--rs-filter-color:'+esc(item.color)+'"><i class="rs-map-filter-dot"></i><span>'+esc(item.label)+'</span><b class="rs-map-filter-count">'+count+'</b></button>';
 }).join('');
}
function ensureOverlay(){
 const wrap=document.querySelector('.community-map-wrap');
 if(!wrap){
  if(mapOverlay){mapOverlay.remove();mapOverlay=null}
  markerNodes.clear();mapElement=null;
  resizeObserver?.disconnect();resizeObserver=null;
  detachMap();return null;
 }
 if(!mapOverlay||!mapOverlay.isConnected||mapOverlay.parentElement!==wrap){
  mapOverlay=wrap.querySelector('#rs-map-marker-layer');
  if(!mapOverlay){markerNodes.clear();mapOverlay=document.createElement('div');mapOverlay.id='rs-map-marker-layer';mapOverlay.className='rs-map-marker-layer';mapOverlay.setAttribute('aria-label','Segnalazioni stradali sulla mappa');wrap.appendChild(mapOverlay)}
 }
 mapElement=wrap.querySelector('#main-map');
 return wrap;
}
function detachMap(){
 if(!boundMap)return;
 const raw=boundMap.map;
 if(raw?.off){try{raw.off('move',updateMarkerPositions);raw.off('resize',updateMarkerPositions);raw.off('idle',updateMarkerPositions)}catch(error){}}
 resizeObserver?.disconnect();resizeObserver=null;
 boundMap=null;boundMapElement=null;
}
function bindMap(candidate){
 if(!candidate)return;
 if(candidate===boundMap&&boundMapElement===mapElement)return;
 detachMap();boundMap=candidate;boundMapElement=mapElement;
 const raw=candidate.map;
 if(raw?.on){
  raw.on('move',updateMarkerPositions);raw.on('resize',updateMarkerPositions);raw.on('idle',updateMarkerPositions);
 }else if(typeof candidate.renderTiles==='function'&&!candidate.__rsMapRenderWrapped){
  const original=candidate.renderTiles.bind(candidate);
  candidate.renderTiles=function(){const result=original();requestAnimationFrame(updateMarkerPositions);return result};
  candidate.__rsMapRenderWrapped=true;
 }
 if(typeof ResizeObserver!=='undefined'&&mapElement){
  resizeObserver=new ResizeObserver(()=>requestAnimationFrame(updateMarkerPositions));resizeObserver.observe(mapElement);
 }
 requestAnimationFrame(updateMarkerPositions);
}
function scheduleMapBinding(){
 if(waitTimer)return;
 let tries=0;
 waitTimer=setInterval(()=>{
  const wrap=ensureOverlay();
  if(!wrap){clearInterval(waitTimer);waitTimer=null;return}
  const candidate=window.rideMap;
  if(candidate){bindMap(candidate);clearInterval(waitTimer);waitTimer=null;return}
  if(++tries>=100){clearInterval(waitTimer);waitTimer=null}
 },200);
}
function ensureMap(){
 const wrap=ensureOverlay();if(!wrap)return;
 const candidate=window.rideMap;
 if(candidate)bindMap(candidate);
 else if(boundMap&&boundMapElement!==mapElement)detachMap();
 if(!boundMap)scheduleMapBinding();
 setMarkers(visibleReports);updateMarkerPositions();
}
function makeMarker(report){
 const item=category(report.category);
 const button=document.createElement('button');button.type='button';button.className='rs-map-marker';
 button.dataset.rsMapReport=String(report.id);button.style.setProperty('--rs-marker-color',item.color);
 button.setAttribute('aria-label',item.label+': '+String(report.title||'Segnalazione'));
 button.title=item.label+' - '+String(report.title||'Segnalazione');
 const icon=document.createElement('span');icon.textContent=item.icon;button.appendChild(icon);
 return button;
}
function setMarkers(reports){
 if(!mapOverlay?.isConnected)return;
 const valid=(reports||[]).filter(report=>Number.isFinite(Number(report.latitude))&&Number.isFinite(Number(report.longitude))&&Math.abs(Number(report.latitude))<=90&&Math.abs(Number(report.longitude))<=180);
 const keep=new Set();
 valid.forEach(report=>{
  const id=String(report.id);keep.add(id);
  let button=markerNodes.get(id);
  if(!button){button=makeMarker(report);markerNodes.set(id,button);mapOverlay.appendChild(button)}
  const item=category(report.category);
  button.style.setProperty('--rs-marker-color',item.color);
  button.setAttribute('aria-label',item.label+': '+String(report.title||'Segnalazione'));
  button.title=item.label+' - '+String(report.title||'Segnalazione');
  const icon=button.firstElementChild;if(icon)icon.textContent=item.icon;
 });
 markerNodes.forEach((node,id)=>{if(!keep.has(id)){node.remove();markerNodes.delete(id)}});
 requestAnimationFrame(updateMarkerPositions);
}
function updateMarkerPositions(){
 if(!mapOverlay?.isConnected||!mapElement||!boundMap)return;
 const wrap=mapOverlay.parentElement;if(!wrap)return;
 const wrapRect=wrap.getBoundingClientRect(),mapRect=mapElement.getBoundingClientRect(),raw=boundMap.map;
 markerNodes.forEach((button,id)=>{
  const report=visibleReports.find(item=>String(item.id)===id);
  if(!report){button.hidden=true;return}
  let point=null;
  try{
   if(raw?.project)point=raw.project([Number(report.longitude),Number(report.latitude)]);
   else if(typeof boundMap.toScreen==='function')point=boundMap.toScreen(Number(report.latitude),Number(report.longitude));
  }catch(error){point=null}
  if(!point||!Number.isFinite(Number(point.x))||!Number.isFinite(Number(point.y))){button.hidden=true;return}
  const x=Number(point.x)+mapRect.left-wrapRect.left,y=Number(point.y)+mapRect.top-wrapRect.top;
  const visible=x>=-28&&y>=-28&&x<=wrap.clientWidth+28&&y<=wrap.clientHeight+28;
  button.hidden=!visible;
  if(visible){button.style.left=x+'px';button.style.top=y+'px'}
 });
}
function receiveUpdates(event){
 const detail=event.detail||{};
 allReports=Array.isArray(detail.allReports)?detail.allReports:[];
 visibleReports=Array.isArray(detail.reports)?detail.reports:[];
 selectedCategory=detail.filter||selectedCategory||'all';
 if(Array.isArray(api()?.categories))categories=api().categories;
 renderFilterBar();ensureMap();
}
function onClick(event){
 const target=event.target instanceof Element?event.target:null;if(!target)return;
 const filter=target.closest('[data-rs-filter]');
 if(filter){event.preventDefault();api()?.setCategoryFilter?.(filter.dataset.rsFilter||'all');return}
 const marker=target.closest('[data-rs-map-report]');
 if(marker){event.preventDefault();event.stopPropagation();api()?.openMapReport?.(marker.dataset.rsMapReport);return}
}
function start(){
 injectStyles();
 if(Array.isArray(api()?.categories))categories=api().categories;
 document.addEventListener('click',onClick);
 window.addEventListener('ride-road-reports-updated',receiveUpdates);
 if(typeof MutationObserver!=='undefined'&&document.body){
  domObserver=new MutationObserver(()=>{ensureFilterBar();ensureMap()});
  domObserver.observe(document.body,{childList:true,subtree:true});
 }
 ensureFilterBar();ensureMap();
 const current=api();
 if(current?.getAllReports)receiveUpdates({detail:{allReports:current.getAllReports(),reports:current.getReports?.()||current.getAllReports(),filter:current.getCategoryFilter?.()||'all'}});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();