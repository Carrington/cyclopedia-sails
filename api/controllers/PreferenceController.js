/**
 * PreferenceController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var obscura = require('Obscura');

module.exports = {
  create: function (req, res) {
    if (req.method != "POST" && req.method != "PUT") {
      var error = new Error("Save is only available via POST or PUT");
      res.send(500,error);
    }
    Preference.create().done(function (err, pref) {
      pref.name = req.params.name;
      //TODO cycle through inclusion and exclusion values and check for
      //integrity then add to pref and save.
      var inclusions = req.params.inclusions;
      pref.inclusions = [];
      var inc = undefined;
      for (var i = 0; i < inclusions.length; i += 1) {
        inc = inclusions[i];
        if (/\s/g.test(inc.target)) {
          res.send({success: false, reason: "Cannot include whitespace in "
          + "inclusive target " + inc.target + "."});
        }
        pref.inclusions[i] = inc;
      }
      var exclusions = req.params.exclusions;
      pref.exclusions = [];
      var exc = undefined;
      for (var i = 0; i < exclusions.length; i += 1) {
        exc = exclusions[i];
        if (/\s/g.test(inc.target)) {
          res.send({success: false, reason: "Cannot include whitespace in "
          + "inclusive target " + inc.target + "."});
        }
        pref.exclusions[i] = exc;
      }
      pref.save();
      res.send({success: true});
    });
  },
  destroy: function (req, res) {
   
  }
}  


