// global values
var url = window.location.href;
var resetCredentials = url.split("?")[1].split("&");
var token = resetCredentials[0].split("token=")[1];
var email = resetCredentials[1].split("email=")[1];

var tokenHTML = document.getElementById("tokenRp");
var emailHTML = document.getElementById("emailRp");

tokenHTML.value = token;
emailHTML.value = email;

$("#rpButton").on("click", function () {
  var decodedToken = decodeURIComponent(token);

  $.post("/api/user/resetpassword", {
    password1: $("#password1").val(),
    password2: $("#password2").val(),
    email: $("#emailRp").val(),
    token: decodedToken,
  })
    .then(function (resp) {
      if (resp.status == "ok") {
        console.log("ifworking");
        // $('.reset-message').removeClass('alert-danger').addClass('alert-success').show().text(resp.message);
        // $('#resetPasswordForm').remove();
        window.location.href = "/landing";
      } else {
        console.log("elseworking");
        $(".reset-message")
          .removeClass("alert-success")
          .addClass("alert-danger")
          .show()
          .text(resp.message);
      }
    })
    .catch(function (err) {
      console.log("this is an error");
      console.log(err);
    });
});
