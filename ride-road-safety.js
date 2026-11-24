/* RIDE V36 - Community road safety reports */
(async function(){
'use strict';
const SUPABASE_URL='https://arwxzdqsqyblgxcdpgra.supabase.co';
const SUPABASE_KEY='sb_publishable_KGl_xhziVjd2KzMMYnQBGQ_lbrGp_gA';
const CATEGORIES=[
 ['hazard','Pericolo sulla strada','⚠️'],
 ['accident','Incidente','🚨'],
 ['roadworks','Lavori in corso','🚧'],
 ['closed','Strada chiusa','⛔'],
 ['gravel','Ghiaia / detriti','🪨'],
 ['damaged_road','Asfalto danneggiato','🕳️'],
 ['weather','Meteo difficile','🌧️'],
 ['traffic','Traffico / rallentamenti','🚦'],
 ['other','Altro','📍']
];
let client=null,sessionUser=null,rows=[],channel=null,loading=false,lastLocation=null,initPromise=null;
const $=(s,r=document)=>r.querySelector(s);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const label=key=>CATEGORIES.find(c=>c[0]===key)?.[1]||'Segnalazione';
const icon=key=>CATEGORIES.find(c=>c[0]===key)?.[2]||'📍';
const dateText=v=>{const d=new Date(v);return Number.isNaN(d.getTime())?'Ora':d.toLocaleString('it-IT',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})};
function status(message){const el=$('#road-safety-status');if(el)el.textContent=message}
function getPanel(){return $('#road-safety-panel')}

const CATEGORY_COLORS={
 hazard:'#ef4444',accident:'#e11d48',roadworks:'#f59e0b',closed:'#64748b',
 gravel:'#b7794c',damaged_road:'#eab308',weather:'#38bdf8',traffic:'#a78bfa',other:'#94a3b8'
};
let selectedCategory='all';
function activeRows(){
 return rows.filter(r=>r.status==='active'&&new Date(r.expires_at)>new Date()).sort((a,b)=>new Date(b.created_at)-new Date(a.created_at));
}
function visibleRows(source=activeRows()){
 return selectedCategory==='all'?source:source.filter(r=>r.category===selectedCategory);
}
function categoryObjects(){
 return CATEGORIES.map(c=>({key:c[0],label:c[1],icon:c[2],color:CATEGORY_COLORS[c[0]]||'#94a3b8'}));
}
function injectFilterStyles(){
 if(document.getElementById('ride-road-safety-filter-style'))return;
 const style=document.createElement('style');style.id='ride-road-safety-filter-style';
 style.textContent='.rs-map-filterbar{display:flex;gap:7px;overflow-x:auto;scrollbar-width:none;padding:11px 0;margin:0 0 4px}.rs-map-filterbar::-webkit-scrollbar{display:none}.rs-map-filter{flex:none;display:inline-flex;align-items:center;gap:7px;min-height:35px;padding:0 11px;border:1px solid #34483a;border-radius:999px;background:#111d15;color:#b8c7b7;font-size:8px;font-weight:900;white-space:nowrap}.rs-map-filter.active{border-color:var(--rs-filter-color,#b8f52e);background:#213323;color:#f1f6ed;box-shadow:inset 0 0 0 1px var(--rs-filter-color,#b8f52e)}.rs-map-filter-dot{width:9px;height:9px;border-radius:50%;background:var(--rs-filter-color,#b8f52e);flex:none}.rs-map-filter-count{padding:3px 5px;border-radius:999px;background:#ffffff12;color:#dce8d8;font-size:7px;min-width:17px;text-align:center}.rs-map-report-modal{display:grid;gap:9px}.rs-map-report-kind{display:inline-flex;align-items:center;gap:7px;color:#b8f52e;font-size:8px;font-weight:950;letter-spacing:1px}.rs-map-report-dot{width:9px;height:9px;border-radius:50%;background:var(--rs-report-color);box-shadow:0 0 0 3px #ffffff18}.rs-map-report-modal h3{margin:0;color:#eef5ea;font-size:17px;line-height:1.2}.rs-map-report-modal p{margin:0;color:#a7b6a8;font-size:9px;line-height:1.55;white-space:pre-wrap;overflow-wrap:anywhere}.rs-map-report-meta{display:flex;flex-wrap:wrap;gap:6px;margin-top:2px}.rs-map-report-meta span{padding:6px 8px;border:1px solid #344a38;border-radius:8px;background:#101c14;color:#b7c7b6;font-size:7px}.rs-map-report-actions{display:flex;flex-wrap:wrap;gap:7px;margin-top:4px}.rs-map-report-actions button,.rs-map-report-actions a{display:inline-flex;align-items:center;justify-content:center;min-height:36px;padding:0 11px;border:1px solid #40583a;border-radius:999px;background:#1b2d1c;color:#e0ecd9;font-size:8px;font-weight:900;text-decoration:none}.rs-map-report-actions [data-rs-vote=\"still_there\"]{border-color:#805d38;background:#382b1c;color:#ffe0a5}.rs-map-report-actions [data-rs-vote=\"resolved\"]{border-color:#405b47;background:#1a3324;color:#bff0c7}';
 document.head.appendChild(style);
}
function ensureFilterBar(){
 const panel=getPanel(),summary=panel?.querySelector('.road-safety-summary');
 if(!panel||!summary)return;
 let bar=$('#rs-map-filterbar');
 if(!bar){
  bar=document.createElement('div');bar.id='rs-map-filterbar';bar.className='rs-map-filterbar';
  bar.setAttribute('role','group');bar.setAttribute('aria-label','Filtra le segnalazioni per categoria');
  summary.insertAdjacentElement('afterend',bar);
 }
 const counts=new Map();activeRows().forEach(r=>counts.set(r.category,(counts.get(r.category)||0)+1));
 const items=[{key:'all',label:'Tutte',color:'#b8f52e'},...CATEGORIES.map(c=>({key:c[0],label:c[1],color:CATEGORY_COLORS[c[0]]||'#94a3b8'}))];
 bar.innerHTML=items.map(item=>{
  const count=item.key==='all'?activeRows().length:(counts.get(item.key)||0),active=selectedCategory===item.key;
  return '<button type="button" class="rs-map-filter'+(active?' active':'')+'" data-rs-filter="'+esc(item.key)+'" aria-pressed="'+(active?'true':'false')+'" style="--rs-filter-color:'+item.color+'"><i class="rs-map-filter-dot"></i><span>'+esc(item.label)+'</span><b class="rs-map-filter-count">'+count+'</b></button>';
 }).join('');
}
function notifyMap(){
 const reports=visibleRows(activeRows());
 if(window.rideMap?.setRoadSafetyReports)window.rideMap.setRoadSafetyReports(reports);
 window.dispatchEvent(new CustomEvent('ride-road-reports-updated',{detail:{allReports:activeRows(),reports,filter:selectedCategory}}));
}
function render(){
 const list=$('#road-safety-list'),active=activeRows(),visible=visibleRows(active);
 const count=$('#road-safety-count');if(count)count.textContent=String(active.length);
 injectFilterStyles();ensureFilterBar();
 if(list){
  list.innerHTML=visible.length?visible.map(r=>{
   const mine=sessionUser&&r.author_id===sessionUser.id;
   return '<article class="rs-report-card"><div class="rs-report-top"><span class="rs-report-icon">'+icon(r.category)+'</span><span class="rs-report-kind">'+esc(label(r.category))+'</span><span class="rs-report-time">'+esc(dateText(r.created_at))+'</span></div><strong>'+esc(r.title)+'</strong>'+(r.road_name?'<small class="rs-road-name">📍 '+esc(r.road_name)+'</small>':'')+(r.description?'<p>'+esc(r.description)+'</p>':'')+'<div class="rs-report-foot"><span>✓ '+Number(r.confirmations||0)+' conferme</span><span>Scade '+esc(dateText(r.expires_at))+'</span></div><div class="rs-report-actions"><button type="button" data-rs-vote="still_there" data-rs-id="'+esc(r.id)+'">⚠️ Ancora presente</button><button type="button" data-rs-vote="resolved" data-rs-id="'+esc(r.id)+'">✓ Risolto</button>'+(mine?'<button type="button" data-rs-resolve="'+esc(r.id)+'">Chiudi mia segnalazione</button>':'')+'<a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(r.latitude+','+r.longitude)+'">Apri posizione ↗</a></div></article>';
  }).join(''):'<div class="rs-empty">'+(active.length?'Nessuna segnalazione in questa categoria. Prova un altro filtro.':'Nessuna segnalazione attiva in questo momento. Se noti un pericolo, aiutaci ad avvisare gli altri motociclisti.')+'</div>';
 }
 document.querySelectorAll('[data-rs-filter]').forEach(button=>{
  const activeFilter=button.dataset.rsFilter===selectedCategory;
  button.classList.toggle('active',activeFilter);button.setAttribute('aria-pressed',activeFilter?'true':'false');
 });
 notifyMap();
}
function setCategoryFilter(key){
 selectedCategory=key==='all'||CATEGORIES.some(c=>c[0]===key)?key:'all';
 render();
}
function openMapReport(id){
 const report=activeRows().find(r=>String(r.id)===String(id));if(!report)return;
 const item=CATEGORIES.find(c=>c[0]===report.category)||CATEGORIES[CATEGORIES.length-1];
 const color=CATEGORY_COLORS[report.category]||'#94a3b8',mine=sessionUser&&report.author_id===sessionUser.id;
 const maps='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(report.latitude+','+report.longitude);
 const html="<div class='rs-map-report-modal' style='--rs-report-color:"+color+"'><span class='rs-map-report-kind'><i class='rs-map-report-dot'></i>"+esc(item[1])+"</span><h3>"+esc(report.title)+"</h3>"+(report.road_name?"<p>📍 "+esc(report.road_name)+"</p>":"")+(report.description?"<p>"+esc(report.description)+"</p>":"")+"<div class='rs-map-report-meta'><span>Segnalata "+esc(dateText(report.created_at))+"</span><span>✓ "+Number(report.confirmations||0)+" conferme</span><span>Scade "+esc(dateText(report.expires_at))+"</span></div><div class='rs-map-report-actions'><button type='button' data-rs-vote='still_there' data-rs-id='"+esc(report.id)+"'>⚠️ Ancora presente</button><button type='button' data-rs-vote='resolved' data-rs-id='"+esc(report.id)+"'>✓ Risolto</button><a target='_blank' rel='noopener' href='"+maps+"'>Apri posizione ↗</a>"+(mine?"<button type='button' data-rs-resolve='"+esc(report.id)+"'>Chiudi segnalazione</button>":"")+"</div><div class='modal-actions'><button type='button' class='secondary-btn' data-action='close-modal'>Chiudi</button></div></div>";
 if(typeof showModal==='function')showModal('Segnalazione stradale',html);
}
function onViewRendered(){
 if(getPanel())render();
 else notifyMap();
 if(window.rideMap?.setRoadSafetyReports)window.rideMap.setRoadSafetyReports(visibleRows(activeRows()));
}
function onMapReady(map){if(map?.setRoadSafetyReports)map.setRoadSafetyReports(visibleRows(activeRows()))}
async function load(){
 if(!client)return;
 loading=true;status('Aggiorno le segnalazioni della community…');
 const {data,error}=await client.from('road_reports').select('id,author_id,category,title,description,latitude,longitude,road_name,status,confirmations,created_at,expires_at').eq('status','active').gt('expires_at',new Date().toISOString()).order('created_at',{ascending:false}).limit(100);
 loading=false;
 if(error){status('Non riesco a caricare le segnalazioni. Riprova tra poco.');return}
 rows=data||[];render();status('Segnalazioni condivise in tempo reale · '+rows.length+' attive');
}
async function ensureSession(){
 const {data:{session}}=await client.auth.getSession();
 if(session?.user){sessionUser=session.user;return session.user}
 const {data,error}=await client.auth.signInAnonymously();
 if(error)throw new Error('Accesso anonimo non ancora attivo nel progetto Supabase. Abilitalo in Authentication → Sign In / Providers → Anonymous Sign-Ins.');
 sessionUser=data.user;return data.user;
}
function getCoords(){
 return new Promise((resolve,reject)=>{
  if(!navigator.geolocation)return reject(new Error('La geolocalizzazione non è supportata da questo dispositivo.'));
  navigator.geolocation.getCurrentPosition(p=>resolve({lat:p.coords.latitude,lon:p.coords.longitude}),()=>reject(new Error('Non riesco a ottenere la posizione. Puoi riprovare o controllare i permessi GPS.')),{enableHighAccuracy:true,timeout:12000,maximumAge:30000});
 });
}
async function createReport(){
 try{
  await init();
  await ensureSession();
  const coords=await getCoords();lastLocation=coords;
  const options=CATEGORIES.map(c=>'<option value="'+c[0]+'">'+c[2]+' '+esc(c[1])+'</option>').join('');
  if(typeof showModal!=='function')throw new Error('Finestra di inserimento non disponibile.');
  showModal('Segnala un pericolo',"<div class='rs-form-intro'>La posizione GPS verrà allegata alla segnalazione. Non inserire dati personali.</div><form id='road-safety-form'><label>Tipo di segnalazione<select name='category' required>"+options+"</select></label><label>Titolo<input name='title' maxlength='90' minlength='3' placeholder='Es. Ghiaia in curva' required></label><label>Strada / località<input name='road_name' maxlength='120' placeholder='Es. SS45bis, dopo Limone'></label><label>Dettagli<textarea name='description' maxlength='500' rows='3' placeholder='Descrivi brevemente il pericolo'></textarea></label><div class='rs-gps-ok'>◎ GPS acquisito · "+coords.lat.toFixed(5)+", "+coords.lon.toFixed(5)+"</div><div class='modal-actions'><button type='button' class='secondary-btn' data-action='close-modal'>Annulla</button><button class='primary-btn' type='submit'>Pubblica segnalazione</button></div><small class='rs-form-note'>Le segnalazioni scadono automaticamente dopo 24 ore. Massimo 3 segnalazioni per sessione ogni ora.</small></form>");
 }catch(e){status(e.message);if(typeof toast==='function')toast(e.message)}
}
async function submitReport(form){
 await init();
 const data=new FormData(form),category=String(data.get('category')||''),title=String(data.get('title')||'').trim(),road=String(data.get('road_name')||'').trim(),description=String(data.get('description')||'').trim();
 if(!CATEGORIES.some(c=>c[0]===category)||title.length<3){toast('Controlla i campi obbligatori.');return}
 const coords=lastLocation||await getCoords();
 const user=await ensureSession();
 const {error}=await client.from('road_reports').insert({author_id:user.id,category,title,road_name:road,description,latitude:coords.lat,longitude:coords.lon});
 if(error)throw error;
 if(typeof closeModal==='function')closeModal();
 toast('Segnalazione pubblicata. Grazie per aver aiutato la community!');
 await load();
}
async function vote(id,vote){
 await init();
 await ensureSession();
 const {data,error}=await client.rpc('confirm_road_report',{p_report_id:id,p_vote:vote});
 if(error)throw error;
 toast(vote==='still_there'?'Grazie, pericolo confermato.':'Grazie, hai segnalato che il pericolo è risolto.');
 await load();
}
async function resolve(id){
 await init();
 await ensureSession();
 const {data,error}=await client.rpc('resolve_road_report',{p_report_id:id});
 if(error)throw error;
 if(!data){toast('Puoi chiudere soltanto le tue segnalazioni.');return}
 toast('Segnalazione chiusa.');await load();
}
async function init(){
 if(initPromise)return initPromise;
 initPromise=(async()=>{
  const {createClient}=await import('https://esm.sh/@supabase/supabase-js@2.57.0');
  client=createClient(SUPABASE_URL,SUPABASE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:false}});
  // Initialize the shared client even when RIDE starts on Home.
  // The Community map is rendered later by the single-page app.
  await load();
  channel=client.channel('ride-road-reports-live').on('postgres_changes',{event:'*',schema:'public',table:'road_reports'},()=>load()).subscribe();
  if(getPanel())render();
  injectFilterStyles();
  if(window.rideMap?.setRoadSafetyReports)window.rideMap.setRoadSafetyReports(visibleRows(activeRows()));
 })().catch(error=>{
  initPromise=null;
  status('Servizio segnalazioni non disponibile: '+(error?.message||'controlla la connessione e riprova.'));
  console.error('RIDE safety init',error);
  throw error;
 });
 return initPromise;
}
document.addEventListener('click',async e=>{
 const target=e.target instanceof Element?e.target:null;if(!target)return;
 const create=target.closest('[data-rs-create]');if(create){e.preventDefault();createReport();return}
 const filter=target.closest('[data-rs-filter]');if(filter){e.preventDefault();setCategoryFilter(filter.dataset.rsFilter);return}
 const vote=target.closest('[data-rs-vote]');if(vote){vote.disabled=true;try{await window.RIDE_ROAD_SAFETY.vote(vote.dataset.rsId,vote.dataset.rsVote)}catch(err){toast(err.message||'Conferma non riuscita.')}finally{vote.disabled=false}return}
 const close=target.closest('[data-rs-resolve]');if(close){close.disabled=true;try{await resolve(close.dataset.rsResolve)}catch(err){toast(err.message||'Chiusura non riuscita.')}finally{close.disabled=false}}
});
document.addEventListener('submit',async e=>{
 if(!(e.target instanceof HTMLFormElement)||e.target.id!=='road-safety-form')return;
 e.preventDefault();const button=e.target.querySelector('[type=submit]');button.disabled=true;button.textContent='Pubblicazione…';
 try{await submitReport(e.target)}catch(err){toast(err.message||'Segnalazione non pubblicata.')}finally{button.disabled=false;button.textContent='Pubblica segnalazione'}
});
window.RIDE_ROAD_SAFETY={load,vote,createReport,categories:categoryObjects(),getAllReports:activeRows,getReports:()=>visibleRows(activeRows()),getCategoryFilter:()=>selectedCategory,setCategoryFilter,openMapReport,onViewRendered,onMapReady};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();