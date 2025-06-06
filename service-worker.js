const CACHE_NAME = 'nopmo-cache-v1';
const FILES_TO_CACHE = [
  '.',
  'index.html',
  'manifest.json',
  // tambahkan file icon dan lainnya jika ada
];

// Install SW dan cache file
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Ambil dari cache jika offline
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(resp => {
      return resp || fetch(evt.request);
    })
  );
});

// Bersihkan cache lama
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});
