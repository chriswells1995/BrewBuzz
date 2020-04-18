function displayCards() {
  var settings = {
    url: "api/reviews/",
    method: "GET",
    timeout: 0,
  };
  $.ajax(settings).then(function (response) {
    var responseData = response;
    for (let i = 0; i < 5; i++) {
      var review_id = responseData[i].id;
      var review = responseData[i].review;
      var email = responseData[i].User.email;
      var brewery = responseData[i].Brewery.name;
      var breweryId = responseData[i].Brewery.id;
      buildCard(review_id, breweryId, brewery, email, review);
    }
  });

  function buildCard(review_id, breweryId, brewery, email, review) {
    var cardDiv = $("<li>")
    .addClass("col-sm-12")
    .attr("id", "review" + review_id);

    var cardBrewery = $("<h4>")
      .addClass("card-header")
      .html(
        "<a id=headerName style=color:black; href = /brewery/" + breweryId + ">" + brewery + "</a>"
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
}

displayCards();

