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
        breweryName: responseData[i].Brewery.name,
        breweryAddress: responseData[i].Brewery.streetAddress,
        breweryWebsite: responseData[i].Brewery.website,
        // breweryPhone: responseData[i].
        username: responseData[i].User.username,
        review_id: responseData[i].id,
        review: responseData[i].review,
        rating: responseData[i].rating
      };
      AllBreweryObjects.push(BreweryObject);
    }
    renderCards(AllBreweryObjects);
    console.log("allbrewery");
    console.log(AllBreweryObjects);
  });

  function renderCards(AllBreweryObjects) {
    $("#OpenBreweries").empty();
    var AddBreweryButton;
    var existinglogo;
    var renderedBreweryName;
    // var renderedBreweryAddress;
    var renderedBreweryWebsite;
    var renderedBreweryPhone;
    var directionsLink;
    var directions;
    var directionsName;
    // This makes the ajax call to OUR breweries API to GET all of out breweries.
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

        renderedBreweryName = $("<h4>")
          .text(
            AllBreweryObjects[i].breweryName +
              AllBreweryObjects[i].breweryAddress
          )
          .attr("value", i)
          .addClass("card-body headerFont");

        renderedReview = $("<p>")
          .text(
            AllBreweryObjects[i].review
          )
          .attr("id", "userReview" + i)
          .addClass("card-body reviewText");

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
              `https://image.flaticon.com/icons/svg/2301/2301129.svg` +
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
              "<img class=redirectButton src=" +
              `https://image.flaticon.com/icons/svg/3039/3039401.svg` +
              ">" +
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
          renderedReview,
          renderedBreweryPhone,
          renderedBreweryWebsite,
          directionsLink,
          shareLink
        );

        $("#OpenBreweries").append(cardDiv);
      }
    });
  }
}

displayCards();
