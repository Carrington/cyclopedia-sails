/**
 * UserController
 *
 * @module		:: Controller
 * @description	:: User requests - see what shit they got goin' on, be able to edit that shit
 */

module.exports = {
  /**
   * Function to delete a user
   */
  destroy: function(req, res) {
    if (req.method != 'DELETE') {
      var error = new Error("Destroy is only available via DELETE");
      res.json(error,500);
    }
    User.findOneByName(req.params.user).destroy();
  },
  view : function(req, res) {
    if (req.method != 'GET' && req.method != 'HEAD') {
      var error = new Error("Find is only availably via GET or HEAD");
      res.send(500,error);
    }
    User.findOneByUsername(req.params.user).done(function(err, usr) {
      if (err) res.send(500, "DB Error: " + err);
      if (usr) res.send({username: usr.username, email: usr.email, createdAt: usr.createdAt, id: usr.id});
    });
  },
  update: function(req, res) {
    //Stub. Unreachable because of policies.
    res.send(500,'This method is a stub.');
  },
  updateSelf: function(req, res) {
    if (req.method != 'POST' && req.method != 'PUT') {
      var error = new Error("Save is only available via POST or PUT");
      res.send(500,error);
    }
    User.findOneByUsername(req.session.user).done(function (err, usr) {
      if (err) res.send(500, "DB Error: " + err);
      usr.email = req.param('email');
      var hasher = require('password-hash');
      var password = hasher.generate(req.param('password'));
      usr.password = password;
      usr.save(function(err) {
        if (err) res.send(500, "DB Error: " + err);
        sails.log.info('User ' + req.param('user') + ' was updated.');
      });
    });

  },
  updateOther: function(req, res) {
    if (req.method != 'POST' && req.method != 'PUT') {
      var error = new Error("Save is only available via POST or PUT");
      res.send(500,error);
    }
    User.findOneByUsername(req.params.user).done(function (err, usr) {
      if (err) res.send(500, "DB Error: " + err);
      usr.email = req.params('email');
      var hasher = require('password-hash');
      var password = hasher.generate(req.params('password'));
      usr.password = password;
      usr.role = req.params.role;
      usr.username = req.params.username;
      usr.save(function(err) {
        if (err) res.send(500, "DB Error: " + err);
        sails.log.info('User ' + req.param('user') + ' was updated.');
      });
    });
  },
  create: function(req, res) {
    if (req.method != 'POST' && req.method != 'PUT') {
      var error = new Error("Save is only available via POST or PUT");
      res.send(500,error);
    }
    User.create().done(function (err, usr) {
      if (err) res.send(500, "DB Error: " + err);
      usr.username = req.params.username;
      usr.email = req.params.email;
      var hasher = require('password-hash');
      var password = hasher.generate(req.params('password'));
      usr.password = password;
      usr.role = 1;
      usr.save(function(err) {
        if (err) res.send(500, "DB Error: " + err);
        sails.log.info('User ' + req.param('user') + ' was updated.');
      });
    });
  }
}
