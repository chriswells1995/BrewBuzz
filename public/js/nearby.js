$(document).ready(function() {

let userLat;
let userLon;
// let brewLat;
// let brewLng;
let userDistance;

$('#coord').on('click', function(){
    console.log('click');
    getNearbyLocation()
})


//function checks if location is enabled and calls other function 
function getNearbyLocation() {
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
    if(userLat && userLon == null){
        console.log('nope!')
    }
    else{
        console.log('else lat : ',userLat)
    var settings = {
        "url": "/api/nearby",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json",
          //"Cookie": "connect.sid=s%3AoIEFqz5QWyD5pX39dqY7H57QfjklWlUe.aDnK3c4jUP6G6rU0r0O%2F7P9KTQ278bd8WmsN54sM0zU"
        },
        "data": {
          "userLat": userLat,
          "userLon": userLon
        }
      };
      
      $.ajax(settings).then(function (response) {
        console.log(response);
      });
    }
}


 //getNearbyLocation();
});
