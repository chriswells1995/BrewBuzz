// look up in js how to log url
// then use .split to split everything at the slash and grab the next index (the ID number)



var path =  window.location.pathname;
var thisIndex =path.split("/")[2];

console.log(thisIndex);


var settings = {
    "url": "/api/brewery/reviews/" + thisIndex,
    "method": "GET",
    "timeout": 0

  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);

    buildCard(response[0].id, response[0].Brewery.name, response[0].User.email, response[0].review )

  });

  function buildCard(review_id, brewery, email, review) {
    var cardDiv = $("<li>")
    .addClass("col-sm-12")
    .attr("id", "review" + review_id);

    var cardBrewery = $("<h4>")
      .addClass("card-header")
      // .text("Brewery: " + brewery) // this will display the brewery
      .html(
        "<a href = brewery.html id=headerName style=color:black;>" + brewery + "</a>"
      )

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

    cardDiv.append(cardBrewery, cardUser, cardReview);
    // cardDiv.append(cardBrewery, cardUser, cardReview, deleteBtn); if we decide to use deleteBtn

    $("#OpenBreweries").append(cardDiv);
  }