function displayCards() {
  //  console.log(searchResult);
  var settings = {
    "url": "http://localhost:8080/api/reviews/",
    "method": "GET",
    "timeout": 0
    // "headers": {
    //   "Cookie": "connect.sid=s%3AWonUzQhp09cdIZjjmEUsVh6Z5lDyP72o.Zfm8WwKpzjxd7kcyBTbnGxlDXsNNIEerisDXqBVqFSg"
    // },
  };
  $.ajax(settings)
  .then(function(response) {
      // console.log(response);
    var responseData = response
    console.log(responseData)
    var review = responseData[4].User.email
  
    // var breweryName = [review][0]['User'][0]
    console.log("Review: ", review);
    // console.log("email", breweryName);
    buildCard(review)
    // console.log("User: ", User);
    // for testing
    
    // for (let [reviewID, reviewValues] of Object.entries(responseData)) {
      //   console.log("reviewID", reviewID)
      //   console.log("reviewvalues", reviewValues)
      //   for (let [reviewDisplayValues] of Object.entries(reviewValues)) {
        //     buildCard(reviewID, reviewDisplayValues);
        //   }
        // }
      });
      
      function buildCard(review, review_id, reviewDisplayValues) {
        var email = 'rwilliams01101@gmail.com'
        var name = 'Surly'
    // var { name, email, review } = reviewDisplayValues;
    var cardDiv = $("<div>")
      .addClass("col-sm-12 coinCard " + review_id)
      .attr("id", review_id);

    var cardBrewery = $("<h4>")
      .addClass("card-header")
      .text("Brewery: " + name); // this will display the brewery 

    var cardUser = $("<div style=font-size:125%;>")
      .attr("id", "cardBack")
      .addClass("card-body")
      .text("User: " + email); // this will display the user

    var cardReview = $("<div style=font-size:125%;>")
      .attr("id", "cardBack")
      .addClass("card-body")
      .text("Review: " + review); // this will display the review

    var deleteBtn = $("<div>")
      .attr("id", "cardBack")
      .html(
        "<button type=button class=btn btn-outline-secondary id=deleteBtn>Delete</button>"
      )
      .addClass("card-body"); // this probably won't be needed but could potentially be used on other pages

    cardDiv.append(
      cardBrewery,
      cardUser,
      cardReview,
      deleteBtn
    );

    $("#add-reviewcards").append(cardDiv);
  }
}

displayCards()
