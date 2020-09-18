
$("#submitBreweryFlag").on("click", function(){

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
    "note": flagBreweryNote
  }
};

$.ajax(settingsFlag).then(function (response) {
  console.log(response);
});

})

