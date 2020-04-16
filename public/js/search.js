$(document).ready(function() {

    // DONE tie an event listener to the search bar for every HTML 
    // DONE get the search term from the input in the search bar
    // DONE make a GET ajax call that returns breweries based on a search term
    // DONE render those breweries to the page. Temporarily as buttons, but in the future more fancy. 
    // DONE when clicking on those buttons, tie an event listener that calls the ajax with the properties of that specific object
    // DONE make a POST ajax call, adding that brewery's name, website, and streetAddress to the database
    


// This is a global variable we may want to put the full response in. Currently not needed.
var FullArray=[];


    // create event listener for clicking on the search button
    $('#searchButton').on("click", function () {
        event.preventDefault()

        //  This empy function makes it so only one set of breweries appears on screen at a time
        $("#OpenBreweries").empty()
    
        // This input variable is the user input, tied to the ID in the HTML
        var input = $('#searchInput').val()

        // This code is the actual URL, and the search term the user inputted will go in it
        var inputURL = "https://api.openbrewerydb.org/breweries/search?query="+ input;
    
        // This API call GETS all breweries based on that search input
        $.ajax({
            url: inputURL,
            method: 'GET'
        }).then(function (response) {
            // the full response is stored in the global FullArray
            FullArray=response;
            console.log('FullArray: ', FullArray)
            // a for loop puts all the brewery properties we need in Objects, then pushed into an array of those objects
            var BreweryObject={};
            var AllBreweryObjects=[];
            for (i=0; i<response.length; i++){

                BreweryObject={
                     breweryName: response[i].name,
                    //  breweryStreet: breweryStreet[i],
                    //  breweryCity: breweryCity[i],
                    breweryAddress: response[i].street + ", " + response[i].city + ", " + response[i].state,
                    breweryWebsite: response[i].website_url,
                    OpenBreweryID: response[i].id       
                }
                AllBreweryObjects.push(BreweryObject);
            }

            console.log("objects: ",AllBreweryObjects)


            // call a seperate function responsible for rendering these names to the page
            renderReturnedBreweries(AllBreweryObjects);

        })
        //This ends the event listener's callback function
    })

    // This function will render our returned breweries to the page
    function renderReturnedBreweries(AllBreweryObjects){

         //  This empy function makes it so only one set of breweries appears on screen at a time
        $("#OpenBreweries").empty()



        // Render a list of breweries with their address. 
        // then check if they are in our database yet, and if not, THEN put a message under that brewery that says,
        // "No reviews yet! Click Here to make the first!" with the "Click Here" on a button that POSTS that brewery to our databse.
         // TODO: If a brewery IS in our database, attach Event Listeners and a href's to Brewery Names so clicking them will bring up brewery.html, and set off a render function for that page


        var AddBreweryButton;
        var renderedBreweryName;
        var renderedBreweryAddress;
        var lineBreak=$("<br>"); 
        for (i = 0; i < AllBreweryObjects.length; i++) {

            // create h2's that hold the brewery name
            renderedBreweryName=$("<h2>");
            renderedBreweryName.text(AllBreweryObjects[i].breweryName)
            
            // create h3's that hold the brewery address
            renderedBreweryAddress=$("<h3>")
            renderedBreweryAddress.text(AllBreweryObjects[i].breweryAddress)

            // Append Brewey Name
            $("#OpenBreweries").append(renderedBreweryName)

            // Append Brewery Address
            $("#OpenBreweries").append(renderedBreweryAddress)

            // TODO: Create an IF statement that checks if these breweries exist in our current database. If not, do this.

            // create buttons with "AddOpenBrewery" class, and value of the index number in the list of breweries
            AddBreweryButton = $("<button>")
            AddBreweryButton.attr("value", i)//AllBreweryObjects[i].OpenBreweryID)
            AddBreweryButton.text("Click Here to Write Their First Review!")
            AddBreweryButton.attr("class", "AddOpenBrewery")

            
            // Append AddBreweryButton
            $("#OpenBreweries").append(AddBreweryButton);



            
        }

        // call assign click function to add event listeners
        assignClick(AllBreweryObjects)

        // End of render function
    }
    
    // adds event listeners to newly created buttons
    function assignClick(AllBreweryObjects) {

        // event listeners on all "AddOpenBrewery" buttons
            $(".AddOpenBrewery").on("click", function (event) {

            event.preventDefault()

            console.log(event.target.value)
            console.log(AllBreweryObjects[event.target.value]);
    
    


                // POST ajax call using the event.target.value (from the button we clicked) as an index number, signifying it's place in the AllBreweryObjects array,
                // So we can use that brewery's info in the ajax.

            var settings = {
                "url": "/api/brewery",
                "method": "POST",
                "timeout": 0,
                "headers": {
                  "Content-Type": "application/x-www-form-urlencoded"

                },
                "data": {
                  "name": AllBreweryObjects[event.target.value].breweryName,
                  "website": AllBreweryObjects[event.target.value].breweryWebsite,
                  "streetAddress": AllBreweryObjects[event.target.value].breweryAddress
                }
              };

              console.log(settings)
              
              $.ajax(settings).then(function (response) {
                console.log(response);
              });

    
        })

        

    
    }


    // end of document listener
      });