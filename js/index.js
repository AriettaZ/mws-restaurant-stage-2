var request = indexedDB.open('restaurant_reviews', 1)
request.onupgradeneeded = function(event) {
  var db = event.target.result;

  var objectStore = db.createObjectStore("restaurants", { keyPath: "name" });

  objectStore.createIndex("name", "name", { unique: true });
  objectStore.transaction.oncomplete = function(event) {
     // Store values in the newly created objectStore.
     fetch('http://localhost:1337/restaurants').then(function(response) {
       return response.json();
     }).then(function(json){
       console.log(json)
      var restaurantObjectStore = db.transaction("restaurants", "readwrite").objectStore("restaurants");
         json.forEach(function(restaurant) {
           restaurantObjectStore.add(restaurant);
      })
    })
   };
};
