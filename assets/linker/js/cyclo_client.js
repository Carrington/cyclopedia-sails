var login = function() {
  var username = $("#loginName").val();
  var password = $("#loginPassword").val();
  if (username && password) {
    $.post(
            '/login',
            {username: username, password: password},
            function(user) {
              $("#login-box").remove();
              $("#signup-box").remove();
              $("#user-info").show().text('');
	      $("#guest-greeting").remove();
	      $("#user-info").prepend('<h3 id="user-greeting">Hello, ' + user.username + '</h3>');
              $("#user-info").append('<div id="pref-select"></div>');
	      $.post(
	        '/preference/find',
		{},
		function(xhr) {
		  for (var i = 0; i < xhr.length; i++) {
		    $("#pref-select").append("<div class=\"pref-block\">" + "<a href=\"/user/" + user.id + "/prefs/select?id=" + xhr.id + "\">" + xhr.name + "</div>");
		  }
		}
	      );
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
