  $(document).ready(function() {

function test(){

    // use this URL for actual deployment
    // "https://brewbuzz.herokuapp.com/api/reviews/"
    // use this for testing
    // "http://localhost:8080/api/reviews/"
var settings = {
    "url": "/api/reviews/",
    "method": "GET",
    "timeout": 0
    // "headers": {
    //   "Cookie": "connect.sid=s%3AWonUzQhp09cdIZjjmEUsVh6Z5lDyP72o.Zfm8WwKpzjxd7kcyBTbnGxlDXsNNIEerisDXqBVqFSg"
    // },
  };
  
  $.ajax(settings)
  .then(function (response) {
    var responseData = response[3];
    var breweryName = [responseData][1]['User'][1]
    console.log("brewname", breweryName)
    console.log("response data: ", responseData)
   
//  $("#randomBreweries").append(response[0].review)

  })
//   .then(function(){
// //   $("#randomBreweries").append(response)


//   });

}


test();



  });