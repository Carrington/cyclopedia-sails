module.exports = function isModerator (req, res, next) {
  var userId = req.session.user.id;

  Role
  .findOneByUserId(userId)
  .exec( function foundUser (err, user) {
    
    if (err) return next(err);

    //User be a guest, yo
    if ( ! role ) return res.redirect('/guestReminder');

    //The user has a role omfg

    if (role.parent < 3) return res.redirect(req.redirect);

    next();
  });
};
