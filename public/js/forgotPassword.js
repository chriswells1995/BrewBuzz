    $('#fpButton').on('click', function() {
      $.post('/user/forgotpassword', {
        email: $('#emailFp').val(),
      }, function(resp) {
          console.log("success email")
      });
    });