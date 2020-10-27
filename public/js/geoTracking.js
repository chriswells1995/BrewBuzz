const x = navigator.geolocation;
const iconSrc = (src = "../stylesheets/assets/icon-48x48.png");

x.getCurrentPosition(success, failure);

function success(position) {
  // fetch the coordinates
  var myLat = position.coords.latitude;
  var myLong = position.coords.longitude;

  var myLat2 = "44.9200";
  var myLong2 = "-93.2198";

  //   Google API ready Latitude and Longitude string
  var coords = new google.maps.LatLng(myLat, myLong);

  // TODO: Testing additional coordinates
  var coords2 = new google.maps.LatLng(myLat2, myLong2);

  // Setting up our Google Map
  var mapOptions = {
    zoom: 14,
    center: coords,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };

  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var marker = new google.maps.Marker({
    map: map,
    position: coords,
    icon: iconSrc,
  });

  var marker2 = new google.maps.Marker({
    map: map,
    position: coords2,
    icon: iconSrc,
  });
}

function failure() {
  $("#lat").html("<p>It didn't work, coordinates note available.</p>");
}
