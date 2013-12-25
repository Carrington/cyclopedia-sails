module.exports = function isModerator (req, res, next) {
  //User be a guest, yo
  if (req.session.user == undefined) return res.redirect("/guestreminder");  

  var userId = req.session.user.id;

  Role
  .findOneByUserId(userId)
  .exec( function foundUser (err, user) {
    
    if (err) return next(err);

    //The user has a role omfg

    if (role.parent < 3) return res.redirect(req.redirect);

    next();
  });
};
