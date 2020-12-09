$(document).ready(function () {
  // Getting references to our form and inputs
  var loginForm = $("form#login-nav");
  var emailInput = $("input#exampleInputEmail2");
  var passwordInput = $("input#exampleInputPassword2");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function (event) {
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password,
    })
      .then(function () {
        location.reload();
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    if (err.responseText === "Unauthorized") {
      $("#alert .msg").text("Incorrect email or password.");
    } else {
      $("#alert .msg").text("Logged in.");
    }
    $("#alert").fadeIn(500);
  }

  function addLinkToDashboard(currentUserId) {
    $("#dashboardLink").attr("href", "/user/" + currentUserId);
  }

  function userCheck() {
    // make ajax get for user ID
    var userSettings = {
      url: "/api/user_data",
      method: "GET",
      timeout: 0,
    };

    // add var dashboard to hide link if not logged in
    $.ajax(userSettings).then(function (response) {
      var currentUserId = response.id;
      var login = document.getElementById("loginVisibility");
      var logout = document.getElementById("logout");
      var dashboard = document.getElementById("dashboardLink");
      var flagLabel = document.getElementById("flagLabel");
      var flagOptions = document.getElementById("flagOptions");
      var flagNote = document.getElementById("flagNote");
      var submitBreweryFlag = document.getElementById("submitBreweryFlag");

      var reviewInput = document.getElementById("input#exampleInputPassword2");

      localStorage.setItem("userId", currentUserId);

      if (currentUserId) {
        (login.style.display = "none"),
          (logout.style.display = "block"),
          (dashboard.style.display = "block");
      } else {
        (login.style.display = "block"),
          (logout.style.display = "none"),
          (dashboard.style.display = "none"),
          (flagOptions.style.display = "none"),
          (flagNote.style.display = "none"),
          (submitBreweryFlag.style.display = "none"),
          flagLabel.replaceWith("Please sign in to flag a brewery.");
      }
      addLinkToDashboard(currentUserId);
    });
  }

  userCheck();
});
