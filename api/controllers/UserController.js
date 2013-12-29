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
      if (err) res.send(500, "DB Error");
      if (usr) res.send({username: usr.username, email: usr.email, createdAt: usr.createdAt, id: usr.id});
    });
  },
  update: function(req, res) {
    if (req.method != 'POST' && req.method != 'PUT') {
      var error = new Error("Save is only available via POST or PUT");
      res.send(500,error);
    }
  }
};
