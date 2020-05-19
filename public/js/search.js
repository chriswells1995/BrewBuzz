$(document).ready(function () {


  // event listener that goes off when the search button is clicked. The input in the search bar is sent to the Open Brewery DB API. Then renderCards() is called
  $("#searchButton").on("click", function () {
    event.preventDefault();
    $("#brewery-title").empty();
    $("#addReviewDiv").empty();

    $("#OpenBreweries").empty();
    var input = $("#searchInput").val();
    $("#searchInput").val("");
    var inputURL =
      "https://api.openbrewerydb.org/breweries/search?query=" + input;

    $.ajax({
      url: inputURL,
      method: "GET",
      crossDomain: true
    }).then(function (response) {
     
      var BreweryObject = {};
      var AllBreweryObjects = [];
      for (i = 0; i < response.length; i++) {
        BreweryObject = {
          breweryName: response[i].name,
          breweryAddress:
            response[i].street +
            ", " +
            response[i].city +
            ", " +
            response[i].state,
          breweryWebsite: response[i].website_url,
        };
        AllBreweryObjects.push(BreweryObject);
      }
      renderCards(AllBreweryObjects);
    });
  });


  function renderCards(AllBreweryObjects) {
    $("#OpenBreweries").empty();
    var AddBreweryButton;
    var renderedBreweryName;
    var renderedBreweryAddress;
    var renderedBreweryWebsite;
    var matchCheck;
                                // This makes the ajax call to OUR breweries API to GET all of out breweries.
                                // TODO: This looks weird because I wanted to put this ajax call in a seperate function, 
                                // but for some reason I struggled with passing the resonse out of it. 
                                // Would still like to re-structure, so it's seperate from the rest right now.
                                var settings = {
                                  "url": "/api/breweries/",
                                  "method": "GET",
                                  "timeout": 0,
                                  "headers": {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                  }
                                };
      
                              $.ajax(settings).then(function (response) {

                                return response;
                                // TODO: Again, I would like to restructure. The only way I could get this to work was putting the rest of the function in 
                                // one big .then callback.
                              }).then(function(allOurBreweries){

    // This for loop will go through each brewery returned by the third party API, and render them to the page along with a button
    for (i = 0; i < AllBreweryObjects.length; i++) {
      if (AllBreweryObjects[i].breweryName!==null  &&  AllBreweryObjects[i].breweryWebsite!==null && AllBreweryObjects[i].breweryAddress[0]!==","){

        matchCheck=false;
        var cardDiv = $("<li>")
          .addClass("col-sm-12")
          .attr("id", "cardNumber " + i);
  
        renderedBreweryName = $("<h2>")
          .text(AllBreweryObjects[i].breweryName)
          .attr("value", i)
          .addClass("card-body headerFont");
          // .html(
          //   "<a href = brewery.html id=headerName style=color:black;>" +
          //     AllBreweryObjects[i].breweryName +
          //     "</a>"
          // );

        renderedBreweryWebsite = $("<div style=font-size:125%;>")
          .attr("id", "cardBack")
          .addClass("card-body userBackground")
          .html("<a href=" + AllBreweryObjects[i].breweryWebsite + ">" + "Visit Site" + "</a>");
  
        renderedBreweryAddress = $("<div style=font-size:125%;>")
          .attr("id", "cardBack")
          .addClass("card-body userBackground")
          .text(AllBreweryObjects[i].breweryAddress);
  
        AddBreweryButton = $("<button>")
          .attr("value", i)
          .text("Write their first review!")
          .addClass("addBtn btn btn-dark")
          // .attr("href", "brewery.html");
  
          // AddReviewButton = $("<button>")
          // // .attr("value", i)
          // .text("Write a review!")
          // .addClass("reviewBtn btn btn-outline-dark")
          // .html("<a href=brewery.html></a>");
  
            AddReviewButton = $("<a>")
          .attr("value", i)
          .text("Write a review!")
          .addClass("reviewBtn btn btn-dark")
          // .attr("href", "brewery.html");
  
        cardDiv.append(
          renderedBreweryName,
          renderedBreweryWebsite,
          renderedBreweryAddress
        );
  
  
              // TODO: There's a better way to do this using filter, I'm sure
  
        // currently using a nested for loop to check the properties of EVERY brewery in OUR databse,
        // to see if they match the properties of ANY brewery returned from the search function.
        // if there is a match, the AddReviewButton and Brewery Name will get an a href that takes the user to the correct brewery page
        // if there is not a match, the Brewery Name will have the .addBtn class, so it may function the same as the AddBreweryBtn
        for (j=0; j<allOurBreweries.length; j++){
  
          if (allOurBreweries[j].name===AllBreweryObjects[i].breweryName  
            && allOurBreweries[j].website===AllBreweryObjects[i].breweryWebsite  
            && allOurBreweries[j].streetAddress===AllBreweryObjects[i].breweryAddress){
  
              matchCheck=true;
              // take ID from allOurBreweries[j].id and give the AddReviewButton that value
              AddReviewButton.attr("href", "/brewery/"+allOurBreweries[j].id)
              renderedBreweryName.html(
                "<a href = /brewery/"+allOurBreweries[j].id+ " id=headerName style=color:black;>" +
                  AllBreweryObjects[i].breweryName +
                  "</a>")
  
            }
        }
  
        // This IF statment will append an "AddReview" or "AddBrewery" button, if the given rewery is or is not in our databse, respectively.
        if (matchCheck){
  
  
        cardDiv.append(
          AddReviewButton
        );
        }
        else{
  
  
        // renderedBreweryName.addClass("addBtn btn")
                            
  
        cardDiv.append(
          AddBreweryButton
        );
        }
        $("#OpenBreweries").append(cardDiv);


      }


    }
    assignClick(AllBreweryObjects);
                          // end of Ajax.then
                              })
    // end of function
  }

  function assignClick(AllBreweryObjects) {
    $(".addBtn").on("click", function (event) {
      event.preventDefault();
      console.log("event");
      console.log(event.target.value)
      var settings = {
        url: "/api/brewery",
        method: "POST",
        timeout: 0,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          name: AllBreweryObjects[event.target.value].breweryName,
          website: AllBreweryObjects[event.target.value].breweryWebsite,
          streetAddress: AllBreweryObjects[event.target.value].breweryAddress,
        },
      };

      $.ajax(settings).then(function (response) {
        console.log("response is: ")
        console.log(response)


        // ajax call to get this brewery id
        var settings2 = {
          "url": "/api/breweries/",
          "method": "GET",
          "timeout": 0,
          "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
          }

        };
        
        $.ajax(settings2).then(function (ourBreweryDB) {
          console.log(ourBreweryDB.length);
          var newestID =ourBreweryDB.length;
          console.log(newestID);

        window.location.href = "/brewery/"+ newestID;

        });

        // allOurBreweries[j].id

        // return response;
      });
    });
        // TODO: Add event listener that makes ajax call to Reviews API, using this BreweryId
        // TODO: Render returned reviews from that ajax call to brewery.html
  }
});

