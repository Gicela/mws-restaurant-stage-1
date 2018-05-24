
self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('restaurantCache installing…');
  event.waitUntil(
    caches.open('restaurantCache').then(function(cache) {
      return cache.addAll(
        [
          '/',
          'js/main.js', 
          'js/dbhelper.js',
          'js/restaurant_info.js',
          'css/styles.css', 
          'images/1.jpg', 
          'images/1-309_medium_2x.jpg', 
          'images/1-800_large_2x.jpg',
          'images/2.jpg', 
          'images/2-309_medium_2x.jpg',
          'images/2-800_large_2x.jpg',
          'images/3.jpg', 
          'images/3-309_medium_2x.jpg',
          'images/3-800_large_2x.jpg',
          'images/4.jpg', 
          'images/4-309_medium_2x.jpg',
          'images/4-800_large_2x.jpg',
          'images/5.jpg', 
          'images/5-309_medium_2x.jpg',
          'images/5-800_large_2x.jpg',
          'images/6.jpg', 
          'images/6-309_medium_2x.jpg',
          'images/6-800_large_2x.jpg',
          'images/7.jpg', 
          'images/7-309_medium_2x.jpg',
          'images/7-800_large_2x.jpg',
          'images/8.jpg', 
          'images/8-309_medium_2x.jpg',
          'images/8-800_large_2x.jpg',
          'images/8.jpg', 
          'images/9-309_medium_2x.jpg',
          'images/9-800_large_2x.jpg',
          'images/9.jpg', 
          'images/10.jpg', 
          'images/10-309_medium_2x.jpg',
          'images/10-800_large_2x.jpg',
          'data/restaurants.json',
          'restaurant.html',
          'index.html'
        ]
      );
    })
  );
});


self.addEventListener('activate', event => {
  // delete any caches that aren't in expectedCaches
  // which will get rid of static-v1
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!expectedCaches.includes(key)) {
          return caches.delete(key);
        }
      })
    )).then(() => {
      console.log('restaurantCache now ready to handle fetches!');
    })
  );
});



self.addEventListener('fetch', function(event) {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.open('restaurantCache').then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});


