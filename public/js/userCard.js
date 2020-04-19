var path =  window.location.pathname;
var currentUserId =path.split("/")[2];

// console.log(thisUserId);

function displayUserCards() {
  var settings = {
    url: "/api/user/" + currentUserId,
    method: "GET",
    timeout: 0,
  };
  $.ajax(settings).then(function (response) {
    var responseData = response;
    console.log(response);
    userCardsHeader(response[0].email)
    
      var email = responseData[0].email;
      // var review = responseData[i].review;
      // var brewery = responseData[i].Brewery.name;
      // var breweryId = responseData[i].Brewery.id;
      userCards(email)
  });

  function userCardsHeader (email) {
    var cardDiv = $("<li>")
    .addClass("col-sm-12")
    .attr("id", "review");

    cardDiv.append("Welcome back " + email + "," + "\n" + "let's see what you have to say:")
    $("#userEmail").prepend(cardDiv)
    .addClass("text-center");
  }

  function userCards(breweryId, brewery, review) {
    var cardDiv = $("<h4>")
    .addClass("col-sm-12");   
    var cardBrewery = $("<h5>")
      .addClass("card-body headerFont")
      .text("Brewery: " + brewery) // this will display the brewery
      .html(
        "<a id=headerName style=color:black; href = /brewery/" + breweryId + ">" + brewery+ "</a>"
      )

    var cardReview = $("<div>")
      .attr("id", "cardBack")
      .addClass("card-body userBackground")
      .text("You said: " + review); // this will display the review

    var deleteBtn = $("<button>")
      .attr("id", "cardBack")
      .text("Delete")
      .addClass("reviewBtn deleteBtn btn btn-dark")

    cardDiv.append(cardBrewery, cardReview, deleteBtn);

    // $("#user-title").append(cardBrewery) -- will add in a welcome whoever part here

    $("#OpenBreweries").prepend(cardDiv);
  }
  // event listener for delete will go here

  // $("#deleteBtn").on("click", function(){
  //   event.preventDefault();

  //   var reviewInput = $("#reviewInput").val();

  //   console.log(reviewInput)

  function renderTheseReviews(){  
    // ajax call to get all reviews for this brewey
    var settings = {
        "url": "/api/user/reviews/" + currentUserId,
        "method": "GET",
        "timeout": 0
      };
      
      $.ajax(settings).then(function (response) {   
        console.log("ajax response")
        console.log(response)
        for (i=0; i<response.length; i++){
              userCards(response[i].Brewery.id, response[i].Brewery.name, response[i].review)
        }    
      });
  }

  $("#OpenBreweries").empty();
  renderTheseReviews();
}

function userCheck(){
    var userSettings = {
      "url": "/api/user_data",
      "method": "GET",
      "timeout": 0
    };
 
    $.ajax(userSettings).then(function (response) {
      var currentUserId=response.id;
      if (currentUserId){
            displayUserCards()
        } else {
            var img = document.createElement("img");
            img.src = "https://st2.depositphotos.com/2274151/5435/i/950/depositphotos_54356977-stock-photo-missing-red-grungy-stamp-on.jpg"
            var src = document.getElementById("OpenBreweries");
            src.appendChild(img);
        }
    })
}

// function displayUserCards() {
//     var settings = {
//       url: "api/user/:id",
//       method: "GET",
//       timeout: 0,
//     };
//     $.ajax(settings).then(function (response) {
//       var responseData = response;
//       for (let i = 0; i < 5; i++) {
//         var review_id = responseData[i].id;
//         var review = responseData[i].review;
//         var brewery = responseData[i].Brewery.name;
//         var breweryId = responseData[i].Brewery.id;
//         userCards(review_id, breweryId, brewery, review);
//       }
//     })
// }

userCheck();