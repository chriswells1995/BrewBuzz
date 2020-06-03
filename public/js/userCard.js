var path =  window.location.pathname;
var currentUserId =path.split("/")[2];

// console.log(currentUserId);

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
      return email;
  });

  function userCardsHeader (email) {
    var cardDiv = $("<li>")
    .addClass("col-sm-12")
    .attr("id", "review");

    // TODO: make more general
    cardDiv.append("You've been a busy bee:")
    $("#userEmail").empty()
    $("#userEmail").prepend(cardDiv)
    .addClass("text-center");
  }

  function userCards(breweryId, brewery, review, reviewId) {
    var cardDiv = $("<h4>")
    .addClass("col-sm-12")
    .attr("id", reviewId);

    var cardBrewery = $("<h5>")
      .addClass("card-body headerFont")
      .text("Brewery: " + brewery) // this will display the brewery
      .html(
        "<a id=headerName style=color:black; href = /brewery/" + breweryId + ">" + brewery+ "</a>"
      )

    var cardReview = $("<div>")
      .attr("id", "cardBack")
      .addClass("card-body userBackground")
      .text(review); // this will display the review

    // The delete function will be added back in after presentation. The look of the website took precedence over this function
    var deleteBtn = $("<button>")
      .attr("id", "deleteBtn")
      .text("Delete")
      .addClass("reviewBtn deleteBtn btn btn-dark")

    cardDiv.append(cardBrewery, cardReview, deleteBtn);

    // $("#user-title").append(cardBrewery) -- will add in a welcome whoever part here

    $("#OpenBreweries").prepend(cardDiv);

    $("#deleteBtn").on("click", function(){
      console.log("Delete Button Clicked")
      var deleteId = event.target.closest("h4").id;
      console.log("The delete id is: ")
      console.log(deleteId)
      $.ajax({
        method: "DELETE",
        url: "/api/reviews/" + deleteId
      }).then(displayUserCards);
      // TODO: fire off function for AJAX call to delete review from DB
    })
  }

  function renderTheseReviews(){  
    // ajax call to get all reviews for this brewery
    var settings = {
        "url": "/api/user/reviews/" + currentUserId,
        "method": "GET",
        "timeout": 0
      };
      
      $.ajax(settings).then(function (response) {   
        console.log("ajax response")
        console.log(response)
        for (i=response.length-1; i<response.length; i--){
              userCards(response[i].Brewery.id, response[i].Brewery.name, response[i].review, response[i].id)
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

      var path =  window.location.pathname;
      // var pathUserID =path.split("/")[2];
      if (currentUserId){
        displayUserCards()
      } else {
        var img = document.createElement("img");
        img.src = "../stylesheets/assets/No_Reviews_Clear.png"
        var src = document.getElementById("beeChasing");
        src.appendChild(img);
        }
    })
}

userCheck();