console.log("working")
var arrayOfObjects=[]


$("#apiLoop").on("click", function(){

    console.log("click")

    // Step 1: GET (ours) grab X breweries (from Minnesota). Put their names in an array
    $.ajax({
        url: "/api/breweries",
        method: "GET",
        crossDomain: true,
      }).then(function (response) {
        console.log(response)
    // var AllBreweryObjects = response.filter(brewery => (brewery.name.includes(input) || brewery.address.includes(input) )) 
    var AllBreweryObjects=[];
    
    for (i=0; i<response.length; i++){
      

        
      if (((response[i].tags).toLowerCase()).includes("missouri")) {
        console.log(true);
        AllBreweryObjects.push(response[i])
      }
    }
  
    //   if (AllBreweryObjects.length ===0){
    //     console.log("There are no results");
    //     var noResults = $("<li>")
    //     .html("<h1>No Results Found</h1>")
    //     .addClass("noResultsMessage");
    //     $("#OpenBreweries").before(noResults);
    //     $(".loader-wrapper").empty();
    //   }
  
    console.log(AllBreweryObjects)

    // var arrayOfObjects=[]
      for(i=0; i<AllBreweryObjects.length; i++){



        var newObject = {id: AllBreweryObjects[i].id, name: AllBreweryObjects[i].name, image: AllBreweryObjects[i].logo}
        arrayOfObjects.push(newObject)


        // mnObject.push({  AllBreweryObjects[i].id:2  }  )  

        

      }
      var exp =0;
      console.log("first array of objects")
      console.log(arrayOfObjects)

    return arrayOfObjects
      }).then(function (arrayOfObjects){

for (i=1; i<arrayOfObjects.length; i++){

    if(arrayOfObjects[i].image){
        console.log("Image for this one exists already")
    }else{
        console.log("grabbing image")
        
         serp(i, arrayOfObjects[i].name)


    }
    

}

console.log("All objects WITH good images")
console.log(arrayOfObjects)
      })






    // Step 2: GET (serp) Make a loop searchers breweryname+logo into serpwow, and checks that the image is good. Render to screen

    // Step 3: In same loop, make a PUT (ours) that adds the image src to our database 

// End of click
})





function serp(i, name){

    // make serp ajax call
    // check image is ok
    // return image src 
    
    // GET call grab image with this name
    // add image in object

    var q = (name).replace(/ /g, "+");
    q = q.replace(/&/g, "+");
    q = q.replace(/-/g, "+");

    var logoURL =
      "https://api.serpwow.com/live/search?api_key=B03F416BACF94C8C86F2123D183281B8&q=" +
      q +
      "+brewery+logo&search_type=images&num=1";
    // console.log(logoURL);
    var settingsLogo = {
      url: logoURL,
      method: "GET",
    };
    // var logoSRC;
    $.ajax(settingsLogo).then(function (response) {
      console.log("logo response");
      console.log(response);
      var logoSRC = response.image_results[0].image;
      var imageNumber=0;

      // This If and While will verify the image is usable 
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

      return logoSRC
    // END OF SERP 
    }).then(function(logoSRC){
        arrayOfObjects[i].image = logoSRC
        console.log("after serp ")
        console.log(arrayOfObjects[i])
        console.log("i: ", i)
    })
}

$("#render").on("click", function(){
    for(i=1; i<arrayOfObjects.length; i++){
        console.log("========================================")
        console.log(arrayOfObjects[i])
                var putSettings = {
            "url": "/api/breweries",
            "method": "PUT",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {
              "id": arrayOfObjects[i].id,
              "logo": arrayOfObjects[i].image
            }
          };
          $.ajax(putSettings).then(function (response) {
            console.log(response);
          }).catch(function(error){
              console.log(error)
          });
    }
})
