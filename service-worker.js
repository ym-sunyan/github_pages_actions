self.addEventListener('fetch', event => {
  if (event.request.url.includes('output/data.json')) {
    event.respondWith(
      fetch(event.request).then(response => {
        return caches.open('dynamic-cache').then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      }).catch(() => {
        return caches.match(event.request);
      })
    );
  }
});
