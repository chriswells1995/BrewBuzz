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
  });
});
