
$("#submitBreweryFlag").on("click", function(){

    // make ajax get for user ID

    var userSettings = {
      url: "/api/user_data",
      method: "GET",
      timeout: 0,
    };
  
    $.ajax(userSettings).then(function (response) {
      console.log("user");
      console.log(response);
  
      if (response.id) {
        console.log("it works");
        console.log(response.id);
        var currentUserId = response.id;

var flagBreweryOption;
var flagBreweryNote;
var path = window.location.pathname;
var flaggedBreweryId= path.split("/")[2];

    for(i =1; i<5; i++){
        if (document.getElementById("flagOption" + i).checked){
            flagBreweryOption = i;
        }
    }

    console.log(flagBreweryOption)
    flagBreweryNote= document.getElementById("flagNote").value
    console.log(flagBreweryNote)
    console.log(flaggedBreweryId)

// ajax call to post to breweryflags  
var settingsFlag = {
  "url": "http://localhost:8080/api/flaggedbrewery",
  "method": "POST",
  "timeout": 0,
  "headers": {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  "data": {
    "BreweryId": flaggedBreweryId,
    "flagoptionsId": flagBreweryOption,
    "note": flagBreweryNote,
    "UserId": currentUserId
  }
};

$.ajax(settingsFlag).then(function (response) {
  console.log(response);
});


  

      } else {
        // TODO: something more fancy than an alert maybe
        alert("You need to sign in to flag a brewery");
      }
    });



})

