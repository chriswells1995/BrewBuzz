$(document).ready(function () {
  var FullArray = [];
  $("#searchButton").on("click", function () {
    event.preventDefault();
    $("#OpenBreweries").empty();
    var input = $("#searchInput").val();
    var inputURL =
      "https://api.openbrewerydb.org/breweries/search?query=" + input;

    $.ajax({
      url: inputURL,
      method: "GET",
    }).then(function (response) {
      FullArray = response;
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
    for (i = 0; i < AllBreweryObjects.length; i++) {
      var cardDiv = $("<li>")
        .addClass("col-sm-12")
        .attr("id", "cardNumber " + i);

      renderedBreweryName = $("<h2>")
        .text(AllBreweryObjects[i].breweryName)
        .addClass("card-header")
        .html(
          "<a href = brewery.html id=headerName style=color:black;>" +
            AllBreweryObjects[i].breweryName +
            "</a>"
        );

      renderedBreweryAddress = $("<h3>")
        .attr("id", "cardBack")
        .addClass("card-body")
        .text("Address: " + AllBreweryObjects[i].breweryAddress);

      // TODO: Create an IF statement that checks if these breweries exist in our current database. If not, do this.
      AddBreweryButton = $("<button>")
        .attr("value", i)
        .text("Click here to write the first review!")
        .addClass("addBtn btn btn-outline-dark");

      cardDiv.append(
        renderedBreweryName,
        renderedBreweryAddress,
        AddBreweryButton
      );

      $("#OpenBreweries").append(cardDiv);
    }
    assignClick(AllBreweryObjects);
  }

  function assignClick(AllBreweryObjects) {
    $(".addBtn").on("click", function (event) {
      event.preventDefault();
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
        return response;
      });
    });
  }
});
