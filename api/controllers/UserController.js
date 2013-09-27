/**
 * UserController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  signup: function (req, res) {
    //TODO: refactor all of this shit, add helpers, methods for injecting alternative registration strategies (google, facebook, etc)
    var username = req.param("username");
    var password = req.param("password");
    var email = req.param("email");
    Users.findByUsername(username).done(function(err, usr) {
      if (err) {
        res.send(500, { error: "DB Error" });
      } else if (usr) {
        res.send(400, {error: "Username already taken"});
      } else {
        Users.findByEmail(email).done(function error, user) {
          if (error) {
            res.send(500, { error: "DB Error" });
          } else if (user) {
            res.send(400, {error: "Already an account associated with this email address");
          } else {
            var hasher = require("password-hash");
            password = hasher.generate(password);
            Users.create({username: username, password: password}).done(function(newUserError, newUser) {
              if (newUserERror) {
                res.send(500, {error: "DB Error"});
                
              } else {
                req.session.user = user;
                res.send(user);
              }
            }
          }
        }
      }
    });
  },
  login: function (req, res) {

  }
  

};
