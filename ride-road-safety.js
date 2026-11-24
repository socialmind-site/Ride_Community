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
let client=null,sessionUser=null,rows=[],channel=null,loading=false,lastLocation=null,initPromise=null,selectedCategory='all';
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
function activeReports(){
 return rows.filter(r=>r.status==='active'&&new Date(r.expires_at)>new Date()).sort((a,b)=>new Date(b.created_at)-new Date(a.created_at));
}
function filteredReports(){
 const all=activeReports();
 return selectedCategory==='all'?all:all.filter(r=>r.category===selectedCategory);
}
function reportConfidence(report){
 const yes=Math.max(0,Number(report.confirmations)||0);
 const resolved=Math.max(0,Number(report.resolved_confirmations)||0);
 const last=report.last_confirmed_at?new Date(report.last_confirmed_at):null;
 const age=last&&!Number.isNaN(last.getTime())?(Date.now()-last.getTime())/3600000:Infinity;
 if(resolved>yes&&resolved>0)return{key:'disputed',label:'Da verificare',detail:resolved+' indicano risolto',level:0};
 if(yes>=5&&age<=2)return{key:'high',label:'Molto confermata',detail:yes+' conferme recenti',level:3};
 if(yes>=2&&age<=6)return{key:'medium',label:'Confermata',detail:yes+' conferme',level:2};
 if(yes>=1)return{key:'low',label:'Conferma community',detail:yes+' conferma'+(yes===1?'':'e'),level:1};
 return{key:'new',label:'Nuova',detail:'In attesa di conferme',level:0};
}
function renderMapFilters(){
 const bar=$('#road-report-filters');if(!bar)return;
 const all=activeReports(),counts=new Map();
 all.forEach(report=>counts.set(report.category,(counts.get(report.category)||0)+1));
 const items=[{key:'all',label:'Tutte',icon:'◉',color:'#b8f52e'},...CATEGORIES.map(c=>({key:c[0],label:c[1].replace(' sulla strada','').replace(' / rallentamenti',''),icon:c[2],color:CATEGORY_COLORS[c[0]]||'#94a3b8'}))];
 bar.innerHTML=items.map(item=>{
  const count=item.key==='all'?all.length:(counts.get(item.key)||0),active=selectedCategory===item.key;
  return '<button type="button" class="road-report-filter'+(active?' active':'')+'" data-rs-filter="'+esc(item.key)+'" aria-pressed="'+(active?'true':'false')+'" style="--rs-filter-color:'+item.color+'"><span class="road-report-filter-icon">'+item.icon+'</span><span class="road-report-filter-label">'+esc(item.label)+'</span><b>'+count+'</b></button>';
 }).join('');
 const total=$('#road-report-filter-total');if(total)total.textContent=String(filteredReports().length)+' / '+all.length+' attive';
}
function setCategoryFilter(key){
 selectedCategory=key==='all'||CATEGORIES.some(c=>c[0]===key)?key:'all';
 render();
}
function notifyMap(){
 const reports=filteredReports();
 if(window.rideMap&&typeof window.rideMap.setRoadSafetyReports==='function'){
  try{window.rideMap.setRoadSafetyReports(reports)}catch(error){console.warn('RIDE road report markers',error)}
 }
 window.dispatchEvent(new CustomEvent('ride-road-reports-updated',{detail:{reports:reports}}));
}
function render(){
 const active=activeReports(),visible=filteredReports(),list=$('#road-safety-list');
 const count=$('#road-safety-count');
 if(count)count.textContent=String(active.length);
 renderMapFilters();
 if(list){
  list.innerHTML=visible.length?visible.map(r=>{
   const mine=sessionUser&&r.author_id===sessionUser.id;const confidence=reportConfidence(r);
   return '<article class="rs-report-card"><div class="rs-report-top"><span class="rs-report-icon">'+icon(r.category)+'</span><span class="rs-report-kind">'+esc(label(r.category))+'</span><span class="rs-confidence-badge '+confidence.key+'">'+esc(confidence.label)+'</span><span class="rs-report-time">'+esc(dateText(r.created_at))+'</span></div><strong>'+esc(r.title)+'</strong>'+(r.road_name?'<small class="rs-road-name">📍 '+esc(r.road_name)+'</small>':'')+(r.description?'<p>'+esc(r.description)+'</p>':'')+'<div class="rs-report-foot"><span>✓ '+Number(r.confirmations||0)+' conferme</span><span>Scade '+esc(dateText(r.expires_at))+'</span></div><div class="rs-report-actions"><button type="button" data-rs-vote="still_there" data-rs-id="'+esc(r.id)+'">⚠️ Ancora presente</button><button type="button" data-rs-vote="resolved" data-rs-id="'+esc(r.id)+'">✓ Risolto</button>'+(mine?'<button type="button" data-rs-resolve="'+esc(r.id)+'">Chiudi mia segnalazione</button>':'')+'<a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(r.latitude+','+r.longitude)+'">Apri posizione ↗</a></div></article>';
  }).join(''):'<div class="rs-empty">'+(active.length?'Nessuna segnalazione in questa categoria. Prova un altro filtro.':'Nessuna segnalazione attiva in questo momento. Se noti un pericolo, aiutaci ad avvisare gli altri motociclisti.')+'</div>';
 }
 notifyMap();
}

function openMapReport(id){
 const report=activeReports().find(r=>String(r.id)===String(id));if(!report)return;
 const item=CATEGORIES.find(c=>c[0]===report.category)||CATEGORIES[CATEGORIES.length-1];
 const visual=window.rideReportVisual?window.rideReportVisual(report):{color:CATEGORY_COLORS[report.category]||'#94a3b8',label:item[1],svg:''};
 const mine=sessionUser&&report.author_id===sessionUser.id;const confidence=reportConfidence(report);
 const maps='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(report.latitude+','+report.longitude);
 const actionSvg=path=>'<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+path+'</svg>';
 const confirmIcon=actionSvg('<path d="m5 12 4 4L19 6"/>');
 const resolvedIcon=actionSvg('<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>');
 const navIcon=actionSvg('<path d="M14 3h7v7M10 14 21 3"/><path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6"/>');
 const pinIcon=actionSvg('<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>');
 const description=report.description?'<p class="rs-map-report-description">'+esc(report.description)+'</p>':'';
 const location=report.road_name?'<div class="rs-map-report-location">'+pinIcon+'<span>'+esc(report.road_name)+'</span></div>':'';
 const html="<div class='rs-map-report-modal' style='--rs-report-color:"+visual.color+"'>"+
  "<div class='rs-map-report-hero'><span class='rs-map-report-icon'>"+visual.svg+"</span><div class='rs-map-report-heading'><span class='rs-map-report-kind'>"+esc(visual.label)+"</span><h3>"+esc(report.title)+"</h3><span class='rs-map-report-active'><i></i>Segnalazione attiva</span></div></div>"+
  location+description+
  "<div class='rs-map-report-confidence '+confidence.key+'><span class='rs-confidence-dot'></span><div><strong>"+esc(confidence.label)+"</strong><small>"+esc(confidence.detail)+"</small></div></div>"+
  "<div class='rs-map-report-meta'><div><span>CONFERME</span><strong>"+Number(report.confirmations||0)+"</strong></div><div><span>INDICATE RISOLTE</span><strong>"+Number(report.resolved_confirmations||0)+"</strong></div><div><span>SEGNALATA</span><strong>"+esc(dateText(report.created_at))+"</strong></div><div><span>SCADENZA</span><strong>"+esc(dateText(report.expires_at))+"</strong></div></div>"+
  "<div class='rs-map-report-section-label'>AGGIORNA LA COMMUNITY</div>"+
  "<div class='rs-map-report-actions'><button type='button' class='rs-report-action-confirm' data-rs-vote='still_there' data-rs-id='"+esc(report.id)+"'>"+confirmIcon+"<span><strong>Confermo</strong><small>È ancora presente</small></span></button><button type='button' class='rs-report-action-resolved' data-rs-vote='resolved' data-rs-id='"+esc(report.id)+"'>"+resolvedIcon+"<span><strong>Problema risolto</strong><small>Non è più presente</small></span></button><a class='rs-report-action-nav' target='_blank' rel='noopener' href='"+maps+"'>"+navIcon+"<span>Apri indicazioni</span></a>"+(mine?"<button type='button' class='rs-report-action-owner' data-rs-resolve='"+esc(report.id)+"'>"+resolvedIcon+"<span><strong>Chiudi segnalazione</strong><small>Rimuovi il tuo avviso</small></span></button>":"")+"</div>"+
  "<p class='rs-map-report-note'>Le conferme aiutano gli altri motociclisti a capire se il pericolo è ancora presente. Le segnalazioni scadono automaticamente dopo 24 ore.</p>"+
 "</div>";
 if(typeof showModal==='function')showModal('Segnalazione community',html);
}

async function load(){
 if(!client)return;
 loading=true;status('Aggiorno le segnalazioni della community…');
 const {data,error}=await client.from('road_reports').select('id,author_id,category,title,description,latitude,longitude,road_name,status,confirmations,resolved_confirmations,last_confirmed_at,created_at,expires_at').eq('status','active').gt('expires_at',new Date().toISOString()).order('created_at',{ascending:false}).limit(100);
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
 const filter=target.closest('[data-rs-filter]');if(filter){e.preventDefault();setCategoryFilter(filter.dataset.rsFilter||'all');return}
 const create=target.closest('[data-rs-create]');if(create){e.preventDefault();createReport();return}
 const vote=target.closest('[data-rs-vote]');if(vote){vote.disabled=true;try{await window.RIDE_ROAD_SAFETY.vote(vote.dataset.rsId,vote.dataset.rsVote)}catch(err){toast(err.message||'Conferma non riuscita.')}finally{vote.disabled=false}return}
 const close=target.closest('[data-rs-resolve]');if(close){close.disabled=true;try{await resolve(close.dataset.rsResolve)}catch(err){toast(err.message||'Chiusura non riuscita.')}finally{close.disabled=false}}
});
document.addEventListener('submit',async e=>{
 if(!(e.target instanceof HTMLFormElement)||e.target.id!=='road-safety-form')return;
 e.preventDefault();const button=e.target.querySelector('[type=submit]');button.disabled=true;button.textContent='Pubblicazione…';
 try{await submitReport(e.target)}catch(err){toast(err.message||'Segnalazione non pubblicata.')}finally{button.disabled=false;button.textContent='Pubblica segnalazione'}
});
window.addEventListener('ride-road-reports-updated',event=>{const map=window.rideMap;if(map&&typeof map.setRoadSafetyReports==='function')map.setRoadSafetyReports(event.detail?.reports||[])});
window.RIDE_ROAD_SAFETY={load,vote,createReport,renderPanel:render,getReports:filteredReports,getAllReports:activeReports,setCategoryFilter,getCategoryFilter:()=>selectedCategory,openMapReport,reportConfidence,categories:CATEGORIES.map(c=>({key:c[0],label:c[1],icon:c[2],color:CATEGORY_COLORS[c[0]]||'#94a3b8'}))};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();