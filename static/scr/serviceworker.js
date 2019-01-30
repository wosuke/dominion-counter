const CACHE_NAME = 'dominion-counter';
let urlsToCache = [
  '/',
  '/static/css/common.css',
  '/static/css/reset.min.css',
  '/static/scr/common.js',
  '/static/scr/manifest.json',
  '/static/scr/serviceworker.js',
];

// インストール処理
self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(urlsToCache);
    })
  );
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event){
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response ? response : fetch(event.request);
    })
  );
});