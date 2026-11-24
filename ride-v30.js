/* RIDE V30 - Lightweight trip map, place cards and faster POI search */
(function(){
  'use strict';

  const CSS = `
  .trip-v30-map-panel{margin:14px 0;padding:13px;border:1px solid #344a38;border-radius:15px;background:linear-gradient(145deg,#17251b,#101a14)}
  .trip-v30-map-head{display:flex;justify-content:space-between;align-items:flex-start;gap:10px}
  .trip-v30-map-head strong{display:block;color:#edf5e9;font-size:12px}
  .trip-v30-map-head small{display:block;margin-top:4px;color:#91a293;font-size:8px;line-height:1.5}
  .trip-v30-kicker{display:block;margin-bottom:4px;color:var(--lime);font-size:7px;font-weight:950;letter-spacing:1.2px}
  .trip-v30-open-map{width:100%;min-height:40px;margin-top:11px;border:1px solid #526c42;border-radius:10px;background:#24391f;color:var(--lime);font-size:9px;font-weight:950}
  .trip-v30-map-wrap{margin-top:10px}
  .trip-v30-map-wrap[hidden]{display:none}
  .trip-v30-map-filters{display:flex;gap:6px;overflow-x:auto;padding:2px 0 9px}
  .trip-v30-map-filters button{flex:0 0 auto;min-height:29px;padding:0 10px;border:1px solid #354b39;border-radius:999px;background:#0d1711;color:#aab8aa;font-size:7px;font-weight:900;white-space:nowrap}
  .trip-v30-map-filters button.active{border-color:var(--lime);background:#263a20;color:var(--lime)}
  .trip-v30-map-canvas{width:100%;height:290px;min-height:250px;overflow:hidden;border:1px solid #2e4432;border-radius:11px;background:#dfe7df;z-index:0}
  .trip-v30-map-status{margin-top:7px;color:#91a293;font-size:7px;line-height:1.5}
  .trip-v30-map-legend{display:flex;flex-wrap:wrap;gap:8px 12px;margin:9px 0 3px}
  .trip-v30-map-legend span{display:inline-flex;align-items:center;gap:5px;color:#9eaea1;font-size:7px}
  .trip-v30-legend-dot{width:9px;height:9px;border-radius:50%;display:inline-block}
  .trip-v30-map-order{margin-top:11px;padding-top:10px;border-top:1px solid #2d4233}
  .trip-v30-map-order strong{font-size:9px;color:#e8f1e4}
  .trip-v30-map-order-list{display:grid;gap:5px;margin-top:8px}
  .trip-v30-map-order-row{display:grid;grid-template-columns:25px minmax(0,1fr) auto;gap:8px;align-items:center;padding:7px;border:1px solid #2d4233;border-radius:9px;background:#0c1710}
  .trip-v30-order-num{width:24px;height:24px;display:grid;place-items:center;border-radius:7px;background:#263a20;color:var(--lime);font-size:8px;font-weight:950}
  .trip-v30-order-copy{min-width:0}
  .trip-v30-order-copy strong{display:block;color:#edf4e9;font-size:8px;overflow-wrap:anywhere}
  .trip-v30-order-copy small{display:block;margin-top:3px;color:#91a293;font-size:7px}
  .trip-v30-order-actions{display:flex;gap:5px;align-items:center}
  .trip-v30-order-actions button,.trip-v30-order-actions a{display:inline-flex;align-items:center;justify-content:center;min-height:26px;padding:0 8px;border:1px solid #40583a;border-radius:7px;background:#1b2d1c;color:var(--lime);font-size:7px;font-weight:900;text-decoration:none;white-space:nowrap}
  .trip-v30-map-empty{padding:10px;border:1px dashed #3b503c;border-radius:9px;color:#9eaea1;font-size:8px;line-height:1.5}
  .trip-v30-marker{background:transparent;border:0}
  .trip-v30-marker span{width:29px;height:29px;display:flex;align-items:center;justify-content:center;border:2px solid #08110c;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,.4);color:#10190c;font-size:10px;font-weight:950}
  .trip-v30-place-button{min-height:26px;padding:0 8px;border:1px solid #526c42;border-radius:7px;background:#24391f;color:var(--lime);font-size:7px;font-weight:950;white-space:nowrap}
  .trip-v30-place-button:disabled{opacity:.55}
  .trip-v30-place-sheet{position:fixed;inset:0;z-index:10050;display:flex;align-items:flex-end;justify-content:center;padding:12px;background:rgba(0,0,0,.72);backdrop-filter:blur(5px)}
  .trip-v30-place-sheet[hidden]{display:none}
  .trip-v30-place-card{width:min(100%,520px);max-height:88vh;overflow:auto;padding:17px;border:1px solid #435744;border-radius:20px 20px 15px 15px;background:#101a14;color:#edf4e9;box-shadow:0 20px 70px rgba(0,0,0,.55)}
  .trip-v30-sheet-top{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}
  .trip-v30-sheet-top h3{margin:5px 0 0;font-size:19px;line-height:1.2}
  .trip-v30-sheet-category{color:var(--lime);font-size:8px;font-weight:950;letter-spacing:1px}
  .trip-v30-sheet-close{width:34px;height:34px;flex:0 0 34px;border:1px solid #354a38;border-radius:50%;background:#1b2b1d;color:#eaf3e5;font-size:18px}
  .trip-v30-sheet-address{margin:11px 0;padding:10px;border:1px solid #2e4432;border-radius:10px;background:#0b150f;color:#c7d4c5;font-size:10px;line-height:1.5}
  .trip-v30-sheet-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;margin-top:10px}
  .trip-v30-sheet-field{min-width:0;padding:10px;border:1px solid #2c4030;border-radius:10px;background:#142019}
  .trip-v30-sheet-field small{display:block;color:#91a293;font-size:7px;font-weight:900;letter-spacing:.6px;text-transform:uppercase}
  .trip-v30-sheet-field strong,.trip-v30-sheet-field a{display:block;margin-top:5px;color:#edf4e9;font-size:9px;line-height:1.4;overflow-wrap:anywhere;text-decoration:none}
  .trip-v30-sheet-rating{margin-top:10px;padding:11px;border:1px solid #40583a;border-radius:10px;background:#1b2b1d}
  .trip-v30-sheet-rating strong{display:block;color:var(--lime);font-size:11px}
  .trip-v30-sheet-rating p{margin:5px 0 0;color:#aab8aa;font-size:8px;line-height:1.5}
  .trip-v30-sheet-actions{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:12px}
  .trip-v30-sheet-actions a,.trip-v30-sheet-actions button{min-height:39px;display:flex;align-items:center;justify-content:center;padding:0 8px;border:1px solid #40583a;border-radius:9px;background:#1b2d1c;color:var(--lime);font-size:8px;font-weight:950;text-decoration:none;text-align:center}
  .trip-v30-sheet-note{margin-top:10px;color:#819183;font-size:7px;line-height:1.5}
  .trip-v30-search-status{margin:8px 0;padding:9px;border:1px dashed #40583a;border-radius:9px;color:#aab8aa;font-size:8px;line-height:1.5}
  .trip-v30-map-panel .leaflet-container{font:12px/1.5 system-ui,-apple-system,Segoe UI,sans-serif}
  @media(max-width:560px){.trip-v30-map-canvas{height:270px}.trip-v30-map-panel{padding:10px}.trip-v30-map-order-row{grid-template-columns:24px minmax(0,1fr)}.trip-v30-order-actions{grid-column:2}.trip-v30-sheet-grid{grid-template-columns:1fr}.trip-v30-place-card{padding:14px}}
  `;

  const COLORS=['#b8f52e','#57c6ff','#e58bd1','#ffc94d','#b79aff','#61d5b5','#f08c72'];
  const OVERPASS=['https://overpass-api.de/api/interpreter','https://overpass.kumi.systems/api/interpreter'];
  let leafletPromise=null,activeMap=null,mapToken=0,observer=null,scheduled=false;

  function esc(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
  function num(value,fallback=0){const n=Number(value);return Number.isFinite(n)?n:fallback}
  function tripByDay(dayId){return (state.tripPlans||[]).find(t=>(t.days||[]).some(d=>String(d.id)===String(dayId)))||null}
  function dayById(dayId){const trip=tripByDay(dayId);return trip?{trip,day:trip.days.find(d=>String(d.id)===String(dayId))}:null}
  function categoryLabel(category){return category==='fuel'?'Distributore':category==='food'?'Ristorante / ristoro':category==='lodging'?'Pernottamento':'Sosta'}
  function categoryIcon(category){return category==='fuel'?'⛽':category==='food'?'🍽':category==='lodging'?'🛏':'⌖'}
  function categoryColor(category){return category==='fuel'?'#ffc94d':category==='food'?'#e58bd1':category==='lodging'?'#57c6ff':'#b8f52e'}
  function googleMapsUrl(point){return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(num(point.lat).toFixed(6)+','+num(point.lon).toFixed(6))}
  function routePoints(route){
    const cached=typeof routeCache!=='undefined'?routeCache.get(route?.id):null;
    if(cached?.latlngs?.length>1)return cached.latlngs;
    if(route?.latlngs?.length>1)return route.latlngs;
    return (route?.stops||[]).map(p=>[num(p[1],NaN),num(p[2],NaN)]).filter(p=>Number.isFinite(p[0])&&Number.isFinite(p[1]));
  }
  function km(a,b){
    const rad=Math.PI/180,lat1=num(a.lat)*rad,lat2=num(b.lat)*rad,dLat=(num(b.lat)-num(a.lat))*rad,dLon=(num(b.lon)-num(a.lon))*rad;
    const h=Math.sin(dLat/2)**2+Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLon/2)**2;
    return 6371*2*Math.atan2(Math.sqrt(h),Math.sqrt(Math.max(0,1-h)));
  }
  function segmentProjection(point,a,b){
    const cos=Math.cos(num(point.lat)*Math.PI/180),scale=111.32;
    const ax=(num(a[1])-num(point.lon))*cos*scale,ay=(num(a[0])-num(point.lat))*scale;
    const bx=(num(b[1])-num(point.lon))*cos*scale,by=(num(b[0])-num(point.lat))*scale;
    const dx=bx-ax,dy=by-ay,den=dx*dx+dy*dy;
    const t=den>0?Math.max(0,Math.min(1,-(ax*dx+ay*dy)/den)):0;
    const nearest={lat:num(a[0])+(num(b[0])-num(a[0]))*t,lon:num(a[1])+(num(b[1])-num(a[1]))*t};
    return{t,distance:km(point,nearest)};
  }
  function projectAlong(point,points){
    let cumulative=0,bestDistance=Infinity,bestAlong=0,total=0;
    for(let i=0;i<points.length-1;i++)total+=km({lat:points[i][0],lon:points[i][1]},{lat:points[i+1][0],lon:points[i+1][1]});
    for(let i=0;i<points.length-1;i++){
      const a=points[i],b=points[i+1],segment=km({lat:a[0],lon:a[1]},{lat:b[0],lon:b[1]}),p=segmentProjection(point,a,b);
      if(p.distance<bestDistance){bestDistance=p.distance;bestAlong=cumulative+segment*p.t}
      cumulative+=segment;
    }
    return{alongKm:bestAlong,progress:total?bestAlong/total:0,offRouteKm:bestDistance};
  }
  function sortStops(day,points){
    return (day.stopSelections||[]).filter(s=>Number.isFinite(Number(s.lat))&&Number.isFinite(Number(s.lon))).map(s=>({...s,category:s.category||'other',...projectAlong(s,points)})).sort((a,b)=>a.alongKm-b.alongKm);
  }
  function routeUrl(route){
    if(!route?.stops?.length)return null;
    return 'https://router.project-osrm.org/route/v1/driving/'+route.stops.map(s=>num(s[2])+','+num(s[1])).join(';')+'?overview=full&geometries=geojson&steps=false&alternatives=false';
  }
  async function roadGeometry(route){
    const cached=typeof routeCache!=='undefined'?routeCache.get(route.id):null;
    if(cached?.latlngs?.length>1)return cached.latlngs;
    if(route?.latlngs?.length>1)return route.latlngs;
    const url=routeUrl(route);if(!url)return routePoints(route);
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),6500);
    try{
      const response=await fetch(url,{signal:controller.signal,mode:'cors'});
      if(!response.ok)throw new Error('Routing non disponibile');
      const data=await response.json(),road=data.routes?.[0];
      if(data.code!=='Ok'||!road?.geometry?.coordinates?.length)throw new Error('Tracciato non disponibile');
      const result={latlngs:road.geometry.coordinates.map(p=>[p[1],p[0]]),distance:Math.round(road.distance/1000),duration:Math.round(road.duration/60)};
      if(typeof routeCache!=='undefined')routeCache.set(route.id,result);
      return result.latlngs;
    }catch(error){return routePoints(route)}
    finally{clearTimeout(timer)}
  }
  function samplePoints(points){
    if(points.length<2)return points.map(p=>({lat:p[0],lon:p[1]}));
    const segments=[],total={value:0};
    for(let i=0;i<points.length-1;i++){const d=km({lat:points[i][0],lon:points[i][1]},{lat:points[i+1][0],lon:points[i+1][1]});segments.push(d);total.value+=d}
    const count=Math.min(8,Math.max(3,Math.ceil(total.value/35)+1)),out=[];
    for(let s=0;s<count;s++){
      let target=total.value*s/(count-1),i=0;
      while(i<segments.length-1&&target>segments[i]){target-=segments[i];i++}
      const f=segments[i]>0?target/segments[i]:0,a=points[i],b=points[i+1];
      out.push({lat:num(a[0])+(num(b[0])-num(a[0]))*f,lon:num(a[1])+(num(b[1])-num(a[1]))*f});
    }
    return out;
  }
  async function overpass(query,timeoutMs){
    const controllers=OVERPASS.map(()=>new AbortController());
    const tasks=OVERPASS.map((url,index)=>(async()=>{
      const timer=setTimeout(()=>controllers[index].abort(),timeoutMs||8500);
      try{
        const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},body:'data='+encodeURIComponent(query),signal:controllers[index].signal});
        if(!response.ok)throw new Error('Overpass HTTP '+response.status);
        return await response.json();
      }finally{clearTimeout(timer)}
    })());
    try{return await Promise.any(tasks)}
    finally{controllers.forEach(c=>c.abort())}
  }
  function queryForCategory(category,samples){
    const selector=category==='fuel'?'[amenity=fuel]':category==='food'?'[amenity~"^(restaurant|cafe|fast_food|pub|bar)$"]':'[tourism~"^(hotel|guest_house|hostel|motel|apartment|chalet)$"]';
    const clauses=samples.map(p=>'nwr(around:3200,'+p.lat.toFixed(5)+','+p.lon.toFixed(5)+')'+selector+';').join('');
    return '[out:json][timeout:10];('+clauses+');out center tags;';
  }
  function poiFromOsm(item,category){
    const tags=item.tags||{},lat=num(item.lat??item.center?.lat,NaN),lon=num(item.lon??item.center?.lon,NaN);
    if(!Number.isFinite(lat)||!Number.isFinite(lon))return null;
    return{id:String(item.type)+'/'+String(item.id),osmType:String(item.type),osmId:String(item.id),name:tags.name||tags.brand||tags.operator||categoryLabel(category),category,lat,lon,tags};
  }
  function resultMarkup(day,category){
    const items=day.stops?.[category]||[];
    return items.map(item=>{
      const added=(day.stopSelections||[]).some(s=>String(s.id)===String(item.id));
      const score=item.tags?.rating?' · ★ '+esc(item.tags.rating):item.tags?.stars?' · '+esc(item.tags.stars)+' stelle':'';
      return '<article class="trip-v26-result"><span class="trip-v26-result-icon">'+categoryIcon(category)+'</span><span class="trip-v26-result-copy"><strong>'+esc(item.name)+'</strong><small>'+esc(categoryLabel(category))+(item.tags?.cuisine?' · '+esc(item.tags.cuisine):'')+score+' · OpenStreetMap</small></span><span class="trip-v26-result-actions"><button type="button" class="trip-v30-place-button" data-v30-place-card="1" data-v30-day-id="'+esc(day.id)+'" data-v30-category="'+category+'" data-v30-poi-id="'+esc(item.id)+'">Vedi scheda</button><a target="_blank" rel="noopener" href="'+googleMapsUrl(item)+'">Mappa ↗</a><button type="button" '+(added?'disabled':'')+' data-v26-add-stop="'+esc(day.id)+'" data-category="'+category+'" data-poi-id="'+esc(item.id)+'">'+(added?'✓ Aggiunta':'Aggiungi')+'</button></span></article>';
    }).join('');
  }
  function renderResults(dayId,category){
    const found=dayById(dayId);if(!found)return;
    const box=document.querySelector('[data-v26-results="'+CSS.escape(String(dayId))+'"]');if(!box)return;
    box.innerHTML=resultMarkup(found.day,category)||'<div class="trip-v26-empty">Nessun luogo trovato nelle vicinanze del percorso.</div>';
  }
  async function searchPois(dayId,category,button){
    const found=dayById(dayId);if(!found)return;
    const {trip,day}=found,route=routes.find(r=>String(r.id)===String(day.routeId));
    const box=document.querySelector('[data-v26-results="'+CSS.escape(String(dayId))+'"]');
    if(!route||!box)return;
    const recent=day.stopSearchMeta?.[category],cached=day.stops?.[category];
    if(cached?.length&&recent?.updatedAt&&Date.now()-recent.updatedAt<12*60*1000){
      renderResults(dayId,category);toast('Mostro i risultati già aggiornati.');return;
    }
    button.disabled=true;box.innerHTML='<div class="trip-v26-loading">Cerco i luoghi lungo il percorso…</div>';
    try{
      const points=routePoints(route);
      if(points.length<2)throw new Error('Questo itinerario non contiene abbastanza punti per la ricerca.');
      const samples=samplePoints(points),query=queryForCategory(category,samples),data=await overpass(query,8500);
      const seen=new Set(),items=[];
      (data.elements||[]).forEach(raw=>{
        const item=poiFromOsm(raw,category);if(!item||seen.has(item.id))return;
        seen.add(item.id);
        const position=projectAlong(item,points);
        if(position.offRouteKm>3.4)return;
        items.push({...item,...position});
      });
      items.sort((a,b)=>a.alongKm-b.alongKm);
      day.stops=day.stops||{};day.stops[category]=items.slice(0,30);
      day.stopSearchMeta=day.stopSearchMeta||{};day.stopSearchMeta[category]={updatedAt:Date.now(),sampleCount:samples.length};
      if(!save())throw new Error('Spazio di salvataggio locale insufficiente.');
      renderResults(dayId,category);
      if(!items.length)box.innerHTML='<div class="trip-v26-empty">Non ho trovato luoghi mappati entro 3,2 km dal percorso. Puoi riprovare o cercare una località diversa.</div>';
    }catch(error){
      box.innerHTML='<div class="trip-v26-empty">'+esc(error.message||'Ricerca temporaneamente non disponibile.')+'</div>';
    }finally{button.disabled=false}
  }

  function findPoi(dayId,category,poiId){
    const found=dayById(dayId);if(!found)return null;
    const {day}=found;
    return (day.stops?.[category]||[]).find(p=>String(p.id)===String(poiId))||(day.stopSelections||[]).find(p=>String(p.id)===String(poiId))||null;
  }
  function safeUrl(value){
    const raw=String(value||'').trim();if(!raw)return '';
    if(/^https?:\/\//i.test(raw))return raw;
    if(/^www\./i.test(raw))return 'https://'+raw;
    return '';
  }
  function addressFromTags(tags){
    if(tags['addr:full'])return tags['addr:full'];
    const street=[tags['addr:street'],tags['addr:housenumber']].filter(Boolean).join(' ');
    return [street,tags['addr:postcode'],tags['addr:city']||tags['addr:town']||tags['addr:village']||tags['addr:place'],tags['addr:country']].filter(Boolean).join(', ');
  }
  async function loadOsmDetails(item){
    if(item.tags&&Object.keys(item.tags).length)return item.tags;
    const [type,id]=String(item.id||'').includes('/')?String(item.id).split('/'):[item.osmType||'node',String(item.osmId||item.id||'')];
    if(!['node','way','relation'].includes(type)||!/^\d+$/.test(id))return {};
    const query='[out:json][timeout:8];'+type+'('+id+');out center tags;';
    try{
      const data=await overpass(query,6500),element=(data.elements||[])[0];
      return element?.tags||{};
    }catch(error){return {}}
  }
  function fieldMarkup(label,value,link){
    if(!value)return '';
    return '<div class="trip-v30-sheet-field"><small>'+esc(label)+'</small>'+(link?'<a href="'+esc(link)+'" target="_blank" rel="noopener noreferrer">'+esc(value)+'</a>':'<strong>'+esc(value)+'</strong>')+'</div>';
  }
  function ensureSheet(){
    let sheet=document.getElementById('ride-v30-place-sheet');
    if(sheet)return sheet;
    sheet=document.createElement('div');sheet.id='ride-v30-place-sheet';sheet.className='trip-v30-place-sheet';sheet.hidden=true;
    sheet.innerHTML='<section class="trip-v30-place-card" role="dialog" aria-modal="true" aria-label="Scheda luogo"></section>';
    document.body.appendChild(sheet);
    sheet.addEventListener('click',event=>{if(event.target===sheet||event.target.closest('[data-v30-close-sheet]'))sheet.hidden=true});
    return sheet;
  }
  async function showPlaceCard(dayId,category,poiId){
    const found=dayById(dayId),item=findPoi(dayId,category,poiId);if(!found||!item)return;
    const sheet=ensureSheet(),card=sheet.querySelector('.trip-v30-place-card');
    const title=esc(item.name||categoryLabel(category));
    card.innerHTML='<div class="trip-v30-sheet-top"><div><span class="trip-v30-sheet-category">'+categoryIcon(category)+' '+esc(categoryLabel(category))+'</span><h3>'+title+'</h3></div><button class="trip-v30-sheet-close" type="button" data-v30-close-sheet aria-label="Chiudi">×</button></div><div class="trip-v30-sheet-address">Carico indirizzo, contatti e informazioni disponibili…</div>';
    sheet.hidden=false;
    let tags=await loadOsmDetails(item);
    if(!sheet.isConnected||sheet.hidden)return;
    item.tags=tags;item.category=category;
    const saved=(found.day.stopSelections||[]).find(s=>String(s.id)===String(item.id));if(saved)saved.tags=tags;
    const cached=(found.day.stops?.[category]||[]).find(s=>String(s.id)===String(item.id));if(cached)cached.tags=tags;
    save();
    const address=addressFromTags(tags),lat=num(item.lat),lon=num(item.lon),phone=tags['contact:phone']||tags.phone||'',website=safeUrl(tags['contact:website']||tags.website||tags.url),email=tags['contact:email']||tags.email||'',hours=tags.opening_hours||'',cuisine=tags.cuisine||'',brand=tags.brand||tags.operator||'',stars=tags.stars||tags['hotel:stars']||'',rating=tags.rating||tags['rating:overall']||'',reviews=tags.reviews||tags.review_count||'',osmType=item.osmType||(String(item.id).split('/')[0]||'node'),osmId=item.osmId||(String(item.id).split('/')[1]||''),osmUrl=/^\d+$/.test(osmId)?'https://www.openstreetmap.org/'+osmType+'/'+osmId:'';
    const searchText=[item.name,address].filter(Boolean).join(' ');
    const reviewUrl='https://www.google.com/search?q='+encodeURIComponent(searchText+' recensioni valutazioni');
    let extras='';
    if(category==='food')extras+=fieldMarkup('Cucina',cuisine)+fieldMarkup('Asporto',tags.takeaway)+fieldMarkup('Posti all’aperto',tags.outdoor_seating);
    if(category==='fuel')extras+=fieldMarkup('Marchio',brand)+fieldMarkup('Benzina 95',tags['fuel:octane_95'])+fieldMarkup('Benzina 98',tags['fuel:octane_98'])+fieldMarkup('Diesel',tags['fuel:diesel'])+fieldMarkup('Self service',tags.automated);
    if(category==='lodging')extras+=fieldMarkup('Categoria struttura',stars?stars+' stelle':'')+fieldMarkup('Camere',tags.rooms)+fieldMarkup('Check-in',tags['check-in']);
    const ratingMarkup=rating?'<div class="trip-v30-sheet-rating"><strong>★ '+esc(rating)+(reviews?' · '+esc(reviews)+' recensioni':'')+'</strong><p>Valutazione presente nei dati mappati; fonte e metodo possono variare.</p></div>':stars?'<div class="trip-v30-sheet-rating"><strong>★ '+esc(stars)+' stelle</strong><p>Classificazione della struttura, non punteggio delle recensioni.</p></div>':'<div class="trip-v30-sheet-rating"><strong>Recensioni e punteggi non disponibili nei dati aperti</strong><p>Non inventiamo una valutazione: puoi cercare le recensioni pubbliche online dal pulsante qui sotto.</p></div>';
    card.innerHTML='<div class="trip-v30-sheet-top"><div><span class="trip-v30-sheet-category">'+categoryIcon(category)+' '+esc(categoryLabel(category))+'</span><h3>'+esc(item.name||categoryLabel(category))+'</h3></div><button class="trip-v30-sheet-close" type="button" data-v30-close-sheet aria-label="Chiudi">×</button></div>'+
      '<div class="trip-v30-sheet-address"><strong>'+(address?esc(address):'Indirizzo civico non presente nei dati aperti')+'</strong><br>Coordinate: '+lat.toFixed(6)+', '+lon.toFixed(6)+(brand?'<br>'+esc(brand):'')+'</div>'+
      '<div class="trip-v30-sheet-grid">'+fieldMarkup('Orari',hours)+fieldMarkup('Telefono',phone,phone?'tel:'+phone.replace(/[^+\d]/g,''):'')+fieldMarkup('Sito web',website,website)+fieldMarkup('Email',email,email?'mailto:'+email:'')+extras+fieldMarkup('Accessibilità',tags.wheelchair)+fieldMarkup('Parcheggio',tags.parking)+'</div>'+
      ratingMarkup+
      '<div class="trip-v30-sheet-actions"><a href="'+googleMapsUrl(item)+'" target="_blank" rel="noopener noreferrer">Indicazioni / navigatore ↗</a><a href="'+reviewUrl+'" target="_blank" rel="noopener noreferrer">Cerca recensioni ↗</a>'+(website?'<a href="'+website+'" target="_blank" rel="noopener noreferrer">Sito ufficiale ↗</a>':'')+(osmUrl?'<a href="'+osmUrl+'" target="_blank" rel="noopener noreferrer">Scheda OpenStreetMap ↗</a>':'')+'</div>'+
      '<p class="trip-v30-sheet-note">Informazioni da OpenStreetMap e dai tag disponibili. Orari, servizi e contatti potrebbero non essere aggiornati. Le stelle indicano una classificazione solo quando esplicitamente presente; non equivalgono a recensioni verificate.</p>';
  }

  function ensureStyles(){
    if(document.getElementById('ride-v30-style'))return;
    const style=document.createElement('style');style.id='ride-v30-style';style.textContent=CSS;document.head.appendChild(style);
  }
  function loadLeaflet(){
    if(window.L)return Promise.resolve(window.L);
    if(leafletPromise)return leafletPromise;
    leafletPromise=new Promise((resolve,reject)=>{
      const cssUrls=['https://unpkg.com/leaflet@1.9.4/dist/leaflet.css','https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css'];
      if(!document.querySelector('[data-ride-v30-leaflet-css]')){
        const link=document.createElement('link');link.rel='stylesheet';link.href=cssUrls[0];link.dataset.rideV30LeafletCss='1';link.onerror=()=>{link.href=cssUrls[1]};document.head.appendChild(link);
      }
      const urls=['https://unpkg.com/leaflet@1.9.4/dist/leaflet.js','https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js'];
      const tryLoad=index=>{
        if(window.L){resolve(window.L);return}
        if(index>=urls.length){leafletPromise=null;reject(new Error('Libreria mappa non disponibile.'));return}
        const script=document.createElement('script');script.src=urls[index];script.async=true;
        script.onload=()=>window.L?resolve(window.L):tryLoad(index+1);
        script.onerror=()=>{script.remove();tryLoad(index+1)};
        document.head.appendChild(script);
      };
      tryLoad(0);
    });
    return leafletPromise;
  }
  function tripMapMarkup(trip){
    const days=[...(trip.days||[])].sort((a,b)=>String(a.date).localeCompare(String(b.date)));
    return '<section class="trip-v30-map-panel" data-v30-trip-map-panel="'+esc(trip.id)+'"><div class="trip-v30-map-head"><div><span class="trip-v30-kicker">RIDE V30 · MAPPA LEGGERA</span><strong>Mappa interattiva del viaggio</strong><small>Cartografia stradale senza WebGL. Le soste vengono numerate lungo il percorso.</small></div><strong>'+days.length+' '+(days.length===1?'GIORNATA':'GIORNATE')+'</strong></div><button type="button" class="trip-v30-open-map" data-v30-open-map="'+esc(trip.id)+'">⌖ Apri mappa del viaggio</button><div class="trip-v30-map-wrap" data-v30-map-wrap="'+esc(trip.id)+'" hidden><div class="trip-v30-map-filters"><button type="button" class="active" data-v30-map-filter="all" data-trip-id="'+esc(trip.id)+'">Tutto il viaggio</button>'+days.map((day,i)=>'<button type="button" data-v30-map-filter="'+esc(day.id)+'" data-trip-id="'+esc(trip.id)+'">G'+(i+1)+' · '+esc(formatDiaryDate(day.date))+'</button>').join('')+'</div><div class="trip-v30-map-canvas" id="trip-v30-map-'+esc(trip.id)+'"></div><div class="trip-v30-map-status" data-v30-map-status="'+esc(trip.id)+'">La mappa verrà caricata solo quando la apri.</div><div class="trip-v30-map-legend"><span><i class="trip-v30-legend-dot" style="background:#ffc94d"></i> Carburante</span><span><i class="trip-v30-legend-dot" style="background:#e58bd1"></i> Ristoranti</span><span><i class="trip-v30-legend-dot" style="background:#57c6ff"></i> Alloggi</span><span>Linee colorate: giornate</span></div><div class="trip-v30-map-order"><strong>Ordine delle soste</strong><div class="trip-v30-map-order-list" data-v30-map-order="'+esc(trip.id)+'"><div class="trip-v30-map-empty">Caricamento soste…</div></div></div></div></section>';
  }
  function setMapStatus(tripId,message){
    const el=document.querySelector('[data-v30-map-status="'+CSS.escape(String(tripId))+'"]');if(el)el.textContent=message;
  }
  function orderHtml(dayData,filter){
    const visible=dayData.filter(item=>filter==='all'||String(item.day.id)===String(filter));
    const rows=[];
    visible.forEach(item=>item.stops.forEach((stop,index)=>{
      const n=item.dayIndex+1+'.'+(index+1),distance=Math.round(stop.alongKm);
      rows.push('<article class="trip-v30-map-order-row"><span class="trip-v30-order-num">'+n+'</span><span class="trip-v30-order-copy"><strong>'+esc(stop.name)+'</strong><small>'+categoryIcon(stop.category)+' '+esc(categoryLabel(stop.category))+' · '+distance+' km dalla partenza</small></span><span class="trip-v30-order-actions"><button type="button" data-v30-place-card="1" data-v30-day-id="'+esc(item.day.id)+'" data-v30-category="'+esc(stop.category)+'" data-v30-poi-id="'+esc(stop.id)+'">Scheda</button></span></article>');
    }));
    return rows.join('')||'<div class="trip-v30-map-empty">Nessuna sosta selezionata per questa visualizzazione.</div>';
  }
  function currentMapData(){
    if(!activeMap)return;
    const filter=activeMap.filter||'all',visible=activeMap.dayData.filter(item=>filter==='all'||String(item.day.id)===String(filter));
    activeMap.layers.clearLayers();
    const bounds=[];
    visible.forEach(item=>{
      if(item.points.length>1){
        const line=window.L.polyline(item.points,{color:COLORS[item.dayIndex%COLORS.length],weight:4,opacity:item.approximate?.55:.9,lineCap:'round',lineJoin:'round'});
        line.addTo(activeMap.layers);item.points.forEach(p=>bounds.push(p));
        const first=item.points[0],last=item.points[item.points.length-1];
        window.L.circleMarker(first,{radius:6,color:'#0b140d',weight:2,fillColor:'#b8f52e',fillOpacity:1}).bindTooltip('Partenza G'+(item.dayIndex+1)).addTo(activeMap.layers);
        window.L.circleMarker(last,{radius:6,color:'#0b140d',weight:2,fillColor:'#f07f72',fillOpacity:1}).bindTooltip('Arrivo G'+(item.dayIndex+1)).addTo(activeMap.layers);
      }
      item.stops.forEach((stop,index)=>{
        const color=categoryColor(stop.category),label=String(index+1);
        const icon=window.L.divIcon({className:'trip-v30-marker',html:'<span style="background:'+color+'">'+label+'</span>',iconSize:[29,29],iconAnchor:[14,14]});
        const popup='<strong>'+esc(stop.name)+'</strong><br><small>'+esc(categoryLabel(stop.category))+' · G'+(item.dayIndex+1)+' · '+Math.round(stop.alongKm)+' km dalla partenza</small><br><button type="button" class="trip-v30-place-button" data-v30-place-card="1" data-v30-day-id="'+esc(item.day.id)+'" data-v30-category="'+esc(stop.category)+'" data-v30-poi-id="'+esc(stop.id)+'">Vedi scheda</button> <a target="_blank" rel="noopener" href="'+googleMapsUrl(stop)+'">Indicazioni ↗</a>';
        window.L.marker([stop.lat,stop.lon],{icon}).bindPopup(popup).addTo(activeMap.layers);
        bounds.push([stop.lat,stop.lon]);
      });
    });
    const order=document.querySelector('[data-v30-map-order="'+CSS.escape(String(activeMap.tripId))+'"]');
    if(order)order.innerHTML=orderHtml(activeMap.dayData,filter);
    document.querySelectorAll('[data-v30-map-filter][data-trip-id="'+CSS.escape(String(activeMap.tripId))+'"]').forEach(b=>b.classList.toggle('active',b.dataset.v30MapFilter===filter));
    if(bounds.length){
      if(bounds.length===1)activeMap.map.setView(bounds[0],13);
      else activeMap.map.fitBounds(bounds,{padding:[22,22],maxZoom:11});
    }
  }
  async function buildMapData(trip,token){
    const days=[...(trip.days||[])].sort((a,b)=>String(a.date).localeCompare(String(b.date)));
    const data=await Promise.all(days.map(async(day,dayIndex)=>{
      const route=routes.find(r=>String(r.id)===String(day.routeId));
      if(!route)return{day,dayIndex,route:null,points:[],approximate:true,stops:[]};
      let points=await roadGeometry(route);
      if(token!==mapToken)return null;
      const approximate=!(typeof routeCache!=='undefined'&&routeCache.get(route.id)?.distance)||points.length<2;
      if(points.length<2)points=routePoints(route);
      return{day,dayIndex,route,points,approximate,stops:sortStops(day,points)};
    }));
    return data.filter(Boolean);
  }
  function refreshMap(){
    if(!activeMap)return;
    const trip=(state.tripPlans||[]).find(t=>String(t.id)===String(activeMap.tripId));if(!trip)return;
    const byId=new Map((trip.days||[]).map(day=>[String(day.id),day]));
    activeMap.dayData=activeMap.dayData.map(item=>{
      const day=byId.get(String(item.day.id))||item.day;
      return{...item,day,stops:sortStops(day,item.points)};
    });
    currentMapData();
  }
  function cleanupMap(){
    mapToken++;
    if(activeMap?.map){try{activeMap.map.remove()}catch(error){}}
    activeMap=null;
  }
  async function openTripMap(tripId){
    const trip=(state.tripPlans||[]).find(t=>String(t.id)===String(tripId));if(!trip)return;
    const wrap=document.querySelector('[data-v30-map-wrap="'+CSS.escape(String(tripId))+'"]'),canvas=document.getElementById('trip-v30-map-'+tripId);
    const button=document.querySelector('[data-v30-open-map="'+CSS.escape(String(tripId))+'"]');
    if(!wrap||!canvas)return;
    if(activeMap&&String(activeMap.tripId)===String(tripId)){
      wrap.hidden=!wrap.hidden;button.textContent=wrap.hidden?'⌖ Apri mappa del viaggio':'Nascondi mappa';
      if(!wrap.hidden)requestAnimationFrame(()=>activeMap?.map.invalidateSize());return;
    }
    cleanupMap();const token=mapToken;
    wrap.hidden=false;button.textContent='Nascondi mappa';setMapStatus(tripId,'Caricamento cartografia leggera e tracciati…');
    try{
      const L=await loadLeaflet();if(token!==mapToken||!canvas.isConnected)return;
      const map=L.map(canvas,{zoomControl:true,scrollWheelZoom:false,preferCanvas:true,attributionControl:true});
      activeMap={tripId,map,layers:L.layerGroup().addTo(map),dayData:[],filter:'all'};
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap contributors',subdomains:'abc'}).addTo(map);
      map.setView([45.8,10.8],6);
      setMapStatus(tripId,'Calcolo dei percorsi e ordinamento delle soste…');
      const dayData=await buildMapData(trip,token);if(token!==mapToken||!canvas.isConnected)return;
      activeMap.dayData=dayData;currentMapData();
      const approximate=dayData.filter(d=>d.approximate).length;
      setMapStatus(tripId,approximate?'Mappa pronta. '+approximate+' giornata/e usano un tracciato indicativo.':'Mappa pronta · percorsi stradali e soste caricati.');
      requestAnimationFrame(()=>requestAnimationFrame(()=>{if(activeMap?.map===map){map.invalidateSize();currentMapData()}}));
    }catch(error){
      if(token!==mapToken)return;
      cleanupMap();wrap.hidden=false;button.textContent='Riprova ad aprire la mappa';
      setMapStatus(tripId,'Mappa non disponibile. Le soste restano consultabili nell’elenco della giornata.');
    }
  }
  function ensureTripPanel(){
    const modal=document.querySelector('#modal-root .modal');if(!modal)return;
    const tripId=modal.querySelector('[data-action="delete-trip"]')?.dataset.tripId;
    const trip=(state.tripPlans||[]).find(t=>String(t.id)===String(tripId));
    const summary=modal.querySelector('.trip-detail-summary');
    if(!trip||!summary)return;
    if(modal.querySelector('[data-v30-trip-map-panel]'))return;
    summary.insertAdjacentHTML('afterend',tripMapMarkup(trip));
  }
  function enhancePlaceButtons(){
    const modal=document.querySelector('#modal-root .modal');if(!modal)return;
    modal.querySelectorAll('[data-v26-add-stop]').forEach(add=>{
      const actions=add.parentElement;if(!actions||actions.querySelector('[data-v30-place-card]'))return;
      const button=document.createElement('button');button.type='button';button.className='trip-v30-place-button';button.textContent='Vedi scheda';
      button.dataset.v30PlaceCard='1';button.dataset.v30DayId=add.dataset.v26AddStop;button.dataset.v30Category=add.dataset.category;button.dataset.v30PoiId=add.dataset.poiId;
      actions.insertBefore(button,add);
    });
    modal.querySelectorAll('[data-v26-remove-stop]').forEach(remove=>{
      const actions=remove.parentElement,card=remove.closest('.trip-v26-selected-stop');if(!actions||!card||actions.querySelector('[data-v30-place-card]'))return;
      const dayId=remove.dataset.v26RemoveStop,poiId=remove.dataset.poiId,found=dayById(dayId);
      const item=found?.day.stopSelections?.find(p=>String(p.id)===String(poiId));if(!item)return;
      const button=document.createElement('button');button.type='button';button.className='trip-v30-place-button';button.textContent='Vedi scheda';
      button.dataset.v30PlaceCard='1';button.dataset.v30DayId=dayId;button.dataset.v30Category=item.category||'other';button.dataset.v30PoiId=poiId;
      actions.insertBefore(button,remove);
    });
  }
  function scheduleEnsure(){
    if(scheduled)return;scheduled=true;
    requestAnimationFrame(()=>{scheduled=false;const modal=document.querySelector('#modal-root .modal');if(!modal){cleanupMap();const sheet=document.getElementById('ride-v30-place-sheet');if(sheet)sheet.hidden=true;return}ensureTripPanel();enhancePlaceButtons()});
  }
  function addStyles(){if(document.getElementById('ride-v30-style'))return;const style=document.createElement('style');style.id='ride-v30-style';style.textContent=CSS;document.head.appendChild(style)}
  function start(){
    addStyles();scheduleEnsure();
    observer=new MutationObserver(scheduleEnsure);observer.observe(document.body,{childList:true,subtree:true});
    document.addEventListener('click',event=>{
      const search=event.target.closest('[data-v26-search]');
      if(search){
        event.preventDefault();event.stopImmediatePropagation();
        const dayId=search.dataset.v26Search,category=search.dataset.category;
        searchPois(dayId,category,search);return;
      }
      const card=event.target.closest('[data-v30-place-card]');
      if(card){event.preventDefault();event.stopImmediatePropagation();showPlaceCard(card.dataset.v30DayId,card.dataset.v30Category,card.dataset.v30PoiId);return}
      const open=event.target.closest('[data-v30-open-map]');
      if(open){event.preventDefault();event.stopImmediatePropagation();openTripMap(open.dataset.v30OpenMap);return}
      const filter=event.target.closest('[data-v30-map-filter]');
      if(filter){event.preventDefault();event.stopImmediatePropagation();if(activeMap&&String(activeMap.tripId)===String(filter.dataset.tripId)){activeMap.filter=filter.dataset.v30MapFilter;currentMapData()}return}
    },true);
    document.addEventListener('click',event=>{
      const add=event.target.closest('[data-v26-add-stop]');
      if(add){const dayId=add.dataset.v26AddStop;setTimeout(()=>{refreshMap();scheduleEnsure()},30);return}
      const remove=event.target.closest('[data-v26-remove-stop]');
      if(remove){setTimeout(()=>{refreshMap();scheduleEnsure()},30);return}
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
