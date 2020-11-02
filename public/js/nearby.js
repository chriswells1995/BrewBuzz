// geoTracking.js dependencies
const x = navigator.geolocation;
const iconSrc = (src = "../stylesheets/assets/icon-nobeer-48x48.png");
const beerIconSrc = (src = "../stylesheets/assets/beer_48x48.png");
var map;
$(document).ready(function () {
  let userLat;
  let userLon;
  //use to hold breweries to place on google map
  let coordArray = [];

  //function checks if location is enabled and calls other function
  function getNearbyLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      console.log("loc enabled");
    } else {
      console.log("Please enable location services");
    }
  }
  //gets user coordinates
  function showPosition(position) {
    userLat = position.coords.latitude;
    userLon = position.coords.longitude;
    console.log("user lat ", userLat, "  lon ", userLon);
    //call nearby route and pass in user loc
    if (userLat && userLon == null) {
      console.log("nope!");
    } else {
      console.log("else lat : ", userLat);
      var settings = {
        url: "/api/nearby",
        method: "GET",
        timeout: 0,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //"Cookie": "connect.sid=s%3AoIEFqz5QWyD5pX39dqY7H57QfjklWlUe.aDnK3c4jUP6G6rU0r0O%2F7P9KTQ278bd8WmsN54sM0zU"
        },
        data: {
          userLat: userLat,
          userLon: userLon,
        },
      };

      $.ajax(settings)
        .then(function (response) {
          for (i = 0; i < response[0].length; i++) {
            coordArray.push([
              response[0][i].id,
              response[0][i].name,
              response[0][i].latitude,
              response[0][i].longitude,
            ]);
            console.log("brewname : ", response[0][i].name);
          }
          // console.log(coordArray);
          //console.log('ajax response ',response);
        })
        .then(function () {
          makeManyMarkers();
        });
    }
  }

  // start geoTracking.js copy

  x.getCurrentPosition(success, failure);

  function success(position) {
    // fetch the coordinates
    var myLat = position.coords.latitude;
    var myLong = position.coords.longitude;

    // var myLat2 = "44.9200";
    // var myLong2 = "-93.2198";

    //   Google API ready Latitude and Longitude string
    var geoTracCoords = new google.maps.LatLng(myLat, myLong);

    // TODO: Testing additional coordinates
    // var coords2 = new google.maps.LatLng(myLat2, myLong2);

    // Setting up our Google Map
    var mapOptions = {
      zoom: 14,
      center: geoTracCoords,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
      map: map,
      position: geoTracCoords,
      icon: iconSrc,
    });

    console.log("nearby jazz ", coordArray);

    // var marker2 = new google.maps.Marker({
    //   map: map,
    //   position: coords2,
    //   icon: iconSrc,
    // });
    //makeManyMarkers(map);
  }

  function failure() {
    $("#lat").html("<p>It didn't work, coordinates note available.</p>");
  }

  // end geoTracking.js copy

  function makeManyMarkers() {
    var breweryMarkers = [];

    if (coordArray) {
      for (i = 0; i < coordArray.length; i++) {
        // console.log("newLatLon")
        // console.log(coordArray[i][2]," ", coordArray[i][3])
        var newBreweryMarker = new google.maps.Marker({
          map: map,
          position: new google.maps.LatLng(coordArray[i][2], coordArray[i][3]),
          icon: beerIconSrc,
          content: coordArray[i][1],
        });

        var infoWindow = new google.maps.InfoWindow({
          content: coordArray[i][1],
        });

        newBreweryMarker.addListener("click", function () {
          infoWindow.open(map, newBreweryMarker);
        });

        breweryMarkers.push(newBreweryMarker, infoWindow);
      }
    }
  }

  getNearbyLocation();
});
