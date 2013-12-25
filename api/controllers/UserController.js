/**
 * UserController
 *
 * @module		:: Controller
 * @description	:: User requests - see what shit they go goin' on, be able to edit that shit
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
	Users.findOneByName(req.params.user).destroy();
  },
  view : function(req, res) {
    if (req.method != 'GET' && req.method != 'POST') {
	  var error = new Error("View is only availably via GET or POST");
	  res.send(500,error);
	}
	var user = Users.findoneByName(req.params.user);
	if (req.isAjax) {
	  res.json(user);
	} else {
	  res.send(user);
	}
  }
};
