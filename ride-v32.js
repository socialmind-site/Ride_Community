/* RIDE V32 - Standalone native raster map. No Leaflet, MapLibre or WebGL. */
(function(){
  'use strict';
  const COLORS=['#b8f52e','#57c6ff','#e58bd1','#ffc94d','#b79aff','#61d5b5','#f08c72'];
  const TILE=256;
  let current=null,token=0,resizeTimer=0;

  function esc(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
  function n(value,fallback=0){const x=Number(value);return Number.isFinite(x)?x:fallback}
  function tripById(id){return(state.tripPlans||[]).find(t=>String(t.id)===String(id))||null}
  function categoryLabel(c){return c==='fuel'?'Distributore':c==='food'?'Ristorante / ristoro':c==='lodging'?'Pernottamento':'Sosta'}
  function categoryIcon(c){return c==='fuel'?'⛽':c==='food'?'🍽':c==='lodging'?'🛏':'⌖'}
  function categoryColor(c){return c==='fuel'?'#ffc94d':c==='food'?'#e58bd1':c==='lodging'?'#57c6ff':'#b8f52e'}
  function mapsUrl(p){return'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(n(p.lat).toFixed(6)+','+n(p.lon).toFixed(6))}
  function routePoints(route){
    if(!route)return[];
    const cached=typeof routeCache!=='undefined'?routeCache.get(route.id):null;
    if(cached?.latlngs?.length>1)return cached.latlngs.map(p=>[n(p[0]),n(p[1])]);
    return(route.stops||[]).map(p=>[n(p[1],NaN),n(p[2],NaN)]).filter(p=>Number.isFinite(p[0])&&Number.isFinite(p[1]));
  }
  function distance(a,b){
    const rad=Math.PI/180,lat1=n(a.lat)*rad,lat2=n(b.lat)*rad,dLat=(n(b.lat)-n(a.lat))*rad,dLon=(n(b.lon)-n(a.lon))*rad;
    const h=Math.sin(dLat/2)**2+Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLon/2)**2;
    return 6371*2*Math.atan2(Math.sqrt(h),Math.sqrt(Math.max(0,1-h)));
  }
  function along(point,points){
    let total=0,best=Infinity,bestAt=0,walk=0;
    for(let i=0;i<points.length-1;i++)total+=distance({lat:points[i][0],lon:points[i][1]},{lat:points[i+1][0],lon:points[i+1][1]});
    for(let i=0;i<points.length-1;i++){
      const a=points[i],b=points[i+1],cos=Math.cos(n(point.lat)*Math.PI/180),scale=111.32;
      const ax=(n(a[1])-n(point.lon))*cos*scale,ay=(n(a[0])-n(point.lat))*scale,bx=(n(b[1])-n(point.lon))*cos*scale,by=(n(b[0])-n(point.lat))*scale;
      const dx=bx-ax,dy=by-ay,den=dx*dx+dy*dy,t=den?Math.max(0,Math.min(1,-(ax*dx+ay*dy)/den)):0;
      const nearest={lat:n(a[0])+(n(b[0])-n(a[0]))*t,lon:n(a[1])+(n(b[1])-n(a[1]))*t},off=distance(point,nearest),seg=distance({lat:a[0],lon:a[1]},{lat:b[0],lon:b[1]});
      if(off<best){best=off;bestAt=walk+seg*t}walk+=seg;
    }
    return{alongKm:bestAt,offRouteKm:best};
  }
  function sortedStops(day,points){
    return(day.stopSelections||[]).filter(p=>Number.isFinite(Number(p.lat))&&Number.isFinite(Number(p.lon))).map(p=>({...p,category:p.category||'other',alongKm:along(p,points).alongKm})).sort((a,b)=>a.alongKm-b.alongKm);
  }
  function world(lat,lon,z){
    const size=TILE*Math.pow(2,z),safe=Math.max(-85.05112878,Math.min(85.05112878,n(lat))),rad=safe*Math.PI/180;
    return{x:(n(lon)+180)/360*size,y:(1-Math.log(Math.tan(rad)+1/Math.cos(rad))/Math.PI)/2*size};
  }
  function geo(x,y,z){
    const size=TILE*Math.pow(2,z);
    return{lat:Math.atan(Math.sinh(Math.PI*(1-2*y/size)))*180/Math.PI,lon:x/size*360-180};
  }
  function fitView(items,width,height){
    let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity,count=0;
    const add=(lat,lon)=>{const p=world(lat,lon,0);minX=Math.min(minX,p.x);maxX=Math.max(maxX,p.x);minY=Math.min(minY,p.y);maxY=Math.max(maxY,p.y);count++};
    items.forEach(item=>{item.points.forEach(p=>add(p[0],p[1]));item.stops.forEach(p=>add(p.lat,p.lon))});
    if(!count)return{center:{lat:45.8,lon:10.8},zoom:6};
    const spanX=Math.max(.00001,maxX-minX),spanY=Math.max(.00001,maxY-minY);
    const ratio=Math.min(Math.max(1,width-70)/spanX,Math.max(1,height-70)/spanY);
    const zoom=Math.max(4,Math.min(14,Math.floor(Math.log2(Math.max(1,ratio)))));
    return{center:geo((minX+maxX)/2,(minY+maxY)/2,0),zoom};
  }
  function pointOnScreen(point,view,width,height){
    const center=world(view.center.lat,view.center.lon,view.zoom),p=world(point[0],point[1],view.zoom),size=TILE*Math.pow(2,view.zoom);
    let x=p.x-center.x;if(x>size/2)x-=size;if(x< -size/2)x+=size;
    return{x:width/2+x,y:height/2+p.y-center.y};
  }
  function mapStatus(id,message){
    const el=document.querySelector('[data-v30-map-status="'+CSS.escape(String(id))+'"]');if(el)el.textContent=message;
  }
  function visibleDays(){
    if(!current)return[];
    return current.days.filter(item=>current.filter==='all'||String(item.day.id)===String(current.filter));
  }
  function orderMarkup(){
    const rows=[];
    visibleDays().forEach(item=>item.stops.forEach((stop,index)=>{
      rows.push('<article class="trip-v30-map-order-row"><span class="trip-v30-order-num">'+(item.dayIndex+1)+'.'+(index+1)+'</span><span class="trip-v30-order-copy"><strong>'+esc(stop.name)+'</strong><small>'+categoryIcon(stop.category)+' '+esc(categoryLabel(stop.category))+' · '+Math.round(stop.alongKm)+' km dalla partenza</small></span><span class="trip-v30-order-actions"><button type="button" data-v30-place-card="1" data-v30-day-id="'+esc(item.day.id)+'" data-v30-category="'+esc(stop.category)+'" data-v30-poi-id="'+esc(stop.id)+'">Scheda</button></span></article>');
    }));
    return rows.join('')||'<div class="trip-v30-map-empty">Nessuna sosta selezionata per questa visualizzazione.</div>';
  }
  function render(){
    if(!current||!current.canvas?.isConnected)return;
    const canvas=current.canvas,w=canvas.clientWidth||340,h=canvas.clientHeight||280,z=current.view.zoom,center=world(current.view.center.lat,current.view.center.lon,z),left=center.x-w/2,top=center.y-h/2,count=Math.pow(2,z);
    const minX=Math.floor(left/TILE),maxX=Math.floor((left+w)/TILE),minY=Math.floor(top/TILE),maxY=Math.floor((top+h)/TILE),tiles=[];
    for(let y=minY;y<=maxY;y++){
      if(y<0||y>=count)continue;
      for(let x=minX;x<=maxX;x++){
        const wrapped=((x%count)+count)%count;
        tiles.push('<img class="trip-v32-tile" draggable="false" alt="" src="https://tile.openstreetmap.org/'+z+'/'+wrapped+'/'+y+'.png" style="left:'+(x*TILE-left)+'px;top:'+(y*TILE-top)+'px">');
      }
    }
    const paths=[],markers=[],pointsForBounds=[];
    visibleDays().forEach(item=>{
      const color=COLORS[item.dayIndex%COLORS.length],pts=item.points||[];
      pts.forEach(p=>pointsForBounds.push([p[0],p[1]]));
      if(pts.length>1){
        const stride=Math.max(1,Math.ceil(pts.length/1000)),coords=pts.filter((p,i)=>i%stride===0||i===pts.length-1).map(p=>pointOnScreen(p,current.view,w,h));
        const d=coords.map((p,i)=>(i?'L':'M')+p.x.toFixed(1)+' '+p.y.toFixed(1)).join(' ');
        paths.push('<path d="'+d+'" fill="none" stroke="'+color+'" stroke-width="7" stroke-opacity=".18" stroke-linecap="round" stroke-linejoin="round"/><path d="'+d+'" fill="none" stroke="'+color+'" stroke-width="3.5" stroke-opacity="'+(item.approximate?'.7':'.98')+'" '+(item.approximate?'stroke-dasharray="7 5" ':'')+'stroke-linecap="round" stroke-linejoin="round"/>');
        const first=coords[0],last=coords[coords.length-1];
        paths.push('<circle cx="'+first.x+'" cy="'+first.y+'" r="6" fill="#b8f52e" stroke="#10190c" stroke-width="2"/><circle cx="'+last.x+'" cy="'+last.y+'" r="6" fill="#f07f72" stroke="#10190c" stroke-width="2"/>');
      }
      item.stops.forEach((stop,index)=>{
        const p=pointOnScreen([stop.lat,stop.lon],current.view,w,h);
        if(p.x< -30||p.x>w+30||p.y< -30||p.y>h+30)return;
        markers.push('<button type="button" class="trip-v32-marker" aria-label="Vedi scheda '+esc(stop.name)+'" data-v30-place-card="1" data-v30-day-id="'+esc(item.day.id)+'" data-v30-category="'+esc(stop.category)+'" data-v30-poi-id="'+esc(stop.id)+'" style="left:'+p.x+'px;top:'+p.y+'px;background:'+categoryColor(stop.category)+'">'+(index+1)+'</button>');
        pointsForBounds.push([stop.lat,stop.lon]);
      });
    });
    canvas.innerHTML='<div class="trip-v32-content"><div class="trip-v32-tiles">'+tiles.join('')+'</div><svg class="trip-v32-routes" viewBox="0 0 '+w+' '+h+'" preserveAspectRatio="none">'+paths.join('')+'</svg><div class="trip-v32-markers">'+markers.join('')+'</div></div><div class="trip-v32-controls"><button type="button" data-v32-zoom="in" aria-label="Ingrandisci">+</button><button type="button" data-v32-zoom="out" aria-label="Riduci">−</button><button type="button" data-v32-zoom="fit" aria-label="Centra percorso">⌖</button></div><div class="trip-v32-attribution"><a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">© OpenStreetMap</a></div>';
    const order=document.querySelector('[data-v30-map-order="'+CSS.escape(String(current.tripId))+'"]');if(order)order.innerHTML=orderMarkup();
    document.querySelectorAll('[data-v30-map-filter][data-trip-id="'+CSS.escape(String(current.tripId))+'"]').forEach(b=>b.classList.toggle('active',b.dataset.v30MapFilter===current.filter));
    canvas.querySelectorAll('.trip-v32-tile').forEach(img=>img.addEventListener('error',()=>{img.style.opacity='.15';mapStatus(current.tripId,'Tracciato e soste visibili; alcune immagini cartografiche non sono raggiungibili.')},{once:true}));
  }
  function fitCurrent(){
    if(!current)return;
    current.view=fitView(visibleDays(),current.canvas.clientWidth||340,current.canvas.clientHeight||280);
    render();
  }
  function refresh(){
    if(!current)return;
    const trip=tripById(current.tripId);if(!trip)return;
    const byId=new Map((trip.days||[]).map(d=>[String(d.id),d]));
    current.days=current.days.map(item=>{
      const day=byId.get(String(item.day.id))||item.day;
      return{...item,day,stops:sortedStops(day,item.points)};
    });
    render();
  }
  function loadRoads(tripId,runToken){
    const trip=tripById(tripId);if(!trip)return;
    const tasks=current.days.map(async item=>{
      if(!item.route||typeof getRoadGeometry!=='function')return;
      try{
        const geometry=await getRoadGeometry(item.route);
        if(!geometry?.latlngs?.length)return;
        if(runToken!==token||!current||String(current.tripId)!==String(tripId))return;
        item.points=geometry.latlngs.map(p=>[n(p[0]),n(p[1])]);
        item.approximate=false;
        item.stops=sortedStops(item.day,item.points);
        render();
      }catch(error){}
    });
    Promise.all(tasks).then(()=>{
      if(runToken===token&&current&&String(current.tripId)===String(tripId)){
        const approximate=current.days.filter(d=>d.approximate&&d.points.length>1).length;
        mapStatus(tripId,approximate?'Mappa pronta. '+approximate+' giornata/e mostrano il tracciato indicativo.':'Mappa pronta · tracciati stradali e soste caricati.');
      }
    });
  }
  function openTripMap(tripId){
    const trip=tripById(tripId);if(!trip)return;
    const wrap=document.querySelector('[data-v30-map-wrap="'+CSS.escape(String(tripId))+'"]'),canvas=document.getElementById('trip-v30-map-'+tripId),button=document.querySelector('[data-v30-open-map="'+CSS.escape(String(tripId))+'"]');
    if(!wrap||!canvas||!button)return;
    if(current&&String(current.tripId)===String(tripId)){
      wrap.hidden=!wrap.hidden;button.textContent=wrap.hidden?'⌖ Apri mappa del viaggio':'Nascondi mappa';
      if(!wrap.hidden)requestAnimationFrame(()=>{if(current?.canvas===canvas)render()});
      return;
    }
    token++;
    const runToken=token;
    current=null;
    wrap.hidden=false;button.textContent='Nascondi mappa';
    const days=[...(trip.days||[])].sort((a,b)=>String(a.date).localeCompare(String(b.date)));
    const initial=days.map((day,dayIndex)=>{
      const route=routes.find(r=>String(r.id)===String(day.routeId)),points=route?routePoints(route):[];
      return{day,dayIndex,route,points,approximate:true,stops:sortedStops(day,points)};
    });
    current={tripId,canvas,days:initial,filter:'all',view:{center:{lat:45.8,lon:10.8},zoom:6},drag:null};
    current.view=fitView(initial,canvas.clientWidth||340,canvas.clientHeight||280);
    render();
    mapStatus(tripId,'Mappa aperta. Aggiorno i tracciati stradali in background…');
    loadRoads(tripId,runToken);
  }
  function setFilter(tripId,filter){
    if(!current||String(current.tripId)!==String(tripId))return;
    current.filter=String(filter);
    fitCurrent();
  }
  function installCanvasEvents(){
    document.addEventListener('pointerdown',event=>{
      if(!current)return;
      const canvas=current.canvas;if(!canvas.contains(event.target)||event.target.closest('.trip-v32-controls,.trip-v32-marker'))return;
      current.drag={id:event.pointerId,x:event.clientX,y:event.clientY,dx:0,dy:0};
      try{canvas.setPointerCapture(event.pointerId)}catch(error){}
    });
    document.addEventListener('pointermove',event=>{
      if(!current?.drag||current.drag.id!==event.pointerId)return;
      current.drag.dx=event.clientX-current.drag.x;current.drag.dy=event.clientY-current.drag.y;
      const content=current.canvas.querySelector('.trip-v32-content');
      if(content)content.style.transform='translate('+current.drag.dx+'px,'+current.drag.dy+'px)';
    });
    const finish=event=>{
      if(!current?.drag||current.drag.id!==event.pointerId)return;
      const drag=current.drag,center=world(current.view.center.lat,current.view.center.lon,current.view.zoom);
      current.view.center=geo(center.x-drag.dx,center.y-drag.dy,current.view.zoom);
      current.drag=null;render();
    };
    document.addEventListener('pointerup',finish);
    document.addEventListener('pointercancel',finish);
    document.addEventListener('wheel',event=>{
      if(!current||!current.canvas.contains(event.target))return;
      event.preventDefault();current.view.zoom=Math.max(4,Math.min(18,current.view.zoom+(event.deltaY<0?1:-1)));render();
    },{passive:false});
    document.addEventListener('click',event=>{
      const zoom=event.target.closest('[data-v32-zoom]');if(!zoom||!current)return;
      event.preventDefault();event.stopImmediatePropagation();
      if(zoom.dataset.v32Zoom==='fit')fitCurrent();
      else{current.view.zoom=Math.max(4,Math.min(18,current.view.zoom+(zoom.dataset.v32Zoom==='in'?1:-1)));render()}
    },true);
    document.addEventListener('click',event=>{
      const add=event.target.closest('[data-v26-add-stop]');
      if(add){setTimeout(refresh,80);return}
      const remove=event.target.closest('[data-v26-remove-stop]');
      if(remove){setTimeout(refresh,80);return}
    });
    window.addEventListener('resize',()=>{
      clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{if(current)render()},120);
    });
  }
  function addStyles(){
    if(document.getElementById('ride-v32-style'))return;
    const style=document.createElement('style');style.id='ride-v32-style';style.textContent=`
      .trip-v30-map-canvas{position:relative;overflow:hidden;background:#e8ece7;touch-action:none;min-height:260px}
      .trip-v32-content{position:absolute;inset:0;will-change:transform}
      .trip-v32-tiles{position:absolute;inset:0;overflow:hidden;background:#e8ece7}
      .trip-v32-tile{position:absolute;width:256px;height:256px;max-width:none;border:0;user-select:none;-webkit-user-drag:none}
      .trip-v32-routes{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none}
      .trip-v32-markers{position:absolute;inset:0;pointer-events:none}
      .trip-v32-marker{position:absolute;transform:translate(-50%,-50%);width:30px;height:30px;padding:0;border:2px solid #09120c;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,.45);color:#10190c;font-size:10px;font-weight:950;pointer-events:auto}
      .trip-v32-controls{position:absolute;top:9px;right:9px;z-index:10;display:grid;gap:5px}
      .trip-v32-controls button{width:35px;height:35px;border:1px solid #bac4ba;border-radius:9px;background:rgba(255,255,255,.97);color:#17241b;font-size:18px;font-weight:900;box-shadow:0 2px 8px rgba(0,0,0,.18)}
      .trip-v32-attribution{position:absolute;right:5px;bottom:4px;z-index:10;padding:2px 5px;border-radius:4px;background:rgba(255,255,255,.9);color:#27352a;font-size:8px}
      .trip-v32-attribution a{color:#27352a}
    `;document.head.appendChild(style);
  }
  function start(){
    addStyles();installCanvasEvents();
    window.RIDE_V32={openTripMap,setFilter,refresh};
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
