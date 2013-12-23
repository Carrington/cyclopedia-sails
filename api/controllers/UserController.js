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
    
  },


};
