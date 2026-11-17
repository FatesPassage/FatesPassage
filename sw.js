/* Fate's Passage service worker — v8 clean routing/performance build */
const CACHE_VERSION = 'fates-passage-v10';
const CACHE = CACHE_VERSION;
const CORE = [
  './', './index.html', './404.html',
  './studio-title.html', './studio-title.mp4', './character-creation.html', './character-creation-ending.mp4', './fates-passage.html', './character-sheet.html',
  './arkaedon-map.html', './melding-forge.html', './spell-tome.html', './manifest.webmanifest',
  './assets/music/Character sheet.m4a',
  './assets/music/Arcane Crafting Hall (Remix).m4a'
];
const CDN = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
const FONT_HOST = 'fonts.googleapis.com';
const CDN_HOST = 'cdnjs.cloudflare.com';

self.addEventListener('install', event => {
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    await Promise.all(CORE.map(u=>cache.add(new Request(u,{cache:'reload'})).catch(()=>{})));
    await cache.add(new Request(CDN,{mode:'cors'})).catch(()=>{});
    self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req=event.request;
  if(req.method!=='GET') return;
  const url=new URL(req.url);

  if(url.origin===location.origin){
    if(req.mode==='navigate'){
      event.respondWith((async()=>{
        try{
          const live=await fetch(req,{cache:'no-store'});
          const copy=live.clone();
          caches.open(CACHE).then(c=>c.put(req,copy)).catch(()=>{});
          return live;
        }catch(e){
          return (await caches.match(req)) || (await caches.match('./index.html')) || Response.error();
        }
      })());
      return;
    }

    event.respondWith((async()=>{
      const cached=await caches.match(req);
      const update=fetch(req).then(r=>{
        if(r&&r.ok)caches.open(CACHE).then(c=>c.put(req,r.clone())).catch(()=>{});
        return r;
      }).catch(()=>null);
      return cached || (await update) || Response.error();
    })());
    return;
  }

  if(url.hostname===CDN_HOST || url.hostname===FONT_HOST){
    event.respondWith((async()=>{
      const cached=await caches.match(req);
      if(cached) return cached;
      try{
        const r=await fetch(req);
        if(r&&r.ok)caches.open(CACHE).then(c=>c.put(req,r.clone())).catch(()=>{});
        return r;
      }catch(e){ return Response.error(); }
    })());
  }
});
