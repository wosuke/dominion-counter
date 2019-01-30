const CACHE_NAME = 'dominion-counter';
let urlsToCache = [
  '/dominion-counter/',
  '/dominion-counter/static/css/common.css',
  '/dominion-counter/static/css/reset.min.css',
  '/dominion-counter/static/scr/common.js',
  '/dominion-counter/static/scr/manifest.json',
  '/dominion-counter/static/scr/serviceworker.js',
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