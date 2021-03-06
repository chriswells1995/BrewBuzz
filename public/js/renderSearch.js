$(document).ready(function () {
  // on load======================================================
  $("#brewery-title").empty();
  $("#headerName").empty();
  $("#brewery-rating").empty();
  $("#brewery-logo").empty();
  $("#addReviewDiv").empty();
  $("#reviewButton").hide();
  $("#OpenBreweries").empty();
  var path = window.location.pathname;
  var input = path.split("/")[2];

  // need to remove words brewery, brewpub, company, brewing
  if (input.includes("%20")) {
    input = input.replace(/%20/g, " ");
  }

  if (input.includes("brewery")) {
    input = input.replace(/brewery/, "").trim();
  }

  if (input.includes("brewpub")) {
    input = input.replace(/brewpub/g, "").trim();
  }

  if (input.includes("company")) {
    input = input.replace(/company/g, "").trim();
  }

  if (input.includes("brewing")) {
    input = input.replace(/brewing/g, "").trim();
  }

  $("#searchInput").val("");
  console.log("search input");
  console.log(input);
  $.ajax({
    url: "/api/breweries",
    method: "GET",
    crossDomain: true,
  })
    .then(function (response) {
      console.log(response);
      // var AllBreweryObjects = response.filter(brewery => (brewery.name.includes(input) || brewery.address.includes(input) ))
      var AllBreweryObjects = [];

      for (i = 0; i < response.length; i++) {
        if (response[i].tags.toLowerCase().includes(input.toLowerCase())) {
          console.log(true);
          AllBreweryObjects.push(response[i]);
        }
      }

      console.log("render ", AllBreweryObjects);
      renderCards(AllBreweryObjects);
      input = "";
    })
    .catch(function (error) {
      console.log(error);
    });

  setTimeout(function renderCards() {
    $(".loader-wrapper").hide();
    $("#OpenBreweries").fadeIn("slow");
  }, 1000);

  // render cards ======================================================================================
  function renderCards(AllBreweryObjects) {
    $("#OpenBreweries").empty();
    // $("#OpenBreweries").hide();

    var AddBreweryButton;
    var existinglogo;
    var renderedBreweryName;
    var renderedBreweryWebsite;
    var renderedBreweryPhone;
    var matchCheck;
    var directionsLink;
    var directions;
    var directionsName;

    console.log("AllBreweryObjects.length", AllBreweryObjects.length);
    console.log("all brewery objects stuff ", AllBreweryObjects);

    if (AllBreweryObjects.length === 0) {
      $(".searchContainer").hide();
      $(".loader-wrapper").hide();
    } else {
      for (i = 0; i < AllBreweryObjects.length; i++) {
        //stageLocation(AllBreweryObjects[i].latitude, AllBreweryObjects[i].longitude)

        var streetAddress =
          AllBreweryObjects[i].street +
          " " +
          AllBreweryObjects[i].city +
          " " +
          AllBreweryObjects[i].state;

        var cardDiv = $("<li>")
          .addClass("col-sm-12 row")
          .attr("id", "cardNumber" + i);

        var logoLink = $(
          "<a href=/brewery/" + AllBreweryObjects[i].id + " style=margin:5px;>"
        ).addClass("row");

        renderedBreweryName = $("<h4>")
          .text(AllBreweryObjects[i].name + streetAddress)
          .attr("value", i)
          .addClass("card-body headerFont headerSpacing");

        renderedBreweryName.html(
          "<a href = /brewery/" +
            AllBreweryObjects[i].id +
            " class=row text-center id=headerName style=color:black;>" +
            AllBreweryObjects[i].name +
            "<br>" +
            streetAddress +
            "</a>"
        );
        // //renderedDistance = $("<h4>")
        // .text(
        //   'howdy'
        // )
        // .attr("value", i)
        // .addClass("card-body headerFont");

        // //renderedDistance.html(
        //   "<p>" +
        //     "lat " + AllBreweryObjects[i].latitude +
        //     "lon " +
        //     AllBreweryObjects[i].longitude +
        //     "</p>"
        // );

        renderedBreweryPhone = $("<div>")
          .attr("id", "callButton")
          .addClass("column")
          .html(
            "<a href=" +
              "tel:" +
              AllBreweryObjects[i].phoneNumber +
              ">" +
              "<img class=redirectButton src=" +
              `../stylesheets/assets/Phone.png` +
              ">" +
              "</a>"
          );

        renderedBreweryWebsite = $("<div>")
          .attr("id", "websiteButton")
          .addClass("column")
          .html(
            "<a href=" +
              AllBreweryObjects[i].website +
              " + target=_blank" +
              ">" +
              "<img class=redirectButton src=" +
              `../stylesheets/assets/webicon.png` +
              ">" +
              "</a>"
          );

        directionName = AllBreweryObjects[i].name.replace(/,/g, "%2C");
        directionName = directionName.replace(/ /g, "+");
        directions = streetAddress.replace(/,/g, "%2C");
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
              `../stylesheets/assets/directionicon.png` +
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
              `../stylesheets/assets/shareicon.png` +
              ">" +
              "</button>" +
              "</a>"
          );

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
          //renderedDistance,
          shareLink
        );

        if (AllBreweryObjects[i].logo) {
          existinglogo = $("<img>")
            .addClass("logo column")
            .attr("src", AllBreweryObjects[i].logo);
          renderedBreweryName.before(logoLink);
        }
        if (AllBreweryObjects[i].totalRating) {
          var avgStars = $("<p>")
            .addClass("starability-result starFeedCentering")
            .attr(
              "data-rating",
              Math.round(parseInt(AllBreweryObjects[i].totalRating) * 2) / 2
            );
          renderedBreweryName.prepend(avgStars);
        }

        AddReviewButton.attr("href", "/brewery/" + AllBreweryObjects[i].id);

        cardDiv.append(AddReviewButton);
        logoLink.append(existinglogo);
        $("#OpenBreweries").append(cardDiv);
      }
    }
  }
});
