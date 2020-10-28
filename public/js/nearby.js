let userLat;
let userLon;
// let brewLat;
// let brewLng;
let userDistance;


//function checks if location is enabled and calls other function 
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        console.log('loc enabled')
    } else {
        console.log('Please enable location services')
    }
}
//gets user coordinates
function showPosition(position) {
    userLat = position.coords.latitude
    userLon = position.coords.longitude
    console.log('user lat ',userLat, '  lon ', userLon)
    //call nearby route and pass in user loc
    var settings = {
        "url": "localhost:8080/api/nearby",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cookie": "connect.sid=s%3AoIEFqz5QWyD5pX39dqY7H57QfjklWlUe.aDnK3c4jUP6G6rU0r0O%2F7P9KTQ278bd8WmsN54sM0zU"
        },
        "data": {
          "userLat": userLat,
          "userLon": userLon
        }
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
}

// function stageLocation(brewLat, brewLng){
//     console.log('stage loc', ' lat ',brewLat, ' lon ', brewLng )
//     if(brewLat === ''){
//         console.log('no lat!!')
//     }
//     else{
//         distance(userLat,userLng, brewLat, brewLng,'M')
//     }
    
// }

// //equation to caculate distance between two sets of coordinates 
// function distance(lat1, lon1, lat2, lon2, unit) {
//     console.log('distance')
//     if ((lat1 == lat2) && (lon1 == lon2)) {
//         return 0;
//     }
//     else {
//         var radlat1 = Math.PI * lat1 / 180;
//         var radlat2 = Math.PI * lat2 / 180;
//         var theta = lon1 - lon2;
//         var radtheta = Math.PI * theta / 180;
//         var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
//         if (dist > 1) {
//             dist = 1;
//         }
//         dist = Math.acos(dist);
//         dist = dist * 180 / Math.PI;
//         dist = dist * 60 * 1.1515;
//         if (unit == "K") { dist = dist * 1.609344 }
//         if (unit == "N") { dist = dist * 0.8684 }
//         userDistance = dist;
//         console.log(userDistance, 'miles away')
//     }
// }

// getLocation();