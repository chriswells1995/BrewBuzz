
// global variables
var path = window.location.pathname;
var thisBreweryId = path.split("/")[2];

// This function takes in a brewery name and renders it to the page
function cardHearder(brewery) {
  var cardBrewery = $("<h4>")
    .addClass("card-header")
    .html(
      "<h1 id=headerName style=color:black;>" + brewery + "</h1>"
    )
  $("#brewery-title").empty();

  $("#brewery-title").append(cardBrewery);

}

// this function takes in the review properties and renders a review to the page
function buildCard(review_id, brewery, email, review) {
  var cardDiv = $("<li>")
    .addClass("col-sm-12")
    .attr("id", "review" + review_id);

  // var cardBrewery = $("<h4>")
  //   .addClass("card-header")
  //   // .text("Brewery: " + brewery) // this will display the brewery
  //   .html(
  //     "<h1 id=headerName style=color:black;>" + brewery + "</h1>"
  //   )

  var cardUser = $("<div style=font-size:125%;>")
    .attr("id", "cardBack")
    .addClass("card-body")
    .text("User: " + email); // this will display the user

  var cardReview = $("<div style=font-size:125%;>")
    .attr("id", "cardBack")
    .addClass("card-body")
    .text("Review: " + review); // this will display the review

  // var deleteBtn = $("<div>")
  //   .attr("id", "cardBack")
  //   .html(
  //     "<button type=button class=btn btn-outline-secondary id=deleteBtn>Delete</button>"
  //   )
  //   .addClass("card-body");

  cardDiv.append( cardUser, cardReview);
  // cardDiv.append(cardBrewery, cardUser, cardReview, deleteBtn); if we decide to use deleteBtn

  // $("#brewery-title").empty();

  // $("#brewery-title").append(cardBrewery);
  $("#OpenBreweries").prepend(cardDiv);

}


// event listener for review input

$("#reviewButton").on("click", function () {
  event.preventDefault();

  var reviewInput = $("#reviewInput").val();

  console.log(reviewInput)

  // make ajax get for user ID

  var userSettings = {
    "url": "/api/user_data",
    "method": "GET",
    "timeout": 0
  };

  $.ajax(userSettings).then(function (response) {
    console.log("user")
    console.log(response)

    if (response.id) {
      console.log("it works")
      console.log(response.id);
      var currentUserId = response.id;

      var postSettings = {
        "url": "/api/review",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },

        "data": {
          "review": reviewInput,
          "UserId": currentUserId,
          "BreweryId": thisBreweryId
        }
      };

      $.ajax(postSettings).then(function (response) {
        console.log(response);

        $("#OpenBreweries").empty();

        renderTheseReviews();
      });


    }
    else {
      // TODO: something more fancy than an alert maybe
      alert("You need to sign in to post a review")
    }
  });


})




function renderTheseReviews() {


  // ajax call to get brewery name

  var brewereyNameSettings = {
    "url": "/api/brewery/" + thisBreweryId,
    "method": "GET",
    "timeout": 0
  };

  $.ajax(brewereyNameSettings).then(function (breweryResponse) {
    console.log(breweryResponse[0].name);

    breweryName = breweryResponse[0].name;

    cardHearder(breweryName);

    // ajax call to get all reviews for this brewey
    var settings = {
      "url": "/api/brewery/reviews/" + thisBreweryId,
      "method": "GET",
      "timeout": 0

    };

    $.ajax(settings).then(function (response) {
      console.log(response);

      for (i = 0; i < response.length; i++) {
        buildCard(response[i].id, response[i].Brewery.name, response[i].User.email, response[i].review)
      }
    });


  });




}

$("#OpenBreweries").empty();
renderTheseReviews();