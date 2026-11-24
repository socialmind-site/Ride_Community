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
let client=null,sessionUser=null,rows=[],channel=null,loading=false,lastLocation=null,initPromise=null,panelObserver=null;
const $=(s,r=document)=>r.querySelector(s);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const label=key=>CATEGORIES.find(c=>c[0]===key)?.[1]||'Segnalazione';
const icon=key=>CATEGORIES.find(c=>c[0]===key)?.[2]||'📍';
const dateText=v=>{const d=new Date(v);return Number.isNaN(d.getTime())?'Ora':d.toLocaleString('it-IT',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})};
function status(message){const el=$('#road-safety-status');if(el)el.textContent=message}
function getPanel(){return $('#road-safety-panel')}
function render(){
 const list=$('#road-safety-list');if(!list)return;
 const active=rows.filter(r=>r.status==='active'&&new Date(r.expires_at)>new Date()).sort((a,b)=>new Date(b.created_at)-new Date(a.created_at));
 $('#road-safety-count')?.replaceChildren(document.createTextNode(String(active.length)));
 list.innerHTML=active.length?active.map(r=>{
  const mine=sessionUser&&r.author_id===sessionUser.id;
  return '<article class="rs-report-card"><div class="rs-report-top"><span class="rs-report-icon">'+icon(r.category)+'</span><span class="rs-report-kind">'+esc(label(r.category))+'</span><span class="rs-report-time">'+esc(dateText(r.created_at))+'</span></div><strong>'+esc(r.title)+'</strong>'+(r.road_name?'<small class="rs-road-name">📍 '+esc(r.road_name)+'</small>':'')+(r.description?'<p>'+esc(r.description)+'</p>':'')+'<div class="rs-report-foot"><span>✓ '+Number(r.confirmations||0)+' conferme</span><span>Scade '+esc(dateText(r.expires_at))+'</span></div><div class="rs-report-actions"><button type="button" data-rs-vote="still_there" data-rs-id="'+esc(r.id)+'">⚠️ Ancora presente</button><button type="button" data-rs-vote="resolved" data-rs-id="'+esc(r.id)+'">✓ Risolto</button>'+(mine?'<button type="button" data-rs-resolve="'+esc(r.id)+'">Chiudi mia segnalazione</button>':'')+'<a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(r.latitude+','+r.longitude)+'">Apri posizione ↗</a></div></article>';
 }).join(''):'<div class="rs-empty">Nessuna segnalazione attiva in questo momento. Se noti un pericolo, aiutaci ad avvisare gli altri motociclisti.</div>';
}
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
  const panel=getPanel();
  if(panel){panel.dataset.rsInitialized='1';await load()}
  if(!panelObserver&&typeof MutationObserver!=='undefined'&&document.body){
   panelObserver=new MutationObserver(()=>{
    const currentPanel=getPanel();
    if(currentPanel&&!currentPanel.dataset.rsInitialized){
     currentPanel.dataset.rsInitialized='1';
     load();
    }
   });
   panelObserver.observe(document.body,{childList:true,subtree:true});
  }
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
 const vote=target.closest('[data-rs-vote]');if(vote){vote.disabled=true;try{await window.RIDE_ROAD_SAFETY.vote(vote.dataset.rsId,vote.dataset.rsVote)}catch(err){toast(err.message||'Conferma non riuscita.')}finally{vote.disabled=false}return}
 const close=target.closest('[data-rs-resolve]');if(close){close.disabled=true;try{await resolve(close.dataset.rsResolve)}catch(err){toast(err.message||'Chiusura non riuscita.')}finally{close.disabled=false}}
});
document.addEventListener('submit',async e=>{
 if(!(e.target instanceof HTMLFormElement)||e.target.id!=='road-safety-form')return;
 e.preventDefault();const button=e.target.querySelector('[type=submit]');button.disabled=true;button.textContent='Pubblicazione…';
 try{await submitReport(e.target)}catch(err){toast(err.message||'Segnalazione non pubblicata.')}finally{button.disabled=false;button.textContent='Pubblica segnalazione'}
});
window.RIDE_ROAD_SAFETY={load,vote,createReport};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();