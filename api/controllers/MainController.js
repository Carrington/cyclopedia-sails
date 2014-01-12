/**
 * MainController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {
  index: function (req, res) {
    var content;
    Preference.findAll().done(function(err, prefs) {
      content = prefs;
    });
    res.view({content: content});
  },
  guestreminder: function (req, res) {
    res.view();
  },
  signup: function(req, res) {
    var username = req.param("username");
    var password = req.param("password");
    var email = req.param("email");

    User.findByUsername(username).done(function(err, usr){
      sails.log.info('New User Registration! Checking for existence...');
      if (err) {
	sails.log.warn('Oh dear. Something bizarre happened to the DB.');
        res.send(500, "DB Error");
      } else if (typeof usr !== 'undefine' && usr.length > 0) {
        sails.log.info('User with supplied name exists.');
        res.send(400, "Username already in use.");
      } else {
        var hasher = require("password-hash");
        password = hasher.generate(password);
        sails.log.info('Creating new user...');
        User.create({username: username, password: password, email: email}).done(function(error, user) {
          if (error) {
            res.send(500, "DB Error");
          } else {
            req.session.user = user;
	    var data = {
              user: user,
              redirect: "/user/" + user.username
            };
            res.send(data);
          }
        });
      }
    });
  },
  login: function(req, res) {
    var username = req.param("username");
    var password = req.param("password");
     
    User.findOneByUsername(username).done(function(err, usr) {
        if (err) {
            res.send(500, "DB Error");
        } else {
            if (usr) {
                var hasher = require("password-hash");
                if (hasher.verify(password, usr.password)) {
                    req.session.user = usr;
                    res.send(usr);
                } else {
                    res.send(400, "Wrong Password");
                }
            } else {
                res.send(404, "User not Found");
            }
        }
    });
  }
};
