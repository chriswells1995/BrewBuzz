$(document).ready(function () {
  // event listener that goes off when the search button is clicked. The input in the search bar is sent to the Open Brewery DB API. Then renderCards() is called
  $("#searchButton").on("click", function () {
    event.preventDefault();
    // TODO: One of these is also emptying the BrewBuzz logo, which we would like to stay
    $("#brewery-title").empty();
    $("#headerName").empty();
    $("#brewery-rating").empty();
    $("#brewery-logo").empty();
    $("#addReviewDiv").empty();
    $("#reviewButton").hide();
    $("#OpenBreweries").empty();
    $(".noResultsMessage").empty();
    var input = $("#searchInput").val();
    $("#searchInput").val("");
    var inputURL =
      "https://api.openbrewerydb.org/breweries/search?query=" + input;

    $.ajax({
      url: inputURL,
      method: "GET",
      crossDomain: true,
    }).then(function (response) {
      console.log(response)
      if (response.length ===0){
        console.log("There are no results");
        var noResults = $("<li>")
        .html("<h1>No Results Found</h1>")
        .addClass("noResultsMessage");
        $("#OpenBreweries").after(noResults);
      }
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
          breweryPhone: response[i].phone,
        };
        AllBreweryObjects.push(BreweryObject);
      }
      renderCards(AllBreweryObjects);
    }).catch(function (error){
      console.log(error)
    })
  });

  function renderCards(AllBreweryObjects) {
    $("#OpenBreweries").empty();
    var AddBreweryButton;
    var existinglogo;
    var renderedBreweryName;
    // var renderedBreweryAddress;
    var renderedBreweryWebsite;
    var renderedBreweryPhone;
    var matchCheck;
    var directionsLink;
    var directions;
    var directionsName;
    // This makes the ajax call to OUR breweries API to GET all of out breweries.
    // TODO: This looks weird because I wanted to put this ajax call in a seperate function,
    // but for some reason I struggled with passing the resonse out of it.
    // Would still like to re-structure, so it's seperate from the rest right now.
    var settings = {
      url: "/api/breweries/",
      method: "GET",
      timeout: 0,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    $.ajax(settings)
      .then(function (response) {
        return response;
        // TODO: Again, I would like to restructure. The only way I could get this to work was putting the rest of the function in
        // one big .then callback.
      })
      .then(function (allOurBreweries) {
        // This for loop will go through each brewery returned by the third party API, and render them to the page along with a button
        for (i = 0; i < AllBreweryObjects.length; i++) {
          if (
            AllBreweryObjects[i].breweryName !== null &&
            AllBreweryObjects[i].breweryWebsite !== null &&
            AllBreweryObjects[i].breweryAddress[0] !== ","
          ) {
            matchCheck = false;

            var cardDiv = $("<li>")
              .addClass("col-sm-12 row")
              .attr("id", "cardNumber" + i);

            renderedBreweryName = $("<h4>")
              .text(
                AllBreweryObjects[i].breweryName +
                  AllBreweryObjects[i].breweryAddress
              )
              .attr("value", i)
              .addClass("card-body headerFont");

            renderedBreweryPhone = $("<div>")
              .attr("id", "callButton")
              .addClass("column")
              .html(
                "<a href=" +
                  "tel:" +
                  AllBreweryObjects[i].breweryPhone +
                  ">" +
                  "<img class=redirectButton src=" +
                  `https://img.pngio.com/icono-simple-telefono-en-circulo-png-transparente-stickpng-icono-telefono-png-512_512.png` +
                  ">" +
                  "</a>"
              )

            renderedBreweryWebsite = $("<div>")
              .attr("id", "websiteButton")
              .addClass("column")
              .html(
                "<a href=" +
                  AllBreweryObjects[i].breweryWebsite +
                  " + target=_blank" +
                  ">" +
                  "<img class=redirectButton src=" +
                  `https://image.flaticon.com/icons/svg/2301/2301129.svg` +
                  ">" +
                  "</a>"
              );

            directionName = AllBreweryObjects[i].breweryName.replace(
              /,/g,
              "%2C"
            );
            directionName = directionName.replace(/ /g, "+");
            directions = AllBreweryObjects[i].breweryAddress.replace(
              /,/g,
              "%2C"
            );
            directions = directions.replace(/ /g, "+");
            directions =
              "https://www.google.com/maps/search/?api=1&query=" +
              directionName +
              directions;
            //   console.log("working")
            //  console.log(directions)

            directionsLink = $("<div>")
              .attr("id", "directionLink")
              .addClass("column")
              .html(
                "<a href=" +
                  directions +
                  ">" +
                  "<img class=redirectButton src=" +
                  `https://image.flaticon.com/icons/svg/2948/2948111.svg` +
                  ">" +
                  "</a>"
              );

            shareLink = $("<div>")
              .attr("id", "shareLink")
              .addClass("column")
              .html(
                "<a href=#" +
                  ">" +
                  "<button type=button class=btn btn-primary data-toggle=modal data-target=#exampleModal>"+
                  "<img id=shareBtn class=redirectButton src=" +
                  `https://image.flaticon.com/icons/svg/3039/3039401.svg` +
                  ">" +
                  "</button>"+
                  "</a>"
              );


            AddBreweryButton = $("<button>")
              .attr("value", i)
              .text("Write their first review!")
              .addClass("addBtn btn btn-dark");

            AddReviewButton = $("<a>")
              .attr("value", i)
              .text("Write a review!")
              .addClass("reviewBtn btn btn-dark");
            // .attr("href", "brewery.html");

            cardDiv.append(
              renderedBreweryName,
              renderedBreweryPhone,
              renderedBreweryWebsite,
              directionsLink,
              shareLink
            );

            // TODO: There's a better way to do this using filter, I'm sure

            // currently using a nested for loop to check the properties of EVERY brewery in OUR databse,
            // to see if they match the properties of ANY brewery returned from the search function.
            // if there is a match, the AddReviewButton and Brewery Name will get an a href that takes the user to the correct brewery page
            // if there is not a match, the Brewery Name will have the .addBtn class, so it may function the same as the AddBreweryBtn
            for (j = 0; j < allOurBreweries.length; j++) {
              if (
                allOurBreweries[j].name === AllBreweryObjects[i].breweryName &&
                allOurBreweries[j].website ===
                  AllBreweryObjects[i].breweryWebsite &&
                allOurBreweries[j].streetAddress ===
                  AllBreweryObjects[i].breweryAddress
              ) {
                matchCheck = true;
                // take ID from allOurBreweries[j].id and give the AddReviewButton that value
                AddReviewButton.attr(
                  "href",
                  "/brewery/" + allOurBreweries[j].id
                );
                renderedBreweryName.html(
                  "<a href = /brewery/" +
                    allOurBreweries[j].id +
                    " class=row text-center id=headerName style=color:black;>" +
                    AllBreweryObjects[i].breweryName +
                    "<br>" +
                    AllBreweryObjects[i].breweryAddress +
                    "</a>"
                );

                // TODO: This is where we append the brewery logo to the card. Move this to a better spot
                if (allOurBreweries[j].logo) {
                  existinglogo = $("<img>")
                    .addClass("logo column")
                    .attr("src", allOurBreweries[j].logo);
                  renderedBreweryName.before(existinglogo);
                }
                if (allOurBreweries[j].totalRating){
                  var avgStars = $("<p>")
                  .addClass("starability-result")
                  .attr("data-rating", Math.round(parseInt(allOurBreweries[j].totalRating)*2)/2 );
                  renderedBreweryName.prepend(avgStars);
                }
                console.log("brewery Rating")
                console.log(allOurBreweries[j].totalRating)
              }
            }

            // This IF statment will append an "AddReview" or "AddBrewery" button, if the given brewery is or is not in our databse, respectively.
            if (matchCheck) {
              cardDiv.append(AddReviewButton);
            } else {
              // renderedBreweryName.addClass("addBtn btn")

              cardDiv.append(AddBreweryButton);
            }
            $("#OpenBreweries").append(cardDiv);
          }
        }
        assignClick(AllBreweryObjects);
        // end of Ajax.then
      });
    // end of function
  }

  function assignClick(AllBreweryObjects) {
    $(".addBtn").on("click", function (event) {
      event.preventDefault();
      console.log("eventTarget")
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
          phoneNumber: AllBreweryObjects[event.target.value].breweryPhone,
          streetAddress: AllBreweryObjects[event.target.value].breweryAddress,
        },
      };

      $.ajax(settings).then(function (response) {
        console.log("response is: ");
        console.log(response);

        // ajax call to get this brewery id
        var settings2 = {
          url: "/api/breweries/",
          method: "GET",
          timeout: 0,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        };

        $.ajax(settings2).then(function (ourBreweryDB) {
          console.log(ourBreweryDB);
          //var newestID =ourBreweryDB.length;
          var newestID = ourBreweryDB[ourBreweryDB.length - 1].id;

          console.log(newestID);

          window.location.href = "/brewery/" + newestID;
        });

        // allOurBreweries[j].id

        // return response;
      });
    });
    // TODO: Add event listener that makes ajax call to Reviews API, using this BreweryId
    // TODO: Render returned reviews from that ajax call to brewery.html
  }
});
