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
        breweryAddress: responseData[i].Brewery.streetAddress,
        breweryWebsite: responseData[i].Brewery.website,
        breweryPhone: responseData[i].Brewery.phoneNumber,
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

          renderedLogo = $("<img>")
          .addClass("logo column")
          .attr("src", AllBreweryObjects[i].breweryLogo);

          // TODO: Make the image clickable with link to specific brewery.html page
          // code to do that below, need to figure out how to link to dynamic element
          // .html(
          //   "<a href = /brewery/" +
          //     AllBreweryObjects[i].breweryId +
          //   ">" +
          //   "</a>");

          renderedBreweryName = $("<h4>")
            .addClass("column")
            .html(
            "<a href = /brewery/" +
              AllBreweryObjects[i].breweryId +
              " class=row text-center id=headerName style=font-size:100%;>" +
              AllBreweryObjects[i].breweryName +
              "<br>" +
              AllBreweryObjects[i].breweryAddress +
              "</a>"
          );

        renderedReview = $("<p>")
          .text(
            AllBreweryObjects[i].username + " said: " +
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
              "<img class=redirectButton src=" +
              `stylesheets/assets/shareicon.png` +
              ">" +
              "</a>"
          );

        cardDiv.append(
          renderedLogo,
          renderedBreweryName,
          renderedBreweryPhone,
          renderedBreweryWebsite,
          directionsLink,
          // TODO: research how to get this up and running
          shareLink,
          renderedReview
        );

        $("#OpenBreweries").append(cardDiv);
      }
    });
  }
}

displayCards();
