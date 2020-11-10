$(document).ready(function() {

    var viewportWidth = window.innerWidth || document.getElementById.clientWidth;

    if (viewportWidth > 768){
        $("#qrModal").modal('show');
    }

});