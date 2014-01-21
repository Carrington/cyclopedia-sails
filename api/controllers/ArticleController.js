/**
 * ArticleController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var obscura = require('Obscura');

module.exports = {

  /**
   * /article/create
   */ 
  create: function (req,res) {
    if (req.method != "POST" && req.method != "PUT") {
      var error = new Error("Save is only available via POST or PUT");
      res.send(500,error);
    }
    // This will render the view: 
    // /var/www/html/cyclopedia-sails/views/Article/create.ejs
    res.view();

  },


  /**
   * /article/view
   */ 
  view: function (req,res) {
    if (req.method != "GET" && req.method != "HEAD") {
      var error = new Error("Find is only available via GET or HEAD.");
      res.send(500,error);
    }
    // This will render the view: 
    // /var/www/html/cyclopedia-sails/views/Article/view.ejs
    
    var filters = []
    
    if (req.session.user) {
      //getting the user's filter prefs - even if a guest user set prefs on the index page, they will be stored here.
      filters = req.session.user.preferences.filters;
    }

    var articleId = req.param.article;
    
    Article.findOneById(articleId).done(function(err, article) {
      var content = '';
      obscura.filterContent(filters, article[0].body, "html",
        function(err, val) {
          sails.log.warn(val);
          content = val;
        });
        res.send({content: content, title: article[0].title});
    });
  },
  destroy: function (req, res) {
    if (req.method != "DELETE") {
      var error = new Error("Destroy is only available via DELETE");
      res.send(500,error)
    }
    var articleId = req.params.article;
    Article.findOneById(articleId).done(function (err, article) {
      if (err) res.send(500, "Database Error: Could not connect. Details: " + err);
      article.destroy().done(function (err2, resp) {
        if (err) res.send(500, "Database Error: Could not destroy article. Details: " + err2);
        sails.log.info("Article " + articleId + " destroyed.");
        res.send({success: true});
      });
    });
  },
  update: function (req, res) {
    if (req.method != "POST" && req.method != "PUT") {
      var error = new Error("Save is only available via POST or PUT");
      res.send(500,error);
    }
    var articleId = req.params.article;
    Article.findOneById(articleId).done(function (err, article) {
      if (err) res.send(500, "Database Error: Could not connect. Details: " 
       + error);
      //TODO update this for versioning
      article.body = req.params.body;
      article.title = req.params.title;
      //TODO add auto link updating or come up with a better scheme
      article.save().done(function (err) {
        if (err) res.send(500, "Database Error: Could not connect. Details: "
         + error);
        sails.log.info("Article " + articleId + " updated.");
        res.send({success: true});
      });
    });
  }

};
