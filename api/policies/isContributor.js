module.exports = function isAdmin (req, res, next) {
  var userId = req.session.user.id;

  if (userId == undefined) return res.redirect("/guestreminder");

  Role
  .findOneByUserId(userId)
  .exec( function foundUser (err, user) {

    if (err) return next(err);

    if (role.parent < 2) return res.redirect(req.redirect);

    next();
  });

}
