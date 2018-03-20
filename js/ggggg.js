 
    var staticCacheName = 'restaurant-static-v1';
    
    self.addEventListener('install', function (event) {
      var requestUrl = new URL(event.request.url);
    
      if ((requestUrl.origin == location, origin)) {
        if (requestUrl.pathname === '/') {
          event.respondWith(caches.match('/'));
          return;
        }
      }
      event.waitUntil(caches.open(staticCacheName).then(function(cache) {
        console.log('Opened cache');

        return cache.addAll([
            '/', 
            '/js/main.js', 
            '/css/styles.css', 
            '/images', 
            '/data/',
            '/js/',
            '/restaurant.html',
            '/index.html'
            ]);
      }));
    });
    
    self.addEventListener('activate', function (event) {
      event.waitUntil(caches.keys().then(function (cacheNames) {
        return Promise.all(cacheNames.filter(function (cacheName) {
          return cacheName.startsWith('restaurant-') && cacheName != staticCacheName;
        }).map(function (cacheName) {
          return caches['delete'](cacheName);
        }));
      }));
    });

    self.addEventListener('fetch', function(event) {
        event.respondWith(
          caches.match(event.request)
            .then(function(response) {
              // Cache hit - return response
              if (response) {
                return response;
              }
      
              var fetchRequest = event.request.clone();
      
              return fetch(fetchRequest).then(
                function(response) {
                  // Check if we received a valid response
                  if(!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                  }
      
                  var responseToCache = response.clone();
      
                  caches.open(CACHE_NAME)
                    .then(function(cache) {
                      cache.put(event.request, responseToCache);
                    });
      
                  return response;
                }
              );
            })
          );
      });
      
    self.addEventListener('message', function (event) {
      if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
      }
    });
    
    