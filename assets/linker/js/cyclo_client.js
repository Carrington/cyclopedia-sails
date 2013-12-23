var login = function() {
  var username = $("#loginName").val();
  var password = $("#loginPassword").val();
  if (username && password) {
    $.post(
            '/login',
            {username: username, password: password},
            function(user) {
              window.location = "/user/" + user.username;
	    }
    ).fail(function(res) {
      alert("Error: " + res.responseText);
    });
  } else {
    alert("A username and password is required.");
  }

}

var signup = function () {
  var username = $("#signupName").val();
  var password = $("#signupPassword").val();
  var email = $("#signupEmail").val();
  var confirmPassword = $("#signupConfirmPassword").val();
  if (username && password) {
    if (password === confirmPassword) {
      $.post(
                '/signup',
                {username: username, password:password, email:email},
                function (data, textStatus, jqXHR) {
                    window.location = data.redirect;
                }
            ).fail(function(xhr, textStatus, errorThrown){
                alert("Error: " + xhr.responseText);
            });
        } else {
            alert("Passwords don't match");
        }   
    } else {
        alert("A username and password is required");
    }  
}
