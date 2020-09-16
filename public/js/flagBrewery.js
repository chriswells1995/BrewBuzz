
$("#submitBreweryFlag").on("click", function(){

var flagBreweryOption;
var flagBreweryNote;
var path = window.location.pathname;
var flaggedBreweryId= path.split("/")[2];

    for(i =0; i<4; i++){
        if (document.getElementById("flagOption" + i).checked){
            flagBreweryOption = i;
        }
    }

    console.log(flagBreweryOption)
    flagBreweryNote= document.getElementById("flagNote").value
    console.log(flagBreweryNote)
    console.log(flaggedBreweryId)

// ajax call to post to breweryflags

})