const CACHE='ride-v28-interactive-trip-map-20261124';
const RELEASE='v28';
const FILES=[
  './',
  './index.html',
  './routes-catalog.js',
  './europe-routes.js',
  './ride-v26.js',
  './ride-v28.js',
  './manifest.webmanifest',
  './icon.svg',
  './assets/garda-road.webp',
  './assets/dolomites-road.webp',
  './assets/toscana-road.webp'
];

self.addEventListener('install',event=>{
  event.waitUntil(
    caches.open(CACHE)
      .then(cache=>cache.addAll(FILES))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('message',event=>{
  if(event.data?.type==='SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch',event=>{
  const request=event.request;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin||request.method!=='GET') return;

  // Always ask GitHub Pages for the newest HTML first. A release query string
  // avoids stale browser/CDN copies; the cached document remains the offline fallback.
  const isHtml=request.mode==='navigate'||url.pathname.endsWith('/index.html');
  if(isHtml){
    event.respondWith((async()=>{
      const freshUrl=new URL(request.url);
      freshUrl.searchParams.set('__ride_release',RELEASE);
      try{
        const response=await fetch(freshUrl.toString(),{cache:'no-store',credentials:'same-origin'});
        if(response.ok){
          const cache=await caches.open(CACHE);
          await cache.put(request,response.clone());
          return response;
        }
      }catch(error){}
      const cached=await caches.match(request);
      if(cached) return cached;
      const indexUrl=new URL('./index.html',self.registration.scope).toString();
      const indexFallback=await caches.match(indexUrl);
      return indexFallback||new Response('Offline',{status:503,statusText:'Offline'});
    })());
    return;
  }

  // Static assets remain cache-first for fast repeat visits and offline use.
  event.respondWith((async()=>{
    const cached=await caches.match(request);
    if(cached) return cached;
    try{
      const response=await fetch(request);
      if(response.ok){
        const cache=await caches.open(CACHE);
        await cache.put(request,response.clone());
      }
      return response;
    }catch(error){
      return new Response('Offline',{status:503,statusText:'Offline'});
    }
  })());
});
