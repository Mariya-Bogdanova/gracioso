import express from 'express';
import bcrypt from 'bcrypt';
import AdminModel from '../../models/admin.js';

const router = express.Router();
const logger = console;

function failAuth(res) {
  return res.status(401).end();
}

router
  .route('/signin')
  .post(async (req, res) => {
    const { adminName, adminPassword } = req.body;
    try {
      const admin = await AdminModel.findOne({ adminName }).exec();
      if (!admin) {
        return failAuth(res);
      }
      const isValidPassword = await bcrypt.compare(adminPassword, admin.adminPassword);
      if (!isValidPassword) {
        return failAuth(res);
      }
      req.session.admin = admin;
    } catch (err) {
      logger.error(err);
      return failAuth(res);
    }
    return res.end();
  });

router.get('/signout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.clearCookie(req.app.get('session cookie name'));
    return res.redirect('/');
  });
});

router.route('/:admin')
  .get((req, res) => {
    try {
      if (req.params.admin === 'private office') {
        return res.render('secret/password');
      }
      return res.status(404).render('notfound');
    } catch (err) {
      logger.error(err);
      return failAuth(res);
    }
  })

export default router;










