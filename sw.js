const staticCacheName="static-v1",dynamicCacheName="dynamic-v1",staticAssets=["./","./index.html","./fonts/digital-7.ttf","./manifest.json","./css/style.css","./js/app.js","./img/favicon.png","./img/favicon-96.png","/pages/fallback.html"],limitCacheSize=(e,t)=>{caches.open(e).then(a=>{a.keys().then(s=>{s.length>t&&a.delete(s[0]).then(limitCacheSize(e,t))})})};self.addEventListener("install",e=>{e.waitUntil(caches.open("static-v1").then(e=>{e.addAll(staticAssets)}))}),self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(e=>Promise.all(e.filter(e=>"static-v1"!==e&&"dynamic-v1"!==e).map(e=>caches.delete(e)))))}),self.addEventListener("fetch",e=>{e.respondWith(caches.match(e.request).then(t=>t||fetch(e.request).then(t=>caches.open("dynamic-v1").then(a=>(a.put(e.request.url,t.clone()),limitCacheSize("dynamic-v1",10),t)))).catch(()=>{if(e.request.url.indexOf(".html")>-1)return caches.match("./pages/fallback.html")}))});