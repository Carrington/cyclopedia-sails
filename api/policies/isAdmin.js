module.exports = function isAdmin (req, res, next) {

  //user be a guest, yo
  if (req.session.user == undefined) {
    return res.redirect('/guestReminder');
  }
  var userId = req.session.user.id;

  Role
  .findOneByUserId(userId)
  .exec( function foundUser (err, user) {

    if (err) return next(err);


    //The user has a role omfg

    if (role.parent < 4) return res.redirect(req.redirect);

    next();
  });

}
