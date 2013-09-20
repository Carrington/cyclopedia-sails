/**
 * ArticleController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  /* e.g.
  sayHello: function (req, res) {
    res.send('hello world!');
  }
  */
  
  /**
   * /article/create
   */ 
  create: function (req,res) {

    // This will render the view: 
    // /var/www/html/cyclopedia-sails/views/Article/create.ejs
    res.view();

  },


  /**
   * /article/view
   */ 
  view: function (req,res) {

    // This will render the view: 
    // /var/www/html/cyclopedia-sails/views/Article/view.ejs
    Article.
    res.view();

  }

};
