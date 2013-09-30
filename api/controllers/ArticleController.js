/**
 * ArticleController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var obscura = require('Obscura');

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
    var viewContent = function(content) {
	return content;
    }
    var filters = []
    if (req.session.user) {
      //getting the user's filter prefs - even if a guest user set prefs on the index page, they will be stored here.
      filters = req.session.user.preferences.filters;
    }
    var article = {};
    Article.find().where({id:  req.param("article")}).exec(function(err, articles) {
      article = articles;
    });
    
    var content = obscura.filterContent(filters, article, "html", viewContent);
    sails.log.warn(content);
    res.view({content: content, title: Article.find(req.param("article")).title});
  }

};
