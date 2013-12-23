/**
 * Routes
 *
 * Sails uses a number of different strategies to route requests.
 * Here they are top-to-bottom, in order of precedence.
 *
 * For more information on routes, check out:
 * http://sailsjs.org/#documentation
 */



/**
 * (1) Core middleware
 *
 * Middleware included with `app.use` is run first, before the router
 */


/**
 * (2) Static routes
 *
 * This object routes static URLs to handler functions--
 * In most cases, these functions are actions inside of your controllers.
 * For convenience, you can also connect routes directly to views or external URLs.
 *
 */

module.exports.routes = {

  
  '/signup' : {
    controller: 'main',
    action: 'signup'
  },
  '/login' : {
    controller: 'main',
    action: 'login'
  },
  '/view/:article' : {
    controller: 'Article',
    action: 'view'
  },
  '/user/:user' : {
    controller: 'User',
    action: 'view'
  }

};


