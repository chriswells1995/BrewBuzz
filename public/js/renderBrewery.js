
// global variables
var path = window.location.pathname;
var thisBreweryId = path.split("/")[2];

// This function takes in a brewery name and renders it to the page
function cardHearder(brewery) {
  var cardBrewery = $("<h4>")
    .addClass("card-body text-center headerBrewery")
    .html(
      "<h1 id=headerName style=color:black;>" + brewery + "</h1>"
    )
  $("#brewery-title").empty();

  $("#brewery-title").append(cardBrewery);

}

// this function takes in the review properties and renders a review to the page
function buildCard(review_id, brewery, email, review, userID, username) {
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
    .addClass("card-body headerFont")

  var cardReview = $("<div style=font-size:125%;>")
    .attr("id", "cardBack")
    .addClass("card-body userBackground")
    // .html("<a href = /user/"+ user_id+"></a>")
    .text(username + " said: " + review); // this will display the review

    var profile= $("<a>")
    .attr("href", "/user/"+userID)
    .addClass("emailLinks")
    .text("See all of "+username+"'s reviews")

  // var deleteBtn = $("<div>")
  //   .attr("id", "cardBack")
  //   .html(
  //     "<button type=button class=btn btn-outline-secondary id=deleteBtn>Delete</button>"
  //   )
  //   .addClass("card-body");

  cardDiv.append( cardUser, cardReview, profile);
  // cardDiv.append(cardBrewery, cardUser, cardReview, deleteBtn); if we decide to use deleteBtn

  // $("#brewery-title").empty();

  // $("#brewery-title").append(cardBrewery);
  $("#OpenBreweries").prepend(cardDiv);

}


// event listener for review input

$("#reviewButton").on("click", function () {
  event.preventDefault();

  var reviewInput = $("#reviewInput").val();

  $("#reviewInput").children('input').val('');

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
    breweryLogo = breweryResponse[0].logo;

    cardHearder(breweryName);

    if (breweryResponse[0].logo){
      // TODO: Grab image from response and render it
      var testImage = $("<img>")
      .attr("src", breweryLogo)
      .attr("id", "breweryLogo")
      $(".headerBrewery").append(testImage);

    }
    else{
     var q = breweryName.replace(/ /g, "+")
     q = breweryName.replace(/&/g, "+")
    console.log("name", breweryName)
    console.log("q")
    console.log(q)
      var logoURL = "https://api.serpwow.com/live/search?api_key=B03F416BACF94C8C86F2123D183281B8&q="+q+"+brewery+logo&search_type=images&num=1"
      console.log(logoURL)
    var settingsLogo = {
  "url": "https://api.serpwow.com/live/search?api_key=B03F416BACF94C8C86F2123D183281B8&q="+q+"+brewery+logo&search_type=images&num=1",
  "method": "GET",
  "timeout": 0,
};
var logoSRC;
$.ajax(settingsLogo).then(function (response) {
console.log("logo response")
console.log(response)
  console.log(response.image_results[0].image);
   logoSRC= response.image_results[0].image;
      // end

    var testImage = $("<img>")
   .attr("src", response.image_results[0].image)
   .attr("id", "breweryLogo")
   $(".headerBrewery").append(testImage);

  //  TODO: Update brewery in DB by adding logoSRC

})
  }

    // ajax call to get all reviews for this brewey
    var settings = {
        "url": "/api/brewery/reviews/" + thisBreweryId,
        "method": "GET",
        "timeout": 0
    
      };
      
      $.ajax(settings).then(function (response) {
        // console.log(response);
    
        for (i=0; i<response.length; i++){
              buildCard(response[i].id, response[i].Brewery.name, response[i].User.email, response[i].review, response[i].User.id, response[i].User.username )
        }    
      });
  })
}

$("#OpenBreweries").empty();
renderTheseReviews();