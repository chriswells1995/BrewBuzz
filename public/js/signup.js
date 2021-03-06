$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var usernameInput = $("input#username-input");
  var passwordInput = $("input#password-input");
  var ageTOSInput = $("input#ageTOS-input");
  // var dateInput = $("input#date-input");
  // var currentDate = Date.now();
  // var yearsago = (currentDate -662256000000 )
  // var dateString = new Date(yearsago)
  

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim(),
      //birthDate: dateInput.val()
    };
    //if birthdate is less than 662256000000 ms, don't allow account
    //userData.birthDate = new Date(userData.birthDate).getTime();
    if (!userData.email || !userData.username || !userData.password || !ageTOSInput[0].checked) {
      return;
    }
    // else if((currentDate - userData.birthDate) < 662695446000){
    //   return;
    // }

    // If we have an email, username, password, and verification run the signUpUser function
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
    if(err.responseJSON.original.sqlMessage.includes("username")) {
      $("#alert .msg")
      // .text("Username already registered.")
      .html("<h5>Username already registered.</h5><a href = /landing> Log In? </a>")
    } else {
      $("#alert .msg")
      .html("<h5>Email already registered.</h5><a href = /landing> Log In? </a>")
    }
    // $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
