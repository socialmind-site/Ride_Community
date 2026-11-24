/* RIDE V26 - Smart Travel Planner */
(function(){
  'use strict';

  const V26_STYLE = `
  .trip-v26-section{margin:14px 0;padding:14px;border:1px solid #3b5537;border-radius:15px;background:linear-gradient(145deg,#17291c,#101a14)}
  .trip-v26-section-head,.trip-v26-panel-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:11px}
  .trip-v26-section-head strong,.trip-v26-panel-head strong{display:block;font-size:12px;letter-spacing:-.2px}
  .trip-v26-section-head small,.trip-v26-panel-head small{display:block;margin-top:4px;color:#9eaea1;font-size:8px;line-height:1.5}
  .trip-v26-kicker{color:var(--lime);font-size:7px;font-weight:950;letter-spacing:1.3px}
  .trip-v26-estimate{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:7px;margin-top:10px;padding:10px;border:1px solid #344b37;border-radius:11px;background:#0b160f}
  .trip-v26-estimate>div{min-width:0}.trip-v26-estimate strong{display:block;color:#eff6e9;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.trip-v26-estimate small{display:block;margin-top:4px;color:#91a293;font-size:7px;line-height:1.35}
  .trip-v26-hint{display:block;margin-top:8px;color:#839486;font-size:7px;line-height:1.5}
  .trip-v26-budget{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:7px;margin:12px 0;padding:12px;border:1px solid #344a38;border-radius:14px;background:#101c14}
  .trip-v26-budget>div{min-width:0;padding:8px;border-radius:9px;background:#17271b}
  .trip-v26-budget strong{display:block;color:#eaf3e5;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .trip-v26-budget small{display:block;margin-top:4px;color:#92a394;font-size:7px}
  .trip-v26-budget .total{background:#243720;border:1px solid #49643a}
  .trip-v26-budget .total strong{color:var(--lime);font-size:13px}
  .trip-v26-day-panel{margin:0 0 11px 40px;padding:12px;border:1px solid #344a38;border-radius:14px;background:#101b14}
  .trip-v26-day-panel:last-child{margin-bottom:0}
  .trip-v26-day-metrics{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin:10px 0}
  .trip-v26-day-metrics>div{min-width:0;padding:8px;border:1px solid #2d4233;border-radius:9px;background:#0b160f}
  .trip-v26-day-metrics strong{display:block;color:#eff6e9;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .trip-v26-day-metrics small{display:block;margin-top:4px;color:#91a293;font-size:7px;line-height:1.35}
  .trip-v26-day-details{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}
  .trip-v26-detail{min-width:0;padding:9px;border:1px solid #2d4233;border-radius:10px;background:#0c1710}
  .trip-v26-detail strong{display:block;font-size:8px;color:#dce8d9}
  .trip-v26-detail p{min-height:28px;margin:5px 0 8px;color:#9eaea1;font-size:7px;line-height:1.45;overflow-wrap:anywhere}
  .trip-v26-detail button{width:100%;min-height:30px;padding:0 7px;border:1px solid #40583a;border-radius:8px;background:#1b2d1c;color:var(--lime);font-size:7px;font-weight:900}
  .trip-v26-results{display:grid;gap:6px;margin-top:8px}
  .trip-v26-result{display:grid;grid-template-columns:28px minmax(0,1fr) auto;gap:8px;align-items:center;padding:8px;border:1px solid #2d4233;border-radius:10px;background:#0b160f}
  .trip-v26-result-icon{width:27px;height:27px;display:grid;place-items:center;border-radius:8px;background:#253a25;font-size:13px}
  .trip-v26-result-copy{min-width:0}.trip-v26-result-copy strong{display:block;font-size:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.trip-v26-result-copy small{display:block;margin-top:3px;color:#91a293;font-size:7px;line-height:1.4}
  .trip-v26-result-actions{display:flex;gap:5px;align-items:center}.trip-v26-result-actions a,.trip-v26-result-actions button{display:inline-flex;align-items:center;justify-content:center;min-height:27px;padding:0 8px;border:1px solid #40583a;border-radius:8px;background:#1b2d1c;color:var(--lime);font-size:7px;font-weight:900;text-decoration:none;white-space:nowrap}.trip-v26-result-actions button{background:var(--lime);border-color:var(--lime);color:#14200e}
  .trip-v26-loading,.trip-v26-empty{padding:10px;border:1px dashed #3b503c;border-radius:10px;color:#9eaea1;font-size:8px;line-height:1.5}
  .trip-v26-disclaimer{display:block;margin-top:9px;color:#839486;font-size:7px;line-height:1.5}
  .trip-v26-card-breakdown{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
  .trip-v26-card-breakdown span{padding:5px 7px;border:1px solid #2d4233;border-radius:7px;background:#0c1710;color:#9eaea1;font-size:7px}
  .trip-v26-card-breakdown b{color:#e7f1e1;font-weight:900}
  @media(max-width:820px){.trip-v26-budget{grid-template-columns:repeat(3,minmax(0,1fr))}.trip-v26-day-panel{margin-left:0}.trip-v26-day-details{grid-template-columns:1fr}}
  @media(max-width:560px){.trip-v26-section{padding:11px}.trip-v26-estimate{grid-template-columns:repeat(2,minmax(0,1fr))}.trip-v26-budget{grid-template-columns:repeat(2,minmax(0,1fr));padding:9px}.trip-v26-budget .total{grid-column:1/-1}.trip-v26-day-metrics{grid-template-columns:repeat(2,minmax(0,1fr))}.trip-v26-day-panel{padding:9px}.trip-v26-result{grid-template-columns:25px minmax(0,1fr)}.trip-v26-result-actions{grid-column:2;justify-content:flex-start}.trip-v26-result-icon{width:24px;height:24px}}
  `;

  function addStyles(){
    if(document.getElementById('ride-v26-style'))return;
    const style=document.createElement('style');style.id='ride-v26-style';style.textContent=V26_STYLE;document.head.appendChild(style);
  }
  function n(value,fallback=0){const x=Number(value);return Number.isFinite(x)?x:fallback}
  function clamp(value,min,max){return Math.min(max,Math.max(min,n(value,min)))}
  function eur(value){return n(value).toLocaleString('it-IT',{style:'currency',currency:'EUR',maximumFractionDigits:0})}
  function decimal(value,digits=1){return n(value).toLocaleString('it-IT',{minimumFractionDigits:digits,maximumFractionDigits:digits})}
  function safeProfile(){return state.profile||{}}
  function consumptionDefaults(){
    let measured=0;
    try{measured=n(fuelMetrics()?.averageConsumption)}catch(error){}
    if(measured>.1&&measured<30)return{value:measured,source:'registro carburante'};
    const saved=n(safeProfile().bikeConsumption);
    if(saved>.1&&saved<30)return{value:saved,source:'scheda garage'};
    return{value:5.5,source:'stima iniziale'};
  }
  function tankDefaults(){
    const saved=n(safeProfile().bikeTankCapacity);
    return saved>=1&&saved<=50?saved:18;
  }
  function fuelSummary(day,route,override){
    const plan={...(day?.fuelPlan||{}),...(override||{})};
    const consumptionInfo=consumptionDefaults();
    const consumption=clamp(plan.consumption||consumptionInfo.value,.1,30);
    const tankCapacity=clamp(plan.tankCapacity||tankDefaults(),1,50);
    const startFuelPercent=clamp(plan.startFuelPercent===undefined?100:plan.startFuelPercent,0,100);
    const reservePercent=clamp(plan.reservePercent===undefined?15:plan.reservePercent,5,35);
    const fuelPricePerLiter=clamp(plan.fuelPricePerLiter||1.85,.5,5);
    const distance=n(route?.distance);
    const liters=distance*consumption/100;
    const fuelCost=liters*fuelPricePerLiter;
    const theoreticalRange=tankCapacity*(startFuelPercent/100)/consumption*100;
    const reserveRange=tankCapacity*(reservePercent/100)/consumption*100;
    const safeRange=Math.max(0,theoreticalRange-reserveRange);
    const recommendedRange=safeRange*.82;
    const stopsRequired=recommendedRange>0&&distance>recommendedRange?Math.max(0,Math.ceil(distance/recommendedRange)-1):0;
    return{distance,consumption,consumptionSource:plan.consumptionSource||consumptionInfo.source,tankCapacity,startFuelPercent,reservePercent,fuelPricePerLiter,liters,fuelCost,theoreticalRange,safeRange,recommendedRange,stopsRequired};
  }
  function budgetForDay(day,route){
    const fuel=fuelSummary(day,route);
    const existing=day?.budgetBreakdown||{};
    return{
      fuel:n(existing.fuel,fuel.fuelCost),
      meals:n(existing.meals,day?.mealCost||0),
      lodging:n(existing.lodging,day?.overnightCost||0),

      tolls:n(existing.tolls,day?.tollCost||0),
      other:n(existing.other,day?.otherCost||0)
    };
  }
  function totalBudget(trip){
    return (trip.days||[]).reduce((sum,day)=>{
      const route=routes.find(r=>r.id===day.routeId),b=budgetForDay(day,route);
      return sum+b.fuel+b.meals+b.lodging+b.tolls+b.other;
    },0);
  }
  function tripDistance(trip){return (trip.days||[]).reduce((sum,day)=>sum+n(routes.find(r=>r.id===day.routeId)?.distance),0)}
  function routeCoords(route){
    const cached=routeCache?.get(route?.id);
    const points=cached?.latlngs||route?.latlngs||[];
    if(points.length>1)return points;
    return (route?.stops||[]).map(p=>[n(p[1]),n(p[2])]).filter(p=>Number.isFinite(p[0])&&Number.isFinite(p[1]));
  }
  function pointAlong(points,progress){
    if(!points.length)return null;
    const lengths=[];let total=0;
    for(let i=1;i<points.length;i++){const d=distanceKm({lat:points[i-1][0],lon:points[i-1][1]},{lat:points[i][0],lon:points[i][1]});lengths.push(d);total+=d}
    if(total<=0)return{lat:points[0][0],lon:points[0][1]};
    let target=total*clamp(progress,0,1);
    for(let i=0;i<lengths.length;i++){
      if(target<=lengths[i]||i===lengths.length-1){
        const f=lengths[i]>0?target/lengths[i]:0;
        return{lat:points[i][0]+(points[i+1][0]-points[i][0])*f,lon:points[i][1]+(points[i+1][1]-points[i][1])*f};
      }
      target-=lengths[i];
    }
    return{lat:points[points.length-1][0],lon:points[points.length-1][1]};
  }
  function openMapSearch(query,point){
    const q=point?point.lat.toFixed(6)+','+point.lon.toFixed(6):query;
    return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(q);
  }
  function normalizePoi(item,category,point){
    return{id:String(item.id||item.type+'-'+item.id),name:item.tags?.name||item.tags?.brand||item.tags?.operator||category,category,lat:point.lat,lon:point.lon};
  }
  async function searchStops(dayId,category,button){
    const trip=(state.tripPlans||[]).find(t=>(t.days||[]).some(d=>String(d.id)===String(dayId)));
    const day=trip?.days.find(d=>String(d.id)===String(dayId));
    const route=routes.find(r=>r.id===day?.routeId);
    if(!trip||!day||!route)return;
    const box=document.querySelector('[data-v26-results="'+CSS.escape(String(dayId))+'"]');
    if(!box)return;
    button.disabled=true;box.innerHTML='<div class="trip-v26-loading">Ricerca lungo il percorso…</div>';
    try{
      const points=routeCoords(route);
      if(points.length<2)throw new Error('Traccia non disponibile: apri prima la mappa dell’itinerario e riprova.');
      const samples=[0,.25,.5,.75,1].map(p=>pointAlong(points,p)).filter(Boolean);
      const selectors=[];
      const tags=category==='fuel'?['amenity=fuel']:category==='food'?['amenity=restaurant','amenity=cafe','amenity=fast_food']:['tourism=hotel','tourism=guest_house','tourism=hostel','tourism=motel'];
      samples.forEach(p=>tags.forEach(tag=>['node','way'].forEach(type=>selectors.push(type+'(around:2500,'+p.lat+','+p.lon+')['+tag+'];'))));
      const query='[out:json][timeout:20];('+selectors.join('')+');out center tags;';
      let response=null;
      for(const endpoint of ['https://overpass-api.de/api/interpreter','https://overpass.kumi.systems/api/interpreter']){
        try{const r=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},body:'data='+encodeURIComponent(query)});if(r.ok){response=r;break}}catch(error){}
      }
      if(!response)throw new Error('Servizio OpenStreetMap temporaneamente non disponibile.');
      const data=await response.json(),seen=new Set(),items=[];
      (data.elements||[]).forEach(item=>{
        const lat=n(item.lat??item.center?.lat,NaN),lon=n(item.lon??item.center?.lon,NaN);
        if(!Number.isFinite(lat)||!Number.isFinite(lon)||seen.has(item.type+'/'+item.id))return;
        seen.add(item.type+'/'+item.id);items.push(normalizePoi(item,category,{lat,lon}));
      });
      items.sort((a,b)=>Math.min(...samples.map(p=>distanceKm(p,a)))-Math.min(...samples.map(p=>distanceKm(p,b))));
      day.stops=day.stops||{};day.stops[category]=items.slice(0,12);save();
      renderStopResults(dayId,category);
      if(!items.length)box.innerHTML='<div class="trip-v26-empty">Nessun risultato mappato nelle vicinanze. Prova più tardi o cerca manualmente sulla mappa.</div>';
    }catch(error){box.innerHTML='<div class="trip-v26-empty">'+escapeHtml(error.message||'Ricerca non disponibile.')+'</div>'}
    finally{button.disabled=false}
  }
  function escapeHtml(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
  function renderStopResults(dayId,category){
    const trip=(state.tripPlans||[]).find(t=>(t.days||[]).some(d=>String(d.id)===String(dayId)));
    const day=trip?.days.find(d=>String(d.id)===String(dayId));
    const box=document.querySelector('[data-v26-results="'+CSS.escape(String(dayId))+'"]');
    if(!day||!box)return;
    const items=day.stops?.[category]||[];
    box.innerHTML=items.length?items.map(item=>'<article class="trip-v26-result"><span class="trip-v26-result-icon">'+(category==='fuel'?'⛽':category==='food'?'🍽':'🛏')+'</span><span class="trip-v26-result-copy"><strong>'+escapeHtml(item.name)+'</strong><small>'+escapeHtml(item.category)+' · OpenStreetMap</small></span><span class="trip-v26-result-actions"><a target="_blank" rel="noopener" href="'+openMapSearch('',item)+'">Apri mappa ↗</a><button type="button" data-v26-add-stop="'+dayId+'" data-category="'+category+'" data-poi-id="'+escapeHtml(item.id)+'">Aggiungi</button></span></article>').join(''):'<div class="trip-v26-empty">Nessun luogo trovato per questa categoria.</div>';
  }
  function addStop(dayId,category,poiId){
    const trip=(state.tripPlans||[]).find(t=>(t.days||[]).some(d=>String(d.id)===String(dayId)));
    const day=trip?.days.find(d=>String(d.id)===String(dayId)),item=day?.stops?.[category]?.find(p=>String(p.id)===String(poiId));
    if(!day||!item)return;
    day.stopSelections=day.stopSelections||[];
    if(!day.stopSelections.some(p=>p.id===item.id))day.stopSelections.push(item);
    if(category==='fuel')day.fuelStopCount=n(day.fuelStopCount)+1;
    if(category==='food')day.mealPlace=item.name;
    if(category==='lodging')day.overnight=item.name;
    save();render();
    toast('Sosta aggiunta alla giornata.');
  }
  function updateFuelFields(dayId,field,value){
    const trip=(state.tripPlans||[]).find(t=>(t.days||[]).some(d=>String(d.id)===String(dayId)));
    const day=trip?.days.find(d=>String(d.id)===String(dayId));if(!day)return;
    day.fuelPlan=day.fuelPlan||{};
    day.fuelPlan[field]=n(value);
    save();
    const root=document.querySelector('[data-v26-day="'+CSS.escape(String(dayId))+'"]');
    if(root)renderFuelSummary(root,day,trip);
    refreshTripBudget(trip.id);
  }
  function renderFuelSummary(root,day,trip){
    const route=routes.find(r=>r.id===day.routeId),fuel=fuelSummary(day,route);
    const box=root.querySelector('[data-v26-fuel-summary]');
    if(box)box.innerHTML='<div><strong>'+decimal(fuel.recommendedRange,0)+' km</strong><small>Autonomia prudenziale</small></div><div><strong>'+decimal(fuel.liters,1)+' L</strong><small>Carburante stimato</small></div><div><strong>'+eur(fuel.fuelCost)+'</strong><small>Costo carburante</small></div><div><strong>'+fuel.stopsRequired+'</strong><small>Rifornimenti suggeriti</small></div>';
  }
  function refreshTripBudget(tripId){
    const trip=(state.tripPlans||[]).find(t=>String(t.id)===String(tripId));if(!trip)return;
    const total=totalBudget(trip);
    const node=document.querySelector('[data-v26-trip-total="'+CSS.escape(String(tripId))+'"]');
    if(node)node.textContent=eur(total);
    const cards=document.querySelectorAll('[data-v26-trip-card="'+CSS.escape(String(tripId))+'"]');
    cards.forEach(card=>{const totalNode=card.querySelector('[data-v26-card-total]');if(totalNode)totalNode.textContent=eur(total)});
  }
  function renderDayPlanner(trip,day){
    const route=routes.find(r=>r.id===day.routeId),fuel=fuelSummary(day,route),budget=budgetForDay(day,route);
    const stopSelections=day.stopSelections||[];
    return '<section class="trip-v26-day-panel" data-v26-day="'+escapeHtml(day.id)+'"><div class="trip-v26-panel-head"><div><span class="trip-v26-kicker">SMART TRAVEL · '+escapeHtml(formatDiaryDate(day.date))+'</span><strong>Dettagli di viaggio</strong><small>'+escapeHtml(route?.name||'Itinerario')+' · '+fuel.distance+' km</small></div><strong>'+eur(budget.fuel+budget.meals+budget.lodging+budget.tolls+budget.other)+'</strong></div>'+
      '<div class="trip-v26-day-metrics" data-v26-fuel-summary><div><strong>'+decimal(fuel.recommendedRange,0)+' km</strong><small>Autonomia prudenziale</small></div><div><strong>'+decimal(fuel.liters,1)+' L</strong><small>Carburante stimato</small></div><div><strong>'+eur(fuel.fuelCost)+'</strong><small>Costo carburante</small></div><div><strong>'+fuel.stopsRequired+'</strong><small>Rifornimenti suggeriti</small></div></div>'+
      '<div class="trip-v26-day-details"><div class="trip-v26-detail"><strong>⛽ Carburante</strong><p>'+escapeHtml(fuel.consumption+' L/100 km · serbatoio '+fuel.tankCapacity+' L · '+fuel.consumptionSource)+'</p><button type="button" data-v26-search="'+day.id+'" data-category="fuel">Cerca distributori</button></div><div class="trip-v26-detail"><strong>🍽 Pranzo e ristoro</strong><p>'+escapeHtml(day.mealPlace||'Nessun locale selezionato')+' · '+eur(budget.meals)+'</p><button type="button" data-v26-search="'+day.id+'" data-category="food">Cerca ristoranti</button></div><div class="trip-v26-detail"><strong>🛏 Pernottamento</strong><p>'+escapeHtml(day.overnight||'Da organizzare')+' · '+eur(budget.lodging)+'</p><button type="button" data-v26-search="'+day.id+'" data-category="lodging">Cerca alloggi</button></div></div>'+
      '<div class="trip-v26-results" data-v26-results="'+escapeHtml(day.id)+'">'+['fuel','food','lodging'].map(cat=>(day.stops?.[cat]||[]).length?'<div class="trip-v26-empty">'+(cat==='fuel'?'Distributori':cat==='food'?'Ristoranti':'Alloggi')+' disponibili: '+day.stops[cat].length+' · premi il pulsante di ricerca per aggiornare.</div>':'').join('')+'</div>'+
      '<small class="trip-v26-disclaimer">Stime indicative. Il numero di rifornimenti è prudenziale e non sostituisce la valutazione del pilota: verifica distanza reale, traffico, disponibilità e orari di apertura.</small></section>';
  }
  function enrichTripMarkup(trip){
    const total=totalBudget(trip),distance=tripDistance(trip);
    const summary='<section class="trip-v26-section"><div class="trip-v26-section-head"><div><span class="trip-v26-kicker">RIDE V26 · SMART TRAVEL</span><strong>Il tuo viaggio, sotto controllo.</strong><small>Autonomia, soste e budget calcolati sulle giornate che hai pianificato.</small></div><strong>'+eur(total)+'</strong></div><div class="trip-v26-estimate"><div><strong>'+Math.round(distance)+' km</strong><small>Distanza pianificata</small></div><div><strong>'+trip.days.length+'</strong><small>Giornate</small></div><div><strong>'+eur(total)+'</strong><small>Budget stimato</small></div><div><strong>'+Math.round(total/Math.max(1,distance)*100)+' €/100 km</strong><small>Costo medio</small></div></div><small class="trip-v26-hint">Completa i costi di ogni giornata per rendere il budget più preciso. I valori non inseriti restano a zero, tranne il carburante che usa una stima iniziale.</small></section>';
    const days=(trip.days||[]).map(day=>renderDayPlanner(trip,day)).join('');
    return summary+days;
  }
  function enrichTripDetail(){
    const modal=document.querySelector('#modal-root .modal');
    if(!modal||modal.dataset.v26Enhanced)return;
    const tripId=modal.querySelector('[data-action="delete-trip"]')?.dataset.tripId;
    const trip=(state.tripPlans||[]).find(t=>String(t.id)===String(tripId));
    if(!trip)return;
    const summary=modal.querySelector('.trip-detail-summary');
    if(summary)summary.insertAdjacentHTML('afterend',enrichTripMarkup(trip));
    modal.dataset.v26Enhanced='1';
  }
  function enrichTripCards(){
    document.querySelectorAll('.trip-plan-card').forEach(card=>{
      const open=card.querySelector('[data-action="open-trip"]');
      const trip=(state.tripPlans||[]).find(t=>String(t.id)===String(open?.dataset.tripId));
      if(!trip||card.dataset.v26Enhanced)return;
      const total=totalBudget(trip);
      card.dataset.v26TripCard=trip.id;
      const route=tripDistance(trip);
      card.querySelector('.trip-plan-metrics')?.insertAdjacentHTML('afterend','<div class="trip-v26-card-breakdown"><span><b>'+eur(total)+'</b> budget</span><span><b>'+Math.round(route)+' km</b> pianificati</span><span><b>'+trip.days.length+'</b> giornate</span></div>');
      card.dataset.v26Enhanced='1';
    });
  }
  function init(){
    if(typeof state==='undefined'||!state.onboarded)return;
    addStyles();
    enrichTripCards();
    enrichTripDetail();
    document.querySelectorAll('.trip-detail-summary').forEach(()=>enrichTripDetail());
  }
  function afterRender(){
    init();
    const observer=new MutationObserver(()=>{if(state.view==='trips')enrichTripCards();if(document.querySelector('#modal-root .modal'))enrichTripDetail()});
    observer.observe(document.body,{childList:true,subtree:true});
    document.addEventListener('click',event=>{
      const search=event.target.closest('[data-v26-search]');
      if(search){const dayId=search.dataset.v26Search,category=search.dataset.category;searchStops(dayId,category,search);return}
      const add=event.target.closest('[data-v26-add-stop]');
      if(add){addStop(add.dataset.v26AddStop,add.dataset.category,add.dataset.poiId);return}
    });
    document.addEventListener('change',event=>{
      const input=event.target.closest('[data-v26-fuel-field]');
      if(input)updateFuelFields(input.dataset.dayId,input.dataset.v26FuelField,input.value);
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',afterRender,{once:true});else afterRender();
  window.addEventListener('ride:rendered',init);
})();
