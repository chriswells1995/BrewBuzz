// global variables
var path = window.location.pathname;
var thisBreweryId = path.split("/")[2];

// This function takes in a brewery name and renders it to the page
function cardHeader(brewery) {
  var cardBrewery = $("<div>")
    .addClass("card-body centeredBrewery headerBrewery")
    .html("<p id=headerName class=centeredBrewery style=color:black;>" + brewery + "</p>");

  $("#brewery-title").prepend(cardBrewery);
}

function cardRating(rating) {

  var avgStars = $("<p>")
  .addClass("starability-result")
  .attr("data-rating", Math.round(rating*2)/2 )

            var renderedBreweryPhone = $("<div>")
              .attr("id", "callButton")
              .addClass("column")
              .html(
                "<a href=" +
                  "tel:" +
                  breweryPhone +
                  ">" +
                  "<img class=redirectButton src=" +
                  `../stylesheets/assets/Phone.png` +
                  ">" +
                  "</a>"
              )

            var renderedBreweryWebsite = $("<div>")
              .attr("id", "websiteButton")
              .addClass("column")
              .html(
                "<a href=" +
                  breweryWebsite +
                  " + target=_blank" +
                  ">" +
                  "<img class=redirectButton src=" +
                  `../stylesheets/assets/webicon.png` +
                  ">" +
                  "</a>"
              );

            directionName = breweryName.replace(
              /,/g,
              "%2C"
            );
            directionName = directionName.replace(/ /g, "+");
            directions = breweryAddress.replace(
              /,/g,
              "%2C"
            );
            directions = directions.replace(/ /g, "+");
            directions =
              "https://www.google.com/maps/search/?api=1&query=" +
              directionName +
              directions;

            var directionsLink = $("<div>")
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

            var shareLink = $("<div>")
              .attr("id", "shareLink")
              .addClass("column")
              .html(
                "<a href=#" +
                  ">" +
                  "<button type=button class=btn btn-primary data-toggle=modal data-target=#shareModal>"+
                  "<img id=shareBtn class=redirectButton text-center src=" +
                  '../stylesheets/assets/shareicon.png' +
                  ">" +
                  "</button>"+
                  "</a>"
              );
  
  $("#brewery-rating").prepend(avgStars);
  $("#addReviewDiv").prepend(renderedBreweryPhone, renderedBreweryWebsite, directionsLink, shareLink);

}

function cardNoRating() {
  var breweryRating = $("<ul>")
    .addClass("centeredBrewery")
    .html("<li id=headerName style=color:black;>" + "No Ratings Submitted" + "</li>");

  $("#brewery-rating").append(breweryRating);
}

// this function takes in the review properties and renders a single review to the page
function buildCard(review_id, brewery, email, review, userID, username, rating) {
  var cardDiv = $("<li>")
    .addClass("col-sm-12 correctUlMargin")
    .attr("id", "review" + review_id);

  var cardReview = $("<div style=font-size:125%;>")
    .attr("id", "cardBack")
    .addClass("card-body centeredBrewery userBackground")
    // .html("<a href = /user/"+ user_id+"></a>")
    .text(username + " said: " + review); // this will display the review

  // This uses the stars CSS to create a <p> element which is actually the star image
  // It uses the rating value, which needs the ".0" removed to work
  var oldStars = $("<p>")
  .addClass("starability-result centeredBrewery")
  .attr("data-rating", rating.split(".")[0])
  .attr("id", "starBackground")

  var profile = $("<a>")
    .attr("href", "/user/" + userID)
    .addClass("emailLinks centeredBrewery")
    .text("See all of " + username + "'s reviews");

  cardDiv.append(cardReview, oldStars, profile);

  // $("#brewery-title").empty();

  // $("#brewery-title").append(cardBrewery);
  $("#OpenBreweries").prepend(cardDiv);
}

// event listener for review input (activated by clicking the "Add" button)
$("#reviewButton").on("click", function () {
  var reviewInput = $("#reviewInput").val();
  // var ratingInput = $("#ratingInput").val();
  // var roundedRatingInput = Math.ceil(reviewInput)

  // These "if" statements check what star rating the user gave, then set the starInput variable to that raitng
  // TODO: Make more DRY (maybe with for loop and "rate" + i.toString()?)
  var starInput;
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

  // If the star input is null, the user will get a message saying they need to select a star rating
  if (!starInput){
    event.preventDefault();
    alert("You need to enter a rating between 1 and 5")

    return;
  }

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

        $("#brewery-title").empty();
        $("#brewery-rating").empty();
        $("#brewery-logo").empty();
        $("#addReviewDiv").empty();
        $("#reviewButton").hide();
        $("#OpenBreweries").empty();
        // renderTheseReviews is re-ran to now include the newest review on the page
        renderTheseReviews();
      });
    } else {
      // TODO: something more fancy than an alert maybe
      alert("You need to sign in to post a review");
    }
  });
});
// This function iterates around the info and calls buildCard() multiple times to render ALL reviews
function renderTheseReviews() {
  // use breweryID to make ajax call to get this page's brewery's name, logo, and total rating

  var breweryNameSettings = {
    url: "/api/brewery/" + thisBreweryId,
    method: "GET",
    timeout: 0,
  };

  $.ajax(breweryNameSettings).then(function (breweryResponse) {
    breweryName = breweryResponse[0].name;
    breweryLogo = breweryResponse[0].logo;
    breweryPhone = breweryResponse[0].phoneNumber;
    breweryAddress = breweryResponse[0].street + breweryResponse[0].city + breweryResponse[0].state;
    breweryWebsite = breweryResponse[0].website;
    breweryRating = breweryResponse[0].totalRating;

    cardHeader(breweryName);

    if (breweryRating == 0.0 || breweryRating===null) {
      cardNoRating()
    } else {
      cardRating(breweryRating);
    }

    // if brewery doesn't already have a logo, make ajax call to serpwow to get a logo
    if (breweryResponse[0].logo) {
      //Grab image from response and render it
      console.log("logo already existed in database")

      var webLink = $("<a href=" + breweryWebsite + " + target_blank" + ">")
      .attr("id", "webLink")
      .addClass("centeredBrewery")
      $("#brewery-logo").append(webLink);

      var logoImage = $("<img>")
        .attr("src", breweryLogo)
        .attr("id", "breweryLogo");
      $("#webLink").append(logoImage);
    } else {
      console.log("logo did not already exist in database")
      var q = breweryName.replace(/ /g, "+");
      q = q.replace(/&/g, "+");
      q = q.replace(/-/g, "+");

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
        // Because there are issues taking images from facebook, and when logos have an http instead of https,
        // we use this while loop to check if the image is acceptable, and if not, we try the next one (100 possible images)
        // TODO: Find a way to bypass CORS so we can grab facebook images
        console.log(imageNumber)
        console.log(response.image_results[imageNumber].brand)
        console.log(response.image_results[imageNumber].image)
        if ((response.image_results[imageNumber].brand === "Facebook")
        || (!(response.image_results[imageNumber].image).includes("https"))){
           while((response.image_results[imageNumber].brand==="Facebook")
           ||(!(response.image_results[imageNumber].image).includes("https"))){
             console.log("THIS EITHER CAME FROM FACEBOOK or has HTTP")
             imageNumber++
             console.log(imageNumber)
             logoSRC = response.image_results[imageNumber].image;
             console.log(response.image_results[imageNumber].brand)
             console.log(response.image_results[imageNumber].image)


           }          
        }
        else{
          console.log("not facebook nor http")
        }

      //   if (!(response.image_results[imageNumber].image).includes("https")){
      //     while(!(response.image_results[imageNumber].image).includes("https")){
      //       console.log("THIS DOES NOT INCLUDE HTTPS")
      //       imageNumber++
      //       console.log(imageNumber)
      //        logoSRC = response.image_results[imageNumber].image;
      //       console.log(response.image_results[imageNumber].image)


      //     }          
      //  }
      //  else{
      //    console.log("includes https")
      //  }

        console.log(logoSRC)

        var logoImage = $("<img>")
          .attr("src", logoSRC)
          .attr("id", "breweryLogo");
        $("#brewery-logo").append(logoImage);

        //  Update brewery in DB by adding logoSRC with a PUT route
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

      // TODO: find the average of all the reviews,  
      
      var avgRating=0;
      var counter=0;
      for (i=0; i<response.length; i++){
        if (response[i].rating && parseInt(response[i].rating)>0 ){
          avgRating+=parseInt(response[i].rating);
          counter++;
        }
      }
      if(counter>0){
      avgRating=avgRating/counter;
      console.log(avgRating);
      }
      
      // TODO: Use a PUT route to update the brewery's rating
      var putSettings2 = {
        "url": "/api/breweries/rating",
        "method": "PUT",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "id": thisBreweryId,
          "totalRating": avgRating
        }
      };
      
      $.ajax(putSettings2).then(function (putResponse) {
        console.log("updating avg rating")
        console.log(putResponse);
      });

      // run buildCard() once for every review the brewery has
      for (i = 0; i < response.length; i++) {
        buildCard(
          response[i].id,
          response[i].Brewery.name,
          response[i].User.email,
          response[i].review,
          response[i].User.id,
          response[i].User.username,
          response[i].rating
          //avgRating
        );
      }
    });
  });
}

$("#OpenBreweries").empty();
renderTheseReviews();