const CACHE_NAME = "uyo-cache-v1";

self.addEventListener("install", async (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // We’re only caching the homepage for now
      return cache.addAll(["/", "/offline"]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  const request = e.request;
  // Only handle GET requests
  if (request.method !== "GET") return;
  e.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(request)
        .then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // Network request failed.
          // Show /offline.tsx
          return caches.match("/offline");
        });
    })
  );
});
