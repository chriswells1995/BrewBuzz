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
      console.log(response);
    var responseData = response.DISPLAY;
    for (let [coinID, coinValues] of Object.entries(responseData)) {
      for (let [coinFiat, coinDisplayValues] of Object.entries(coinValues)) {
        buildCard(coinID, coinDisplayValues);
      }
    }
  });

  function buildCard(coin_id, coinDisplayValues) {
    var { PRICE, VOLUME24HOUR, HIGH24HOUR } = coinDisplayValues;
    var cardDiv = $("<div>")
      .addClass("col-sm-12 coinCard " + coin_id)
      .attr("id", coin_id);

    var cardBrewery = $("<h4>")
      .addClass("card-header")
      .text("Brewery: " + HIGH24HOUR); // this will display the brewery 

    var cardUser = $("<div style=font-size:125%;>")
      .attr("id", "cardBack")
      .addClass("card-body")
      .text("User: " + PRICE); // this will display the user

    var cardReview = $("<div style=font-size:125%;>")
      .attr("id", "cardBack")
      .addClass("card-body")
      .text("Review: " + VOLUME24HOUR); // this will display the review

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
