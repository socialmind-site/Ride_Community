/* RIDE V28 - Interactive trip map and ordered stops */
(function(){
  'use strict';

  const STYLE = `
  .trip-v28-map-panel{margin:14px 0;padding:12px;border:1px solid #344b3a;border-radius:15px;background:linear-gradient(145deg,#17251b,#101a14)}
  .trip-v28-map-head{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:10px}
  .trip-v28-map-head strong{display:block;color:#eef5e9;font-size:12px}
  .trip-v28-map-head small{display:block;margin-top:4px;color:#91a293;font-size:8px;line-height:1.5}
  .trip-v28-map-kicker{display:block;margin-bottom:4px;color:var(--lime);font-size:7px;font-weight:950;letter-spacing:1.2px}
  .trip-v28-day-filters{display:flex;gap:6px;overflow-x:auto;padding:2px 0 9px;scrollbar-width:thin}
  .trip-v28-day-filters button{flex:0 0 auto;min-height:30px;padding:0 10px;border:1px solid #354b39;border-radius:999px;background:#0d1711;color:#aab8aa;font-size:7px;font-weight:900;white-space:nowrap}
  .trip-v28-day-filters button.active{border-color:var(--lime);background:#263a20;color:var(--lime)}
  .trip-v28-map-canvas{position:relative;width:100%;height:clamp(250px,42vh,380px);min-height:250px;overflow:hidden;border:1px solid #2e4432;border-radius:12px;background:#0a1510}
  .trip-v28-map-status{margin-top:7px;color:#91a293;font-size:7px;line-height:1.5}
  .trip-v28-map-legend{display:flex;flex-wrap:wrap;gap:8px 12px;margin:9px 0 3px}
  .trip-v28-map-legend span{display:inline-flex;align-items:center;gap:5px;color:#9eaea1;font-size:7px}
  .trip-v28-legend-dot{width:9px;height:9px;border:1px solid #07100a;border-radius:50%;display:inline-block}
  .trip-v28-legend-line{width:17px;height:3px;border-radius:5px;background:var(--lime);display:inline-block}
  .trip-v28-order-panel{margin-top:12px;padding-top:11px;border-top:1px solid #2d4233}
  .trip-v28-order-head{display:flex;justify-content:space-between;gap:8px;align-items:center;margin-bottom:8px}
  .trip-v28-order-head strong{font-size:9px;color:#e8f1e4}
  .trip-v28-order-head small{font-size:7px;color:#91a293}
  .trip-v28-order-group{margin-top:8px}
  .trip-v28-order-day{display:flex;align-items:center;gap:7px;margin:10px 0 6px;color:#dce8d9;font-size:8px;font-weight:900}
  .trip-v28-order-day span{display:inline-grid;place-items:center;width:20px;height:20px;border-radius:7px;background:#263a20;color:var(--lime);font-size:8px}
  .trip-v28-order-list{display:grid;gap:5px}
  .trip-v28-order-item{display:grid;grid-template-columns:27px minmax(0,1fr) auto;gap:8px;align-items:center;padding:7px;border:1px solid #2d4233;border-radius:9px;background:#0c1710}
  .trip-v28-order-number{width:25px;height:25px;display:grid;place-items:center;border-radius:8px;background:#263a20;color:var(--lime);font-size:8px;font-weight:950}
  .trip-v28-order-copy{min-width:0}
  .trip-v28-order-copy strong{display:block;color:#edf4e9;font-size:8px;overflow-wrap:anywhere}
  .trip-v28-order-copy small{display:block;margin-top:3px;color:#91a293;font-size:7px}
  .trip-v28-order-actions a{display:inline-flex;align-items:center;justify-content:center;min-height:26px;padding:0 8px;border:1px solid #40583a;border-radius:7px;background:#1b2d1c;color:var(--lime);font-size:7px;font-weight:900;text-decoration:none;white-space:nowrap}
  .trip-v28-order-empty{padding:10px;border:1px dashed #3b503c;border-radius:9px;color:#9eaea1;font-size:8px;line-height:1.5}
  .trip-v28-popup{min-width:150px;color:#152018;font-family:inherit}
  .trip-v28-popup strong{display:block;font-size:12px;line-height:1.35}
  .trip-v28-popup small{display:block;margin-top:4px;color:#526153;font-size:10px}
  .trip-v28-popup a{display:inline-block;margin-top:7px;color:#24521b;font-size:10px;font-weight:900;text-decoration:none}
  .trip-v28-map-panel .maplibregl-ctrl-group{border-radius:9px;overflow:hidden}
  .trip-v28-map-panel .maplibregl-ctrl button{width:28px;height:28px}
  @media(max-width:560px){
    .trip-v28-map-panel{padding:9px}
    .trip-v28-map-canvas{height:285px;min-height:250px}
    .trip-v28-order-item{grid-template-columns:25px minmax(0,1fr)}
    .trip-v28-order-actions{grid-column:2}
  }`;

  let activeMap=null;
  let mapToken=0;
  let observer=null;

  function esc(value){
    return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  function haversine(a,b){
    const rad=Math.PI/180,lat1=Number(a.lat)*rad,lat2=Number(b.lat)*rad;
    const dLat=(Number(b.lat)-Number(a.lat))*rad,dLon=(Number(b.lon)-Number(a.lon))*rad;
    const h=Math.sin(dLat/2)**2+Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLon/2)**2;
    return 6371*2*Math.atan2(Math.sqrt(h),Math.sqrt(Math.max(0,1-h)));
  }
  function categoryLabel(category){
    return category==='fuel'?'Distributore':category==='food'?'Ristorante / ristoro':category==='lodging'?'Pernottamento':'Sosta';
  }
  function categoryIcon(category){
    return category==='fuel'?'⛽':category==='food'?'🍽':category==='lodging'?'🛏':'⌖';
  }
  function googleMapsUrl(point){
    return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(Number(point.lat).toFixed(6)+','+Number(point.lon).toFixed(6));
  }
  function routePointsFromStops(route){
    return (route?.stops||[]).map(stop=>[Number(stop[1]),Number(stop[2])]).filter(point=>Number.isFinite(point[0])&&Number.isFinite(point[1]));
  }
  function projectStop(stop,points){
    if(!Array.isArray(points)||points.length<2)return{alongKm:0,progress:0,offRouteKm:Infinity};
    let cumulative=0,bestDistance=Infinity,bestAlong=0;
    const cos=Math.cos(Number(stop.lat)*Math.PI/180),scale=111.32;
    for(let i=0;i<points.length-1;i++){
      const a=points[i],b=points[i+1];
      const ax=(Number(a[1])-Number(stop.lon))*cos*scale,ay=(Number(a[0])-Number(stop.lat))*scale;
      const bx=(Number(b[1])-Number(stop.lon))*cos*scale,by=(Number(b[0])-Number(stop.lat))*scale;
      const dx=bx-ax,dy=by-ay,den=dx*dx+dy*dy;
      const t=den>0?Math.max(0,Math.min(1,-(ax*dx+ay*dy)/den)):0;
      const closest={lat:Number(a[0])+(Number(b[0])-Number(a[0]))*t,lon:Number(a[1])+(Number(b[1])-Number(a[1]))*t};
      const distance=haversine(stop,closest),segment=haversine({lat:a[0],lon:a[1]},{lat:b[0],lon:b[1]});
      if(distance<bestDistance){bestDistance=distance;bestAlong=cumulative+segment*t}
      cumulative+=segment;
    }
    return{alongKm:bestAlong,progress:cumulative>0?bestAlong/cumulative:0,offRouteKm:bestDistance};
  }
  function sortDayStops(day,points){
    return (day.stopSelections||[]).filter(item=>Number.isFinite(Number(item.lat))&&Number.isFinite(Number(item.lon))).map(item=>{
      const position=projectStop(item,points);
      return{...item,category:item.category||'other',alongKm:position.alongKm,progress:position.progress,offRouteKm:position.offRouteKm};
    }).sort((a,b)=>a.alongKm-b.alongKm||String(a.name).localeCompare(String(b.name),'it'));
  }
  function currentTrip(tripId){
    return (state.tripPlans||[]).find(trip=>String(trip.id)===String(tripId))||null;
  }
  async function loadDayData(trip,token){
    const sorted=[...(trip.days||[])].sort((a,b)=>String(a.date).localeCompare(String(b.date)));
    const output=[];
    for(let index=0;index<sorted.length;index++){
      if(token!==mapToken)return [];
      const day=sorted[index],route=(routes||[]).find(item=>String(item.id)===String(day.routeId));
      if(!route){output.push({day,dayIndex:index,route:null,points:[],approximate:true,stops:[]});continue}
      let geometry=null,points=[];
      try{
        const cached=typeof routeCache!=='undefined'?routeCache.get(route.id):null;
        if(cached?.latlngs?.length>1){geometry=cached;points=cached.latlngs}
        else if(Array.isArray(route.latlngs)&&route.latlngs.length>1){points=route.latlngs;geometry={latlngs:points}}
        else if(typeof getRoadGeometry==='function'&&(route.stops||[]).length>1){geometry=await getRoadGeometry(route);if(geometry?.latlngs?.length>1)points=geometry.latlngs}
      }catch(error){}
      if(points.length<2)points=routePointsFromStops(route);
      const approximate=!(geometry?.latlngs?.length>1||Array.isArray(route.latlngs)&&route.latlngs.length>1);
      output.push({day,dayIndex:index,route,points,approximate,stops:sortDayStops(day,points)});
    }
    return output;
  }
  function buildMapData(dayData,filter){
    const visible=dayData.filter(item=>filter==='all'||String(item.day.id)===String(filter));
    const routeFeatures=[],stopFeatures=[],terminalFeatures=[],allCoords=[];
    visible.forEach(item=>{
      const coords=item.points.map(point=>[Number(point[1]),Number(point[0])]).filter(point=>Number.isFinite(point[0])&&Number.isFinite(point[1]));
      coords.forEach(point=>allCoords.push(point));
      if(coords.length>1)routeFeatures.push({type:'Feature',properties:{dayIndex:item.dayIndex,approximate:item.approximate?1:0},geometry:{type:'LineString',coordinates:coords}});
      if(coords.length){
        terminalFeatures.push({type:'Feature',properties:{kind:'start',dayIndex:item.dayIndex,label:'P'+(item.dayIndex+1)},geometry:{type:'Point',coordinates:coords[0]}});
        terminalFeatures.push({type:'Feature',properties:{kind:'end',dayIndex:item.dayIndex,label:'A'+(item.dayIndex+1)},geometry:{type:'Point',coordinates:coords[coords.length-1]}});
      }
      item.stops.forEach((stop,sequence)=>{
        const coord=[Number(stop.lon),Number(stop.lat)];
        allCoords.push(coord);
        stopFeatures.push({type:'Feature',properties:{id:String(stop.id),name:String(stop.name||'Sosta'),category:String(stop.category||'other'),dayIndex:item.dayIndex,sequence:sequence+1,sequenceLabel:(item.dayIndex+1)+'.'+(sequence+1),dayTitle:String(item.day.title||item.route?.name||'Giornata '+(item.dayIndex+1)),date:String(item.day.date||''),alongKm:Number(stop.alongKm||0),lat:Number(stop.lat),lon:Number(stop.lon)},geometry:{type:'Point',coordinates:coord}});
      });
    });
    return{
      visible,
      routes:{type:'FeatureCollection',features:routeFeatures},
      stops:{type:'FeatureCollection',features:stopFeatures},
      terminals:{type:'FeatureCollection',features:terminalFeatures},
      allCoords
    };
  }
  function mapMarkup(trip){
    const id=esc(trip.id);
    const days=[...(trip.days||[])].sort((a,b)=>String(a.date).localeCompare(String(b.date)));
    const filters='<button type="button" class="active" data-v28-trip-map-filter="all" data-trip-id="'+id+'">Tutto il viaggio</button>'+days.map((day,index)=>'<button type="button" data-v28-trip-map-filter="'+esc(day.id)+'" data-trip-id="'+id+'">G'+(index+1)+' · '+esc(formatDiaryDate(day.date))+'</button>').join('');
    return '<section class="trip-v28-map-panel" data-v28-map-panel="'+id+'"><div class="trip-v28-map-head"><div><span class="trip-v28-map-kicker">RIDE V28 · INTERACTIVE TRIP MAP</span><strong>Mappa del viaggio</strong><small>Tracciati giornalieri e soste selezionate, numerate nell’ordine in cui si incontrano sulla strada.</small></div><strong>'+days.length+' '+(days.length===1?'GIORNATA':'GIORNATE')+'</strong></div><div class="trip-v28-day-filters">'+filters+'</div><div class="trip-v28-map-canvas" id="trip-v28-map-'+id+'" role="region" aria-label="Mappa interattiva del viaggio"></div><div class="trip-v28-map-status" data-v28-map-status="'+id+'">Preparo i tracciati stradali e le soste…</div><div class="trip-v28-map-legend"><span><i class="trip-v28-legend-line"></i> Tracciato</span><span><i class="trip-v28-legend-dot" style="background:#ffc94d"></i> Carburante</span><span><i class="trip-v28-legend-dot" style="background:#e58bd1"></i> Ristoranti</span><span><i class="trip-v28-legend-dot" style="background:#57c6ff"></i> Pernottamenti</span><span><i class="trip-v28-legend-dot" style="background:#b8f52e"></i> Partenza / arrivo</span></div><div class="trip-v28-order-panel"><div class="trip-v28-order-head"><strong>Ordine delle soste</strong><small data-v28-order-count="'+id+'">0 soste</small></div><div data-v28-order-list="'+id+'"><div class="trip-v28-order-empty">Le soste che aggiungi alle giornate appariranno qui, ordinate lungo il tracciato.</div></div></div></section>';
  }
  function setStatus(tripId,message){
    const status=document.querySelector('[data-v28-map-status="'+CSS.escape(String(tripId))+'"]');
    if(status)status.textContent=message;
  }
  function fitMap(map,coords){
    if(!coords.length)return;
    let minLon=Infinity,minLat=Infinity,maxLon=-Infinity,maxLat=-Infinity;
    coords.forEach(point=>{minLon=Math.min(minLon,point[0]);maxLon=Math.max(maxLon,point[0]);minLat=Math.min(minLat,point[1]);maxLat=Math.max(maxLat,point[1])});
    if(!Number.isFinite(minLon)||!Number.isFinite(minLat))return;
    if(Math.abs(maxLon-minLon)<.002&&Math.abs(maxLat-minLat)<.002){map.flyTo({center:[minLon,minLat],zoom:13,duration:650});return}
    map.fitBounds([[minLon,minLat],[maxLon,maxLat]],{padding:{top:38,bottom:38,left:38,right:38},maxZoom:11,duration:700});
  }
  function orderMarkup(dayData,filter){
    const visible=dayData.filter(item=>filter==='all'||String(item.day.id)===String(filter));
    const total=visible.reduce((sum,item)=>sum+item.stops.length,0);
    const groups=visible.map(item=>{
      if(!item.stops.length)return '';
      const rows=item.stops.map((stop,index)=>{
        const label=(item.dayIndex+1)+'.'+(index+1);
        const distance=Number.isFinite(stop.alongKm)?' · circa '+Math.round(stop.alongKm)+' km dalla partenza':'';
        return '<article class="trip-v28-order-item"><span class="trip-v28-order-number">'+label+'</span><span class="trip-v28-order-copy"><strong>'+esc(stop.name)+'</strong><small>'+categoryIcon(stop.category)+' '+categoryLabel(stop.category)+distance+'</small></span><span class="trip-v28-order-actions"><a href="'+googleMapsUrl(stop)+'" target="_blank" rel="noopener noreferrer">Apri Maps ↗</a></span></article>';
      }).join('');
      return '<div class="trip-v28-order-group"><div class="trip-v28-order-day"><span>G'+(item.dayIndex+1)+'</span>'+esc(item.day.title||item.route?.name||'Giornata '+(item.dayIndex+1))+' · '+esc(formatDiaryDate(item.day.date))+'</div><div class="trip-v28-order-list">'+rows+'</div></div>';
    }).join('');
    return{total,html:groups||'<div class="trip-v28-order-empty">Nessuna sosta salvata in questa visualizzazione. Aggiungi distributori, ristoranti o alloggi dalla scheda della giornata.</div>'};
  }
  function updateOrderPanel(tripId,dayData,filter){
    const box=document.querySelector('[data-v28-order-list="'+CSS.escape(String(tripId))+'"]');
    const count=document.querySelector('[data-v28-order-count="'+CSS.escape(String(tripId))+'"]');
    if(!box)return;
    const result=orderMarkup(dayData,filter);
    box.innerHTML=result.html;
    if(count)count.textContent=result.total+' '+(result.total===1?'sosta':'soste');
  }
  function updateMapSources(map,dayData,filter,fit){
    if(!map||!map.isStyleLoaded())return;
    const data=buildMapData(dayData,filter);
    map.getSource('trip-v28-routes')?.setData(data.routes);
    map.getSource('trip-v28-stops')?.setData(data.stops);
    map.getSource('trip-v28-terminals')?.setData(data.terminals);
    if(fit)fitMap(map,data.allCoords);
  }
  function setFilter(tripId,filter){
    if(!activeMap||String(activeMap.tripId)!==String(tripId))return;
    activeMap.filter=String(filter);
    document.querySelectorAll('[data-v28-trip-map-filter][data-trip-id="'+CSS.escape(String(tripId))+'"]').forEach(button=>button.classList.toggle('active',button.dataset.v28TripMapFilter===activeMap.filter));
    updateMapSources(activeMap.map,activeMap.dayData,activeMap.filter,true);
    updateOrderPanel(tripId,activeMap.dayData,activeMap.filter);
  }
  function refreshMapFromState(tripId){
    if(!activeMap||String(activeMap.tripId)!==String(tripId))return;
    const trip=currentTrip(tripId);if(!trip)return;
    const dayById=new Map((trip.days||[]).map(day=>[String(day.id),day]));
    activeMap.dayData=activeMap.dayData.map(item=>{
      const day=dayById.get(String(item.day.id))||item.day;
      return{...item,day,stops:sortDayStops(day,item.points)};
    });
    updateMapSources(activeMap.map,activeMap.dayData,activeMap.filter,false);
    updateOrderPanel(tripId,activeMap.dayData,activeMap.filter);
  }
  function cleanupMap(){
    mapToken++;
    if(activeMap?.map){try{activeMap.map.remove()}catch(error){}}
    activeMap=null;
  }
  async function initTripMap(trip){
    const panel=document.querySelector('[data-v28-map-panel="'+CSS.escape(String(trip.id))+'"]');
    const canvas=document.getElementById('trip-v28-map-'+trip.id);
    if(!panel||!canvas||!canvas.isConnected)return;
    if(activeMap&&String(activeMap.tripId)===String(trip.id)&&activeMap.map){refreshMapFromState(trip.id);return}
    cleanupMap();
    const token=mapToken;
    const days=(trip.days||[]).length;
    if(!days){setStatus(trip.id,'Aggiungi una giornata per visualizzare il percorso sulla mappa.');return}
    setStatus(trip.id,'Caricamento mappa e tracciati giornalieri…');
    try{
      if(typeof loadMapLibre!=='function')throw new Error('Il motore cartografico non è disponibile.');
      const lib=await loadMapLibre();
      if(token!==mapToken||!canvas.isConnected)return;
      const map=new lib.Map({container:canvas,style:'https://tiles.openfreemap.org/styles/liberty',center:[10.8,45.8],zoom:6,cooperativeGestures:true,attributionControl:true});
      activeMap={tripId:trip.id,map,lib,dayData:[],filter:'all'};
      if(lib.NavigationControl)map.addControl(new lib.NavigationControl({showCompass:false}), 'top-right');
      await new Promise((resolve,reject)=>{
        const timeout=setTimeout(()=>reject(new Error('Tempo massimo di caricamento della mappa superato.')),18000);
        map.once('load',()=>{clearTimeout(timeout);resolve()});
        map.once('error',event=>{if(!map.isStyleLoaded()){clearTimeout(timeout);reject(event.error||new Error('Mappa non disponibile.'))}});
      });
      if(token!==mapToken||!canvas.isConnected){cleanupMap();return}
      map.addSource('trip-v28-routes',{type:'geojson',data:{type:'FeatureCollection',features:[]}});
      map.addLayer({id:'trip-v28-route-line',type:'line',source:'trip-v28-routes',layout:{'line-cap':'round','line-join':'round'},paint:{'line-color':['match',['get','dayIndex'],0,'#b8f52e',1,'#57c6ff',2,'#e58bd1',3,'#ffc94d',4,'#b79aff',5,'#61d5b5','#b8f52e'],'line-width':4,'line-opacity':['case',['==',['get','approximate'],1],.55,.92]}});
      map.addSource('trip-v28-terminals',{type:'geojson',data:{type:'FeatureCollection',features:[]}});
      map.addLayer({id:'trip-v28-terminal-circles',type:'circle',source:'trip-v28-terminals',paint:{'circle-radius':8,'circle-color':['match',['get','kind'],'start','#b8f52e','#f07f72'],'circle-stroke-color':'#08110c','circle-stroke-width':2}});
      map.addLayer({id:'trip-v28-terminal-labels',type:'symbol',source:'trip-v28-terminals',layout:{'text-field':['get','label'],'text-size':8,'text-offset':[0,1.5],'text-allow-overlap':true},paint:{'text-color':'#f5f7f1','text-halo-color':'#08110c','text-halo-width':1.5}});
      map.addSource('trip-v28-stops',{type:'geojson',data:{type:'FeatureCollection',features:[]}});
      map.addLayer({id:'trip-v28-stop-circles',type:'circle',source:'trip-v28-stops',paint:{'circle-radius':10,'circle-color':['match',['get','category'],'fuel','#ffc94d','food','#e58bd1','lodging','#57c6ff','#b8f52e'],'circle-stroke-color':'#08110c','circle-stroke-width':2}});
      map.addLayer({id:'trip-v28-stop-labels',type:'symbol',source:'trip-v28-stops',layout:{'text-field':['get','sequenceLabel'],'text-size':8,'text-font':['Open Sans Bold','Arial Unicode MS Bold'],'text-allow-overlap':true},paint:{'text-color':'#10190c','text-halo-color':'#f3f8ed','text-halo-width':.4}});
      map.on('click','trip-v28-stop-circles',event=>{
        const feature=event.features?.[0];if(!feature)return;
        const props=feature.properties||{},url=googleMapsUrl({lat:props.lat,lon:props.lon});
        const popup='<div class="trip-v28-popup"><strong>'+esc(props.name)+'</strong><small>G'+(Number(props.dayIndex)+1)+' · '+esc(categoryLabel(props.category))+' · '+Number(props.alongKm||0).toFixed(0)+' km dalla partenza</small><a href="'+url+'" target="_blank" rel="noopener noreferrer">Apri in Google Maps ↗</a></div>';
        new lib.Popup({closeButton:true,closeOnClick:true,maxWidth:'250px'}).setLngLat(event.lngLat).setHTML(popup).addTo(map);
      });
      map.on('mouseenter','trip-v28-stop-circles',()=>{map.getCanvas().style.cursor='pointer'});
      map.on('mouseleave','trip-v28-stop-circles',()=>{map.getCanvas().style.cursor=''});
      setStatus(trip.id,'Calcolo della posizione delle soste lungo ogni percorso…');
      const dayData=await loadDayData(trip,token);
      if(token!==mapToken||!canvas.isConnected)return;
      activeMap.dayData=dayData;
      updateMapSources(map,dayData,'all',true);
      updateOrderPanel(trip.id,dayData,'all');
      const approximate=dayData.filter(item=>item.approximate&&item.points.length>1).length;
      setStatus(trip.id,approximate?'Mappa pronta. '+approximate+' tracciato/i mostrati in forma indicativa perché il routing stradale non ha risposto.':'Mappa pronta · le soste sono numerate nell’ordine del percorso.');
      map.resize();
      setTimeout(()=>{if(activeMap?.map===map&&map.isStyleLoaded())map.resize()},180);
    }catch(error){
      if(token!==mapToken)return;
      setStatus(trip.id,'Non riesco a caricare la mappa interattiva. Puoi comunque usare l’elenco delle soste e aprire ogni punto su Google Maps.');
      const order=document.querySelector('[data-v28-order-list="'+CSS.escape(String(trip.id))+'"]');
      if(order){
        const current=currentTrip(trip.id);
        const fallback=(current?.days||[]).flatMap((day,index)=>(day.stopSelections||[]).map((stop,n)=>({stop,day,index,n})));
        order.innerHTML=fallback.length?fallback.map(item=>'<article class="trip-v28-order-item"><span class="trip-v28-order-number">'+(item.index+1)+'.'+(item.n+1)+'</span><span class="trip-v28-order-copy"><strong>'+esc(item.stop.name)+'</strong><small>'+esc(categoryLabel(item.stop.category))+' · '+esc(formatDiaryDate(item.day.date))+'</small></span><span class="trip-v28-order-actions"><a href="'+googleMapsUrl(item.stop)+'" target="_blank" rel="noopener noreferrer">Apri Maps ↗</a></span></article>').join(''):'<div class="trip-v28-order-empty">Nessuna sosta selezionata.</div>';
      }
    }
  }
  function ensureMapPanel(){
    const modal=document.querySelector('#modal-root .modal');
    if(!modal)return;
    const tripId=modal.querySelector('[data-action="delete-trip"]')?.dataset.tripId;
    const trip=currentTrip(tripId);
    const summary=modal.querySelector('.trip-detail-summary');
    if(!trip||!summary)return;
    let panel=modal.querySelector('[data-v28-map-panel]');
    if(!panel){
      summary.insertAdjacentHTML('afterend',mapMarkup(trip));
      panel=modal.querySelector('[data-v28-map-panel]');
    }
    const content=modal.querySelector('[data-v26-trip-content]');
    if(panel&&content&&panel.nextElementSibling!==content)content.before(panel);
    if(!activeMap||String(activeMap.tripId)!==String(trip.id))initTripMap(trip);
  }
  function injectStyles(){
    if(document.getElementById('ride-v28-style'))return;
    const style=document.createElement('style');style.id='ride-v28-style';style.textContent=STYLE;document.head.appendChild(style);
  }
  function start(){
    injectStyles();
    ensureMapPanel();
    observer=new MutationObserver(()=>{
      const modal=document.querySelector('#modal-root .modal');
      if(!modal){if(activeMap)cleanupMap();return}
      ensureMapPanel();
    });
    observer.observe(document.body,{childList:true,subtree:true});
    document.addEventListener('click',event=>{
      const filter=event.target.closest('[data-v28-trip-map-filter]');
      if(filter){setFilter(filter.dataset.tripId,filter.dataset.v28TripMapFilter);return}
      const add=event.target.closest('[data-v26-add-stop]');
      if(add){const id=add.dataset.v26AddStop;setTimeout(()=>refreshMapFromState(id),0);return}
      const remove=event.target.closest('[data-v26-remove-stop]');
      if(remove){const id=remove.dataset.v26RemoveStop;setTimeout(()=>refreshMapFromState(id),0);return}
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
