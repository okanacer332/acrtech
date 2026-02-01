const CACHE_NAME = 'acrtech-v1';
const STATIC_ASSETS = [
  '/',
  '/_next/static/css/_buildManifest.css',
  '/_next/static/chunks/main.js',
  '/_next/static/chunks/webpack.js',
  '/_next/static/chunks/framework.js',
  '/_next/static/chunks/pages/_app.js',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - network-first strategy for HTML, cache-first for static
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip external requests
  if (url.origin !== self.location.origin) return;
  
  // HTML pages - network first, fallback to cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clone);
          });
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }
  
  // Static assets - cache first, fallback to network
  if (
    url.pathname.startsWith('/_next/static') ||
    url.pathname.startsWith('/portfolio/optimized') ||
    /\.(js|css|woff2?|webp|avif|png|jpg|jpeg|svg)$/i.test(url.pathname)
  ) {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) return response;
        
        return fetch(request).then((fetchResponse) => {
          const clone = fetchResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clone);
          });
          return fetchResponse;
        });
      })
    );
    return;
  }
  
  // Default - network only
  event.respondWith(fetch(request));
});
