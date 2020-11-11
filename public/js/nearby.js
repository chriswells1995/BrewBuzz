// geoTracking.js dependencies
const x = navigator.geolocation;
const iconSrc = (src = "../stylesheets/assets/icon-nobeer-48x48.png");
const beerIconSrc = (src = "../stylesheets/assets/beer_48x48.png");
var map;

function initMap() {} // now it IS a function and it is in global

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
        },
        data: {
          userLat: userLat,
          userLon: userLon,
        },
      };

      $.ajax(settings)
        .then(function (response) {
          console.log("coordArray details ", response);
          for (i = 0; i < response[0].length; i++) {
            coordArray.push([
              response[0][i].id,
              response[0][i].name,
              response[0][i].latitude,
              response[0][i].longitude,
            ]);
            // console.log("brewname : ", response[0][i].name);
          }
          // console.log(coordArray);
          //console.log('ajax response ',response);
        })
        .then(function () {
          makeManyMarkers();
        });
    }
  }

  x.getCurrentPosition(success, failure);

  function success(position) {
    // fetch the coordinates
    var myLat = position.coords.latitude;
    var myLong = position.coords.longitude;

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
  }

  function failure() {
    $("#map").html(
      "<div class=container><br><div class=row><div class=col-sm-12 row style=margin:25px;><h4> This page requires location access, please close your browser, return to this page, and click Allow.</h4></div></div></div>"
    );
  }

  // end geoTracking.js copy

  function addMarkerListener(newBreweryMarker, infoWindow) {
    newBreweryMarker.addListener("click", function () {
      infoWindow.open(map, this);
    });
  }

  function makeManyMarkers() {
    var breweryMarkers = [];

    if (coordArray) {
      for (i = 0; i < coordArray.length; i++) {
        var contentString =
          "<a href = /brewery/" +
          coordArray[i][0] +
          " class=column style=color:black !important width: 100%;>" +
          coordArray[i][1] +
          "<div>" +
          "<div> - More Info - </div>" +
          "</div>" +
          "</a>";
        // console.log("newLatLon")
        var infoWindow = new google.maps.InfoWindow({
          content: contentString,
        });

        // console.log(coordArray[i][2]," ", coordArray[i][3])
        var newBreweryMarker = new google.maps.Marker({
          map: map,
          position: new google.maps.LatLng(coordArray[i][2], coordArray[i][3]),
          icon: beerIconSrc,
          content: infoWindow,
          title: coordArray[i][1],
        });

        addMarkerListener(newBreweryMarker, infoWindow);

        breweryMarkers.push(newBreweryMarker, infoWindow);
      }
    }
  }

  getNearbyLocation();
});
