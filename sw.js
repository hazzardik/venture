const CACHE='bizoniq-v12.3.2';
const ASSETS=['./','./index.html','./styles.css','./preferences.js','./content.js','./content-en.js','./simulations-v2.js','./app.js','./manifest.webmanifest','./manifest-en.webmanifest','./icon.svg','./pricing.html','./faq.html','./privacy.html','./verify.html','./certificate.html'];
const NETWORK_ONLY=['/admin.html','/admin.js','/billing-config.js'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.origin!==self.location.origin){e.respondWith(fetch(e.request));return}
  if(NETWORK_ONLY.some(p=>u.pathname.endsWith(p))){
    e.respondWith(fetch(e.request,{cache:'no-store'}));
    return;
  }
  e.respondWith(
    fetch(e.request).then(r=>{
      if(r.ok){
        const copy=r.clone();
        caches.open(CACHE).then(c=>c.put(e.request,copy));
      }
      return r;
    }).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html')))
  );
});