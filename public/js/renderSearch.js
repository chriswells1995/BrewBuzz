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
      buildCard(review_id, brewery, email, review);
    }
  });

  function buildCard(review_id, brewery, email, review) {
    var cardDiv = $("<li>")
      .addClass("col-sm-12")
      .attr("id", "review" + review_id);

    var cardBrewery = $("<h4>")
      .addClass("card-header")
      .html(
        "<a href = brewery.html id=headerName style=color:black;>" +
          brewery +
          "</a>"
      ); // this will display the brewery

    var cardUser = $("<div style=font-size:125%;>")
      .attr("id", "cardBack")
      .addClass("card-body")
      .text("User: " + email); // this will display the user

    var cardReview = $("<div style=font-size:125%;>")
      .attr("id", "cardBack")
      .addClass("card-body")
      .text("Review: " + review); // this will display the review

    // var removeBtn = $("<div>")
    //   .attr("id", "cardBack")
    //   .html(
    //     "<button type=button class=btn btn-outline-secondary id=removeBtn>Show Me New Brewery</button>"
    //   )
    //   .addClass("card-body");

    cardDiv.append(cardBrewery, cardUser, cardReview);
    $("#add-reviewcards").append(cardDiv);
  }
}

displayCards();
