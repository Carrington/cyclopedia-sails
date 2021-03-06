/**
 * Policy mappings (ACL)
 *
 * Policies are simply Express middleware functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect just one of its actions.
 *
 * Any policy file (e.g. `authenticated.js`) can be dropped into the `/policies` folder,
 * at which point it can be accessed below by its filename, minus the extension, (e.g. `authenticated`)
 *
 * For more information on policies, check out:
 * http://sailsjs.org/#documentation
 */


module.exports.policies = {

  // Default policy for all controllers and actions
  // (`true` allows public access) 
  '*': true,
  Preference:  {
    '*': false,
    'create': 'isAdmin',
    'find': true,
    'findAll': true,
    'update': false,
    'destroy': false
  },
  User: {
    '*': false,
    'create': true,
    'find': true,
    'findAll': 'isModerator',
    'update': false,
    'updateSelf': true,
    'updateOther': 'isAdmin',
    'destroy': 'isAdmin',
    'view': true
  },
  Article: {
    '*': false,
    'create': 'isContributor',
    'find': true,
    'findAll': true,
    'update': 'isContributor',
    'destroy': 'isAdmin'
  },
  UserPreference: {
    '*': false
  }
};


