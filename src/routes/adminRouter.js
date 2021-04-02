import express from 'express';
import bcrypt from 'bcrypt';
import AdminModel from '../../models/admin.js';
import InfoModel from '../../models/info.js';

const router = express.Router();
const logger = console;

function failAuth(res) {
  return res.status(401).end();
}
// изменение информации о магазине - переход на форму создания
router.route('/info')
  .get((req, res) => {
    try {
      return res.render('aboutUsForm', { numberId: "0", box1: 'box1', box2: 'box2' });
    } catch (err) {
      console.error(err.message);
    }
  })
  // изменение информации о магазине - принятия новой формы
  .post(async (req, res) => {
    try {
      const { inputAboutUs, inputOurMasters, inputСontacts, adminTel, adminMail } = req.body;
      let liAboutUs1 = [];
      let liAboutUs2 = [];
      let liAboutUs3 = [];
      for (let key in req.body) {
        if (key.substr(key.length - 1) === '1') { liAboutUs1.push(req.body[key]) }
        else if (key.substr(key.length - 1) === '2') { liAboutUs2.push(req.body[key]) }
        else if (key.substr(key.length - 1) === '3') { liAboutUs3.push(req.body[key]) }
      }
      const infoAboutUs = await new InfoModel({ inputAboutUs, inputOurMasters, inputСontacts, adminTel, adminMail, liAboutUs1, liAboutUs2, liAboutUs3 }).save()
      return res.redirect('/');
    } catch (err) {
      console.error(err.message);
    }
  })

  router.route('/infoU')
  .get(async(req, res) => {
    try {
      const number = 3;
      const infoAboutUs = await InfoModel.find()
      return res.render('updateAboutUsForm', {infoAboutUs, number });
    } catch (err) {
      console.error(err.message);
    }
  })

//аутентификация админа
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
// выход админа
router.get('/signout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.clearCookie(req.app.get('session cookie name'));
    return res.redirect('/');
  });
});

//вход для админа
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










