$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var usernameInput = $("input#username-input");
  var passwordInput = $("input#password-input");
  var dateInput = $("input#date-input");
  var currentDate = Date.now();
  console.log('current date : ', currentDate);
  var yearsago = (currentDate -662256000000 )
  var dateString = new Date(yearsago)
  console.log(dateString)
  //if birthdate is less than 662256000000 ms, don't allow account

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim(),
      birthDate: dateInput.val()
    };
   
    userData.birthDate = new Date(userData.birthDate).getTime();
    if (!userData.email || !userData.username || !userData.password ) {
      return;
    }
    else if((currentDate - userData.birthDate) < 662695446000){
      return;
    }

    //else if(){}
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.username, userData.password);
    emailInput.val("");
    usernameInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, username, password) {
    $.post("/api/signup", {
      email: email,
      username: username,
      password: password
    })
      .then(function(data) {
        window.location.replace("/login");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    console.log(err.responseJSON)
    $("#alert .msg").text("Email already registered.");
    // $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
