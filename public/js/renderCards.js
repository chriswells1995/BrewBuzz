function displayCards() {
  var settings = {
    url: "api/reviews/",
    method: "GET",
    timeout: 0,
  };
  $.ajax(settings).then(function (response) {
    var responseData = response;
    // for (let index = 0; index < array.length; index++) {
    //   const element = array[index];
      
    // }
    for (let i = responseData.length - 1; i >= 0; i--) {
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
      .addClass("card-body headerFont")
      .html(
        "<a id=headerName style=color:black; href = /brewery/" + breweryId + ">" + brewery + "</a>"
      )

    var cardUser = $("<div style=font-size:125%;>")
      .attr("id", "cardBack")
      .addClass("card-body userBackground")
      .text(email + " said: " + review); // this will display the user review

    // var cardReview = $("<div style=font-size:125%;>")
    //   .attr("id", "cardBack")
    //   .addClass("card-body reviewBackground")
    //   .text(review); // this will display the review

    // var deleteBtn = $("<div>")
    //   .attr("id", "cardBack")
    //   .html(
    //     "<button type=button class=btn btn-outline-secondary id=deleteBtn>Delete</button>"
    //   )
    //   .addClass("card-body");

    cardDiv.append(cardBrewery, cardUser);
    // cardDiv.append(cardBrewery, cardUser, cardReview, deleteBtn); if we decide to use deleteBtn

    $("#OpenBreweries").append(cardDiv);
  }
}

displayCards();

