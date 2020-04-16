$(document).ready(function() {

    // tie an event listener to the search bar for every HTML
    // get the search term from the input in the search bar
    // make a GET ajax call that returns breweries based on a search term
    // render those breweries to the page. Temporarily as buttons, but in the future more fancy. 
    // when clicking on those buttons, tie an event listener that calls the ajax with the properties of that specific object
    // make a POST ajax call, adding that brewery's name, website, and streetAddress to the database
    


// This is a global variable we may want to put the full response in 
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
            // a for loop puts all the brewery names in one breweryNames array
            var breweryNames=[];
            var breweryStreet=[];
            var breweryCity=[];
            var breweryWebsites=[];
            var BreweryObject={};
            var AllBreweryObjects=[];
            for (i=0; i<response.length; i++){
                // breweryNames.push(response[i].name) ;
                // breweryStreet.push(response[i].street);
                // breweryCity.push(response[i].city)
                // breweryWebsites.push(response[i].website_url)
                // breweryAddress=(breweryStreet[i] + ", " + breweryCity[i]);
                // console.log(breweryAddress)

                BreweryObject={
                     breweryName: response[i].name,
                    //  breweryStreet: breweryStreet[i],
                    //  breweryCity: breweryCity[i],
                    breweryAddress: response[i].street + ", " + response[i].city + ", " + response[i].state,
                    breweryWebsite: response[i].website_url       
                }
                AllBreweryObjects.push(BreweryObject);
            }

 

            // console.log("names: ", breweryNames)
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



        // TODO: instead of buttons, make a nice looking list of breweries with their address. 
        // then check if they are in our database yet, and if not, THEN put a message under that brewery that says,
        // "No reviews yet! Click Here to make the first!" with the "Click Here" on a button that POSTS that brewery to our databse.

        // CURRENT METHOD WE'RE USING FOR TESTING
        // then we create the AddBreweryButton variable, which we'll use to create a <button> element, "Button-add" class, 
        // and add the brewery Names through a for loop, and append these buttons
        var AddBreweryButton;
        var renderedBreweryName;
        var renderedBreweryAddress;
        var lineBreak=$("<br>"); 
        for (i = 0; i < AllBreweryObjects.length; i++) {


            renderedBreweryName=$("<h2>");
            renderedBreweryName.text(AllBreweryObjects[i].breweryName)
            
            renderedBreweryAddress=$("<h3>")
            renderedBreweryAddress.text(AllBreweryObjects[i].breweryAddress)

            // Append Brewey Name
            $("#OpenBreweries").append(renderedBreweryName)

            // Append Brewery Address
            $("#OpenBreweries").append(renderedBreweryAddress)

            // TODO: Create an IF statement that checks if these breweries exist in our current database. If not, do this.
            AddBreweryButton = $("<button>")
            AddBreweryButton.attr("class", "Button-add")
            AddBreweryButton.text("Click Here to Write Their First Review!")
            // Append AddBreweryButton
            $("#OpenBreweries").append(AddBreweryButton);

            // Append a Line Break to sepereate eveything
            // $("#OpenBreweries").append(lineBreak);
            // $("#OpenBreweries").append(lineBreak);
            // $("#OpenBreweries").append(lineBreak);


            
        }
        // Currently, this will create a bunch of buttons with the names of breweries that match the search result. 
        // TODO: create an assignClick function and call it here. This function will put event listeners on everything
        // New breweries will have buttons that make an ajax call posting that brewery to our databse
        // Breweries already in our databse will have links to their brewey HTML pages, and make a GET request for the reviews of that brewery.

    }
    


    // end of document listener
      });