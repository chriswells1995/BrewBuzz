$(document).ready(function () {

    $("#landingSearchButton").on("click", function () {
        event.preventDefault();

        var input = $("#landingSearchInput").val();

        window.location.href = "/search/" + input;
    });


    $("#searchButton").on("click", function () {
        event.preventDefault();

        var input = $("#searchInput").val();

        window.location.href = "/search/" + input;
        // TODO: One of these is also emptying the BrewBuzz logo, which we would like to stay
//         $("#brewery-title").empty();
//         $("#headerName").empty();
//         $("#brewery-rating").empty();
//         $("#brewery-logo").empty();
//         $("#addReviewDiv").empty();
//         $("#reviewButton").hide();
//         $("#OpenBreweries").empty();
//         $(".noResultsMessage").empty();
//         var input = $("#searchInput").val();
//         $("#searchInput").val("");
//       console.log("search input")
//       console.log(input)
//         $.ajax({
//           url: "/api/breweries",
//           method: "GET",
//           crossDomain: true,
//         }).then(function (response) {
//           console.log(response)
//           if (response.length ===0){
//             console.log("There are no results");
//             var noResults = $("<li>")
//             .html("<h1>No Results Found</h1>")
//             .addClass("noResultsMessage");
//             $("#OpenBreweries").after(noResults);
//           }
//       // var AllBreweryObjects = response.filter(brewery => (brewery.name.includes(input) || brewery.address.includes(input) )) 
//       var AllBreweryObjects=[];
      
//       for (i=0; i<response.length; i++){
//         console.log(response[i].name)
//         console.log(response[i].streetAddress)

//         if (((response[i].streetAddress).toLowerCase()).includes(input.toLowerCase())||
//         ((response[i].name).toLowerCase()).includes(input.toLowerCase())) {
//           console.log(true);
//           AllBreweryObjects.push(response[i])
//         }
//       }

//       console.log(AllBreweryObjects)
//       renderCards(AllBreweryObjects);
//       input = '';
//         }).catch(function (error){
//           console.log(error)
//         })
       });

// // ==================================================

//       function renderCards(AllBreweryObjects){
//         $("#OpenBreweries").empty();
//         var AddBreweryButton;
//         var existinglogo;
//         var renderedBreweryName;
//         // var renderedstreetAddress;
//         var renderedBreweryWebsite;
//         var renderedBreweryPhone;
//         var matchCheck;
//         var directionsLink;
//         var directions;
//         var directionsName;

//         for (i=0; i<AllBreweryObjects.length; i++){



//         var cardDiv = $("<li>")
//         .addClass("col-sm-12 row")
//         .attr("id", "cardNumber" + i);

//       renderedBreweryName = $("<h4>")
//         .text(
//           AllBreweryObjects[i].name +
//             AllBreweryObjects[i].streetAddress
//         )
//         .attr("value", i)
//         .addClass("card-body headerFont");
        
//         renderedBreweryName.html(
//           "<a href = /brewery/" +
//             AllBreweryObjects[i].id +
//             " class=row text-center id=headerName style=color:black;>" +
//             AllBreweryObjects[i].name +
//             "<br>" +
//             AllBreweryObjects[i].streetAddress +
//             "</a>"
//         );

//       renderedBreweryPhone = $("<div>")
//         .attr("id", "callButton")
//         .addClass("column")
//         .html(
//           "<a href=" +
//             "tel:" +
//             AllBreweryObjects[i].phoneNumber +
//             ">" +
//             "<img class=redirectButton src=" +
//             `https://img.pngio.com/icono-simple-telefono-en-circulo-png-transparente-stickpng-icono-telefono-png-512_512.png` +
//             ">" +
//             "</a>"
//         )

//       renderedBreweryWebsite = $("<div>")
//         .attr("id", "websiteButton")
//         .addClass("column")
//         .html(
//           "<a href=" +
//             AllBreweryObjects[i].website +
//             " + target=_blank" +
//             ">" +
//             "<img class=redirectButton src=" +
//             `https://image.flaticon.com/icons/svg/2301/2301129.svg` +
//             ">" +
//             "</a>"
//         );

//       directionName = AllBreweryObjects[i].name.replace(/,/g,"%2C");
//       directionName = directionName.replace(/ /g, "+");
//       directions = AllBreweryObjects[i].streetAddress.replace(/,/g,"%2C");
//       directions = directions.replace(/ /g, "+");
//       directions ="https://www.google.com/maps/search/?api=1&query=" + directionName + directions;
//       //   console.log("working")
//       //  console.log(directions)

//       directionsLink = $("<div>")
//         .attr("id", "directionLink")
//         .addClass("column")
//         .html(
//           "<a href=" +
//             directions +
//             ">" +
//             "<img class=redirectButton src=" +
//             `https://image.flaticon.com/icons/svg/2948/2948111.svg` +
//             ">" +
//             "</a>"
//         );

//       shareLink = $("<div>")
//         .attr("id", "shareLink")
//         .addClass("column")
//         .html(
//           "<a href=#" +
//             ">" +
//             "<button type=button class=btn btn-primary data-toggle=modal data-target=#exampleModal>"+
//             "<img id=shareBtn class=redirectButton src=" +
//             `https://image.flaticon.com/icons/svg/3039/3039401.svg` +
//             ">" +
//             "</button>"+
//             "</a>"
//         );

//       AddReviewButton = $("<a>")
//         .attr("value", i)
//         .text("Write a review!")
//         .addClass("reviewBtn btn btn-dark");
//       // .attr("href", "brewery.html");

//       cardDiv.append(
//         renderedBreweryName,
//         renderedBreweryPhone,
//         renderedBreweryWebsite,
//         directionsLink,
//         shareLink
//       );

//       if (AllBreweryObjects[i].logo) {
//         existinglogo = $("<img>")
//           .addClass("logo column")
//           .attr("src", AllBreweryObjects[i].logo);
//         renderedBreweryName.before(existinglogo);
//       }
//       if (AllBreweryObjects[i].totalRating){
//         var avgStars = $("<p>")
//         .addClass("starability-result")
//         .attr("data-rating", Math.round(parseInt(AllBreweryObjects[i].totalRating)*2)/2 );
//         renderedBreweryName.prepend(avgStars);
//       }
//       console.log("brewery Rating")
//       console.log(AllBreweryObjects[i].totalRating)

//        AddReviewButton.attr(
//         "href",
//         "/brewery/" + AllBreweryObjects[i].id
//       );

//       cardDiv.append(AddReviewButton);


//       $("#OpenBreweries").append(cardDiv);
//         }
        
//       };
// ================================================================


});