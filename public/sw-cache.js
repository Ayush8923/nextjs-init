const CACHE_NAME = "uyo-cache-v1";

self.addEventListener("install", async (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // We’re only caching the homepage & offline for now
      return cache.addAll(["/", "/offline"]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  const request = e.request;
  // Only handle GET requests
  if (request.method !== "GET") return;
  e.respondWith(
    fetch(request)
      .then(async (networkResponse) => {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, networkResponse.clone());
        return networkResponse;
      })
      .catch(async () => {
        // Network request failed.
        const cachedResponse = await caches.match(request);
        return cachedResponse || caches.match("/offline");
      })
  );
});
