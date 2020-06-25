// global variables
var path = window.location.pathname;
var thisBreweryId = path.split("/")[2];

// This function takes in a brewery name and renders it to the page
function cardHeader(brewery) {
  var cardBrewery = $("<h4>")
    .addClass("card-body text-center headerBrewery")
    .html("<h1 id=headerName style=color:black;>" + brewery + "</h1>");
  $("#brewery-title").empty();

  $("#brewery-title").append(cardBrewery);
}

function cardRating(rating) {
  var breweryRating = $("<ul>")
    .addClass("card-body text-center breweryRating")
    .html("<li id=headerName style=color:black;>" + "Star Rating: " + rating + "</li>");

  $("#brewery-rating").append(breweryRating);
}

function cardNoRating() {
  var breweryRating = $("<ul>")
    .addClass("card-body text-center breweryRating")
    .html("<li id=headerName style=color:black;>" + "No Ratings Submitted" + "</li>");

  $("#brewery-rating").append(breweryRating);
}

// this function takes in the review properties and renders a review to the page
function buildCard(review_id, brewery, email, review, userID, username, rating) {
  var cardDiv = $("<li>")
    .addClass("col-sm-12 column")
    .attr("id", "review" + review_id);

  var cardUser = $("<div style=font-size:125%;>")
    .attr("id", "cardBack")
    .addClass("card-body headerFont");

  var cardReview = $("<div style=font-size:125%;>")
    .attr("id", "cardBack")
    .addClass("card-body userBackground")
    // .html("<a href = /user/"+ user_id+"></a>")
    .text(username + " said: " + review); // this will display the review

    var ratingText;
    if (rating == "0.0"){
      ratingText = "No rating given"
  }
  else{
    ratingText = rating + " stars out of 5"
  }
    var cardRating = $("<div style=font-size:125%;>")
  .attr("id", "cardBack")
  .addClass("card-body headerFont")
  .text(ratingText); // this will display the review

  // var newStars = $("<form>")
  // .html(
  //   "<fieldset class=starability-basic>"+
  //   "<legend>Basic star rating:</legend>"+
  //   "<input type=radio id=no-rate class=input-no-rate name=rating value=0 checked aria-label=No rating. />"+

  //   "<input type=radio id=rate1 name=rating value=1 />"+
  //   "<label for=rate1>1 star.</label>"+

  //   "<input type=radio id=rate2 name=rating value=2 />"+
  //   "<label for=rate2>2 stars.</label>"+

  //   "<input type=radio id=rate3 name=rating value=3 />"+
  //   "<label for=rate3>3 stars.</label>"+

  //   "<input type=radio id=rate4 name=rating value=4 />"+
  //   "<label for=rate4>4 stars.</label>"+

  //   "<input type=radio id=rate5 name=rating value=5 />"+
  //   "<label for=rate5>5 stars.</label>"+

  //   "<span class=starability-focus-ring></span>"+
  // "</fieldset>"
  
  // );

  var oldStars = $("<p>")
  .addClass("starability-result")
  .attr("data-rating", rating.split(".")[0])

 


  var profile = $("<a>")
    .attr("href", "/user/" + userID)
    .addClass("emailLinks")
    .text("See all of " + username + "'s reviews");

  cardDiv.append(cardUser, cardReview, cardRating, oldStars, profile);

  // $("#brewery-title").empty();

  // $("#brewery-title").append(cardBrewery);
  $("#OpenBreweries").prepend(cardDiv);
}

// event listener for review input

$("#reviewButton").on("click", function () {
  var reviewInput = $("#reviewInput").val();
  var ratingInput = $("#ratingInput").val();
  // var roundedRatingInput = Math.ceil(reviewInput)
  var starInput;
  console.log(document.getElementById("rate1").checked)
  console.log(document.getElementById("rate2").checked)
  console.log(document.getElementById("rate3").checked)
  console.log(document.getElementById("rate4").checked)
  console.log(document.getElementById("rate5").checked)

  if (document.getElementById("rate1").checked ){
    starInput=1;
  }
  else if ( document.getElementById("rate2").checked){
    starInput=2;
  }
  else if ( document.getElementById("rate3").checked){
    starInput=3;
  }
  else if ( document.getElementById("rate4").checked){
    starInput=4;
  }
  else if ( document.getElementById("rate5").checked){
    starInput=5;
  }
  else {
    starInput=null;
  }

  if (!starInput){
    event.preventDefault();
    alert("You need to enter a rating between 1 and 5")

    return;
  }


  $("#reviewInput").empty();
  $("#ratingInput").empty();

  // make ajax get for user ID

  var userSettings = {
    url: "/api/user_data",
    method: "GET",
    timeout: 0,
  };

  $.ajax(userSettings).then(function (response) {
    console.log("user");
    console.log(response);

    if (response.id) {
      console.log("it works");
      console.log(response.id);
      var currentUserId = response.id;

      var postSettings = {
        url: "/api/review",
        method: "POST",
        timeout: 0,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },

        data: {
          review: reviewInput,
          UserId: currentUserId,
          BreweryId: thisBreweryId,
          rating: starInput
        },
      };

      $.ajax(postSettings).then(function (response) {
        console.log(response);

        $("#OpenBreweries").empty();

        renderTheseReviews();
      });
    } else {
      // TODO: something more fancy than an alert maybe
      alert("You need to sign in to post a review");
    }
  });
});

function renderTheseReviews() {
  // ajax call to get brewery name

  var breweryNameSettings = {
    url: "/api/brewery/" + thisBreweryId,
    method: "GET",
    timeout: 0,
  };

  $.ajax(breweryNameSettings).then(function (breweryResponse) {
    console.log(breweryResponse[0].name);
    console.log(breweryResponse[0]);
    console.log(breweryResponse[0].totalRating);

    breweryName = breweryResponse[0].name;
    breweryLogo = breweryResponse[0].logo;
    breweryRating = breweryResponse[0].totalRating;

    cardHeader(breweryName);

    if (breweryRating == 0.0 || breweryRating===null) {
      cardNoRating()
    } else {
      cardRating(breweryRating);
    }


    if (breweryResponse[0].logo) {
      // TODO: Grab image from response and render it
      console.log("logo already existed in database")
      var logoImage = $("<img>")
        .attr("src", breweryLogo)
        .attr("id", "breweryLogo");
      $(".headerBrewery").append(logoImage);
    } else {
      console.log("logo did not already exist in databse")
      var q = breweryName.replace(/ /g, "+");
      q = q.replace(/&/g, "+");
      q = q.replace(/-/g, "+");
      // console.log("name", breweryName);
      // console.log("q");
      // console.log(q);
      var logoURL =
        "https://api.serpwow.com/live/search?api_key=B03F416BACF94C8C86F2123D183281B8&q=" +
        q +
        "+brewery+logo&search_type=images&num=1";
      console.log(logoURL);
      var settingsLogo = {
        url:
          "https://api.serpwow.com/live/search?api_key=B03F416BACF94C8C86F2123D183281B8&q=" +
          q +
          "+brewery+logo&search_type=images&num=1",
        method: "GET",
        timeout: 0,
      };
      // var logoSRC;
      $.ajax(settingsLogo).then(function (response) {
        console.log("logo response");
        console.log(response);
        console.log(response.image_results[0].image);

        var logoSRC = response.image_results[0].image;
        var imageNumber=0;
        console.log(response.image_results[imageNumber].brand)
        if (response.image_results[imageNumber].brand === "Facebook"){
           while(response.image_results[imageNumber].brand==="Facebook"){
             imageNumber++
             logoSRC = response.image_results[imageNumber].image;
             console.log(response.image_results[imageNumber].brand)


           }          
        }

        console.log(logoSRC)

        var logoImage = $("<img>")
          .attr("src", logoSRC)
          .attr("id", "breweryLogo");
        $(".headerBrewery").append(logoImage);

        //  TODO: Update brewery in DB by adding logoSRC
        return logoSRC;
      })
      .then(function(logoSRC){

        var putSettings = {
          "url": "/api/breweries",
          "method": "PUT",
          "timeout": 0,
          "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          "data": {
            "id": thisBreweryId,
            "logo": logoSRC
          }
        };
        
        $.ajax(putSettings).then(function (response) {
          console.log(response);
        });



      })
    }

    // ajax call to get all reviews for this brewery
    var settings = {
      url: "/api/brewery/reviews/" + thisBreweryId,
      method: "GET",
      timeout: 0,
    };

    $.ajax(settings).then(function (response) {

      for (i = 0; i < response.length; i++) {
        buildCard(
          response[i].id,
          response[i].Brewery.name,
          response[i].User.email,
          response[i].review,
          response[i].User.id,
          response[i].User.username,
          response[i].rating
        );
      }
    });
  });
}

$("#OpenBreweries").empty();
renderTheseReviews();
