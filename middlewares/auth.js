export default (req, res, next) => {
  if (!req.session.admin) {
    return res.redirect('/signin');
  }
  return next();
};
