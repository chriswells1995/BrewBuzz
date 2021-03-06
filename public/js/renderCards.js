$(document).ready(function () {
  function displayCards() {
    var settings = {
      url: "api/reviews/",
      method: "GET",
      timeout: 0,
    };
    $.ajax(settings).then(function (response) {
      var responseData = response;
      var BreweryObject = {};
      var AllBreweryObjects = [];
      console.log(responseData);

      for (let i = responseData.length - 1; i >= 0; i--) {
        BreweryObject = {
          breweryId: responseData[i].Brewery.id,
          breweryLogo: responseData[i].Brewery.logo,
          breweryName: responseData[i].Brewery.name,
          breweryAddress:
            responseData[i].Brewery.street +
            " " +
            responseData[i].Brewery.city +
            " " +
            responseData[i].Brewery.state,
          breweryWebsite: responseData[i].Brewery.website,
          breweryPhone: responseData[i].Brewery.phoneNumber,
          username: responseData[i].User.username,
          user_id: responseData[i].User.id,
          review_id: responseData[i].id,
          review: responseData[i].review,
          rating: responseData[i].rating,
        };
        AllBreweryObjects.push(BreweryObject);
      }
      renderCards(AllBreweryObjects);
      console.log("allbrewery");
      console.log(AllBreweryObjects);
    });

    setTimeout(function displayCards() {
      $(".loader-wrapper").hide();
      $("#OpenBreweries").fadeIn("slow");
    }, 4000);

    function renderCards(AllBreweryObjects) {
      $("#OpenBreweries").empty();
      // This makes the ajax call to OUR breweries API to GET all of out breweries.

      // TODO: check if we need lines 38 through 47, delete if not needed.
      var settings = {
        url: "/api/breweries/",
        method: "GET",
        timeout: 0,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      $.ajax(settings).then(function () {
        // This for loop will go through each brewery returned by the third party API, and render them to the page along with a button
        for (i = 0; i < AllBreweryObjects.length; i++) {
          var cardDiv = $("<li>")
            .addClass("col-sm-12 row")
            .attr("id", "cardNumber" + i);

          var logoLink = $(
            "<a href=/brewery/" +
              AllBreweryObjects[i].breweryId +
              " style=margin:5px;>"
          ).addClass("row");

          var starDiv = $("<div>").addClass("starFeedCentering");

          var avgStars = $("<p>")
            .addClass("starability-result centeredBrewery row")
            .attr(
              "data-rating",
              Math.round(parseInt(AllBreweryObjects[i].rating) * 2) / 2
            );

          var reviewLink = $(
            "<a href=/user/" + AllBreweryObjects[i].user_id + ">"
          ).addClass("reviewLink");

          renderedLogo = $("<img>")
            .addClass("logo column")
            .attr("src", AllBreweryObjects[i].breweryLogo);

          renderedBreweryName = $("<h4>")
            .addClass("column centeredBreweryName")
            .html(
              "<a href = /brewery/" +
                AllBreweryObjects[i].breweryId +
                " class=row text-center id=headerName style=font-family:Rubik,sans-serif;>" +
                AllBreweryObjects[i].breweryName +
                "<br>" +
                AllBreweryObjects[i].breweryAddress +
                "</a>"
            );

          renderedReview = $(
            "<p " + "style=font-family:'Karla',sans-serif;" + ">"
          )
            .text(
              AllBreweryObjects[i].username +
                " said: " +
                AllBreweryObjects[i].review
            )
            .attr("id", "userReview" + i)
            .addClass("card-body reviewText centeredBrewery");

          renderedBreweryPhone = $("<div>")
            .attr("id", "callButton")
            .addClass("column")
            .html(
              "<a href=" +
                "tel:" +
                AllBreweryObjects[i].breweryPhone +
                ">" +
                "<img class=redirectButton src=" +
                `stylesheets/assets/Phone.png` +
                ">" +
                "</a>"
            );

          renderedBreweryWebsite = $("<div>")
            .attr("id", "websiteButton")
            .addClass("column")
            .html(
              "<a href=" +
                AllBreweryObjects[i].breweryWebsite +
                " + target=_blank" +
                ">" +
                "<img class=redirectButton src=" +
                `stylesheets/assets/webicon.png` +
                ">" +
                "</a>"
            );

          directionName = AllBreweryObjects[i].breweryName.replace(/,/g, "%2C");
          directionName = directionName.replace(/ /g, "+");
          directions = AllBreweryObjects[i].breweryAddress.replace(/,/g, "%2C");
          directions = directions.replace(/ /g, "+");
          directions =
            "https://www.google.com/maps/search/?api=1&query=" +
            directionName +
            directions;

          directionsLink = $("<div>")
            .attr("id", "directionLink")
            .addClass("column")
            .html(
              "<a href=" +
                directions +
                ">" +
                "<img class=redirectButton src=" +
                `stylesheets/assets/directionicon.png` +
                ">" +
                "</a>"
            );

          shareLink = $("<div>")
            .attr("id", "shareLink")
            .addClass("column")
            .html(
              "<a href=#" +
                ">" +
                "<button type=button class=btn btn-primary data-toggle=modal data-target=#exampleModal>" +
                "<img id=shareBtn class=redirectButton text-center src=" +
                `stylesheets/assets/shareicon.png` +
                ">" +
                "</button>" +
                "</a>"
            );

          starDiv.append(avgStars);

          cardDiv.append(
            logoLink,
            starDiv,
            renderedBreweryName,
            renderedBreweryPhone,
            renderedBreweryWebsite,
            directionsLink,
            // TODO: research how to get this up and running
            shareLink,
            reviewLink
          );

          logoLink.append(renderedLogo);

          reviewLink.append(renderedReview);

          $("#OpenBreweries").append(cardDiv);
        }
      });
    }
  }
  displayCards();
});
