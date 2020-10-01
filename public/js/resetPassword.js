// global values
var url = window.location.href;
var resetCredentials = url.split("?")[1].split("&")
var token = resetCredentials[0].split("token=")[1]
var email = resetCredentials[1].split("email=")[1]

var tokenHTML = document.getElementById('tokenRp');
var emailHTML = document.getElementById('emailRp');

tokenHTML.value = token

emailHTML.value = email

console.log("resetcredentials");
console.log(token);
console.log(email);