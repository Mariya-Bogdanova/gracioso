export default (req, res, next) => {
  res.locals.adminName = req.session.admin?.adminName;
  next();
};
