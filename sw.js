var staticCacheName = 'restaurant-cache-v1';

var filesToCache = [
    '/',
    'js/main.js', 
    'js/dbhelper.js',
    'js/restaurant_info',
    'css/styles.css', 
    'images/1-309_medium_2x.jpg', 
    'images/1-800_large_2x.jpg',
    'images/2-309_medium_2x.jpg',
    'images/2-800_large_2x.jpg',
    'images/3-309_medium_2x.jpg',
    'images/3-800_large_2x.jpg',
    'images/4-309_medium_2x.jpg',
    'images/4-800_large_2x.jpg',
    'images/5-309_medium_2x.jpg',
    'images/5-800_large_2x.jpg',
    'images/6-309_medium_2x.jpg',
    'images/6-800_large_2x.jpg',
    'images/7-309_medium_2x.jpg',
    'images/7-800_large_2x.jpg',
    'images/8-309_medium_2x.jpg',
    'images/8-800_large_2x.jpg',
    'images/9-309_medium_2x.jpg',
    'images/9-800_large_2x.jpg',
    'images/10-309_medium_2x.jpg',
    'images/10-800_large_2x.jpg',
    'data/restaurants.json',
    'restaurant.html',
    'index.html',
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyBpl2KDyqIaOiBU-E11ZjwMrH-rHgJNujg&libraries=places&callback=initMap'
  ];


  self.addEventListener('install', function(event) {
    console.log('Attempting to install service worker and cache static assets');
    event.waitUntil(
      caches.open(staticCacheName)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(filesToCache);
      })
    );
  });

 
self.addEventListener('fetch', function(event) {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.open('restaurant-cache-v1').then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});


  self.addEventListener('activate', function(event) {
    console.log('Activating new service worker...');

    var cacheWhitelist = [staticCacheName];

    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
