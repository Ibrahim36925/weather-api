
const staticDevCoffee = "Weather App";
const assets = ["/", "/index.html", "/Weather.js", "/img/clouds.png"];

self.addEventListener('install',async e =>{
  const cache = await caches.open(staticDevCoffee);
  await cache.addAll(assets);
  return self.skipWaiting();
});

self.addEventListener('activate',e =>{
  self.clients.claim();
});

self.addEventListener('fetch', async e => {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(staticDevCoffee);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(staticDevCoffee);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}