$("#submitNewBrewery").on("click", function () {
  event.preventDefault();
  // make ajax get for user ID
  var userSettings = {
    url: "/api/user_data",
    method: "GET",
    timeout: 0,
  };

  $.ajax(userSettings).then(function (response) {
    if (response.id) {
      var name = document.getElementById("breweryName").value;
      var website = document.getElementById("breweryWebsite").value;
      var street = document.getElementById("breweryStreet").value;
      var city = document.getElementById("breweryCity").value;
      var state = document.getElementById("breweryState").value;
      var zip = document.getElementById("breweryZip").value;
      var phone = document.getElementById("breweryPhone").value;
      // ajax call to post to breweryflags
      var settingsFlag = {
        url: "/api/addbrewery",
        method: "POST",
        timeout: 0,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          name: name,
          website: website,
          street: street,
          city: city,
          state: state,
          zip: zip,
          phone: phone,
        },
      };

      $.ajax(settingsFlag).then(function (response) {
        console.log("POST");
        console.log(settingsFlag);
        console.log(response);
      });
    } else {
      // TODO: something more fancy than an alert maybe
      alert("Please sign in to suggest a brewery.");
    }
  });
  // $(".formBackground").empty();
  $(".formBackground").fadeOut("slow");
  $(".searchContainer").hide();
  $(".cheersContainer").fadeIn(800);
});
