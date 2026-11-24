/* RIDE V31 - Native raster map adapter. No Leaflet, MapLibre or WebGL dependency. */
(function(){
  'use strict';
  const TILE=256;
  const COLORS=['#b8f52e','#57c6ff','#e58bd1','#ffc94d','#b79aff','#61d5b5','#f08c72'];
  function pixel(lat,lon,z){
    const size=TILE*Math.pow(2,z),safe=Math.max(-85.05112878,Math.min(85.05112878,Number(lat)||0)),rad=safe*Math.PI/180;
    return{x:(Number(lon)+180)/360*size,y:(1-Math.log(Math.tan(rad)+1/Math.cos(rad))/Math.PI)/2*size};
  }
  function geographic(x,y,z){
    const size=TILE*Math.pow(2,z);
    return{lat:Math.atan(Math.sinh(Math.PI*(1-2*y/size)))*180/Math.PI,lon:x/size*360-180};
  }
  function safe(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
  function indexSafe(html){return safe(String(html||'').replace(/<[^>]+>/g,''))}
  function attr(html,name){
    const match=String(html||'').match(new RegExp(name+'="([^"]*)"'));
    return match?match[1]:'';
  }
  function fit(center,bounds,width,height,maxZoom){
    if(!bounds?.length)return{center,zoom:6};
    const pts=bounds.map(p=>pixel(p[0],p[1],0)),xs=pts.map(p=>p.x),ys=pts.map(p=>p.y);
    const minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
    const spanX=Math.max(1,maxX-minX),spanY=Math.max(1,maxY-minY);
    const ratio=Math.min(Math.max(1,width-70)/spanX,Math.max(1,height-70)/spanY);
    const zoom=Math.max(3,Math.min(maxZoom||14,Math.floor(Math.log2(Math.max(1,ratio)))));
    return{center:geographic((minX+maxX)/2,(minY+maxY)/2,0),zoom};
  }
  class NativeMap{
    constructor(canvas,options){
      this.canvas=canvas;this.center={lat:45.8,lon:10.8};this.zoom=6;this.layers=[];this.tile=null;this.removed=false;this.pending=false;this.listeners={};this.controller=new AbortController();
      canvas.style.position='relative';canvas.style.overflow='hidden';canvas.style.touchAction='none';
      if(options?.center)this.center={lat:options.center[1],lon:options.center[0]};
      if(options?.zoom)this.zoom=options.zoom;
      const signal=this.controller.signal;
      let drag=null;
      canvas.addEventListener('pointerdown',event=>{
        if(event.target.closest('.native-map-controls,.native-map-marker'))return;
        drag={id:event.pointerId,x:event.clientX,y:event.clientY,dx:0,dy:0};
        try{canvas.setPointerCapture(event.pointerId)}catch(error){}
      },{signal});
      canvas.addEventListener('pointermove',event=>{
        if(!drag||drag.id!==event.pointerId)return;
        drag.dx=event.clientX-drag.x;drag.dy=event.clientY-drag.y;
        const content=canvas.querySelector('.native-map-content');
        if(content)content.style.transform='translate('+drag.dx+'px,'+drag.dy+'px)';
      },{signal});
      const end=event=>{
        if(!drag||drag.id!==event.pointerId)return;
        const c=pixel(this.center.lat,this.center.lon,this.zoom);
        this.center=geographic(c.x-drag.dx,c.y-drag.dy,this.zoom);drag=null;this.render();
      };
      canvas.addEventListener('pointerup',end,{signal});
      canvas.addEventListener('pointercancel',end,{signal});
      canvas.addEventListener('wheel',event=>{
        event.preventDefault();this.zoom=Math.max(3,Math.min(18,this.zoom+(event.deltaY<0?1:-1)));this.render();
      },{passive:false,signal});
    }
    schedule(){if(this.pending||this.removed)return;this.pending=true;requestAnimationFrame(()=>{this.pending=false;this.render()})}
    addLayer(layer){this.layers.push(layer);this.schedule()}
    setView(center,zoom){this.center={lat:Number(center[0]),lon:Number(center[1])};this.zoom=Math.max(3,Math.min(18,Math.round(Number(zoom)||6)));this.schedule();return this}
    fitBounds(bounds,options){
      const width=this.canvas.clientWidth||320,height=this.canvas.clientHeight||270;
      this._fitBounds=bounds;
      const result=fit(this.center,bounds,width,height,options?.maxZoom||14);
      this.center=result.center;this.zoom=result.zoom;this.schedule();return this;
    }
    invalidateSize(){this.schedule();return this}
    on(name,callback){this.listeners[name]=this.listeners[name]||[];this.listeners[name].push(callback);return this}
    remove(){this.removed=true;this.controller.abort();this.canvas.innerHTML='';this.layers=[];this.tile=null}
    render(){
      if(this.removed||!this.canvas?.isConnected)return;
      const canvas=this.canvas,w=canvas.clientWidth||320,h=canvas.clientHeight||270,z=this.zoom;
      const center=pixel(this.center.lat,this.center.lon,z),left=center.x-w/2,top=center.y-h/2,count=Math.pow(2,z);
      const x0=Math.floor(left/TILE),x1=Math.floor((left+w)/TILE),y0=Math.floor(top/TILE),y1=Math.floor((top+h)/TILE);
      const tiles=[];
      if(this.tile){
        for(let ty=y0;ty<=y1;ty++){
          if(ty<0||ty>=count)continue;
          for(let tx=x0;tx<=x1;tx++){
            const x=((tx%count)+count)%count;
            const src=this.tile.url.replace('{s}','a').replace('{z}',z).replace('{x}',x).replace('{y}',ty);
            tiles.push('<img class="native-map-tile" draggable="false" alt="" src="'+src+'" style="left:'+(tx*TILE-left)+'px;top:'+(ty*TILE-top)+'px">');
          }
        }
      }
      const paths=[],markers=[];
      this.layers.forEach(layer=>{
        if(layer.kind==='polyline'){
          const pts=layer.points||[];if(pts.length<2)return;
          const stride=Math.max(1,Math.ceil(pts.length/1400));
          const coords=pts.filter((p,i)=>i%stride===0||i===pts.length-1).map(p=>{
            const q=pixel(p[0],p[1],z);let x=q.x-center.x;if(x>count*TILE/2)x-=count*TILE;if(x< -count*TILE/2)x+=count*TILE;
            return{x:w/2+x,y:h/2+q.y-center.y};
          });
          const d=coords.map((p,i)=>(i?'L':'M')+p.x.toFixed(1)+' '+p.y.toFixed(1)).join(' ');
          paths.push('<path d="'+d+'" fill="none" stroke="'+safe(layer.style.color||'#b8f52e')+'" stroke-width="'+Math.max(3,Number(layer.style.weight)||4)+'" stroke-opacity="'+(layer.style.opacity??.9)+'" '+(layer.style.dashArray?'stroke-dasharray="'+safe(layer.style.dashArray)+'" ':'')+'stroke-linecap="round" stroke-linejoin="round"/>');
        }else if(layer.kind==='circle'){
          const p=pixel(layer.point[0],layer.point[1],z);let x=p.x-center.x;if(x>count*TILE/2)x-=count*TILE;if(x< -count*TILE/2)x+=count*TILE;
          const sx=w/2+x,sy=h/2+p.y-center.y;
          paths.push('<circle cx="'+sx+'" cy="'+sy+'" r="'+(Number(layer.style.radius)||7)+'" fill="'+safe(layer.style.fillColor||'#b8f52e')+'" fill-opacity="'+(layer.style.fillOpacity??1)+'" stroke="'+safe(layer.style.color||'#0b140d')+'" stroke-width="'+(Number(layer.style.weight)||2)+'"/>');
        }else if(layer.kind==='marker'){
          const p=pixel(layer.point[0],layer.point[1],z);let x=p.x-center.x;if(x>count*TILE/2)x-=count*TILE;if(x< -count*TILE/2)x+=count*TILE;
          const sx=w/2+x,sy=h/2+p.y-center.y,icon=layer.icon?.options||{},html=icon.html||'<span>•</span>';
          if(sx< -35||sx>w+35||sy< -35||sy>h+35)return;
          const attrs=['data-v30-place-card="1"','data-v30-day-id="'+safe(attr(layer.popup,'data-v30-day-id'))+'"','data-v30-category="'+safe(attr(layer.popup,'data-v30-category'))+'"','data-v30-poi-id="'+safe(attr(layer.popup,'data-v30-poi-id'))+'"'].join(' ');
          const fill=(String(html).match(/background:([^;\"]+)/)||[])[1]||'#b8f52e';
          markers.push('<button type="button" class="native-map-marker" aria-label="Apri scheda della sosta" '+attrs+' style="left:'+sx+'px;top:'+sy+'px;background:'+safe(fill)+'">'+indexSafe(html)+'</button>');
        }
      });
      const content='<div class="native-map-content"><div class="native-map-tiles">'+tiles.join('')+'</div><svg class="native-map-svg" viewBox="0 0 '+w+' '+h+'" preserveAspectRatio="none">'+paths.join('')+'</svg><div class="native-map-markers">'+markers.join('')+'</div></div>';
      const controls='<div class="native-map-controls"><button type="button" data-native-map-action="zoom-in" aria-label="Ingrandisci">+</button><button type="button" data-native-map-action="zoom-out" aria-label="Riduci">−</button><button type="button" data-native-map-action="fit" aria-label="Centra percorso">⌖</button></div><div class="native-map-attribution"><a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">© OpenStreetMap</a></div>';
      canvas.innerHTML=content+controls;
      canvas.querySelectorAll('.native-map-tile').forEach(img=>img.addEventListener('error',()=>{img.style.opacity='.12'},{once:true}));
      canvas.querySelectorAll('[data-native-map-action]').forEach(button=>button.addEventListener('click',event=>{
        event.stopPropagation();const action=button.dataset.nativeMapAction;
        if(action==='zoom-in')this.zoom=Math.min(18,this.zoom+1);
        else if(action==='zoom-out')this.zoom=Math.max(3,this.zoom-1);
        else if(action==='fit'&&this._fitBounds)this.fitBounds(this._fitBounds,{maxZoom:11});
        this.render();
      },{signal:this.controller.signal}));
    }
  }
  function LayerGroup(){this.items=[];this.map=null}
  LayerGroup.prototype.addTo=function(map){this.map=map;this.items.forEach(x=>map.addLayer(x));return this};
  LayerGroup.prototype.addLayer=function(item){this.items.push(item);if(this.map)this.map.addLayer(item);return this};
  LayerGroup.prototype.clearLayers=function(){this.items=[];if(this.map){this.map.layers=[];this.map.schedule()}return this};
  function shape(kind,points,style){return{kind,points,point:points,style:style||{},icon:null,popup:'',group:null,addTo(group){group.addLayer(this);return this},bindTooltip(){return this},bindPopup(html){this.popup=String(html||'');return this}}}
  const api={
    map:(canvas,options)=>new NativeMap(canvas,options),
    tileLayer:(url,options)=>({url,options,addTo(map){map.tile=this;map.schedule();return this}}),
    layerGroup:()=>new LayerGroup(),
    polyline:(points,style)=>shape('polyline',points,style),
    circleMarker:(point,style)=>shape('circle',[point],style),
    divIcon:options=>({options:options||{}}),
    marker:(point,options)=>{const item=shape('marker',[point],{});item.point=point;item.icon=options?.icon||null;return item}
  };
  if(!window.L)window.L=api;else window.L=api;
  if(!document.getElementById('ride-v31-native-map-style')){
    const style=document.createElement('style');style.id='ride-v31-native-map-style';style.textContent=`
      .trip-v30-map-canvas{position:relative;overflow:hidden;background:#e6e9e4;touch-action:none}
      .native-map-content{position:absolute;inset:0;will-change:transform}
      .native-map-tiles{position:absolute;inset:0;overflow:hidden;background:#e6e9e4}
      .native-map-tile{position:absolute;width:256px;height:256px;max-width:none;border:0;user-select:none;-webkit-user-drag:none}
      .native-map-svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none}
      .native-map-markers{position:absolute;inset:0;pointer-events:none}
      .native-map-marker{position:absolute;transform:translate(-50%,-50%);display:grid;place-items:center;width:29px;height:29px;padding:0;border:2px solid #09120c;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,.45);color:#10190c;font-size:10px;font-weight:950;pointer-events:auto}
      .native-map-controls{position:absolute;top:9px;right:9px;z-index:8;display:grid;gap:5px}
      .native-map-controls button{width:34px;height:34px;border:1px solid #bac4ba;border-radius:9px;background:rgba(255,255,255,.96);color:#17241b;font-size:17px;font-weight:900;box-shadow:0 2px 8px rgba(0,0,0,.18)}
      .native-map-attribution{position:absolute;right:5px;bottom:3px;z-index:8;padding:2px 5px;border-radius:4px;background:rgba(255,255,255,.88);color:#27352a;font-size:8px}
      .native-map-attribution a{color:#27352a}
    `;document.head.appendChild(style);
  }
  window.RIDE_NATIVE_MAP=true;
})();
