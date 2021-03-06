import express from 'express';
import hbs from 'hbs';

import InfoModel from '../../models/info.js';

const router = express.Router();

hbs.registerHelper("getInputs", (sumInputs, box, ulInputs) => {
  let str = '';
  for (let i = 0; i < sumInputs; i++) {
    str += `<input 
    id="liAboutUs${i}box${box + 1}" 
    name="liAboutUs${i}box${box + 1}" 
    type="text" 
    value="${ulInputs[box][i]}"
    >`;
  }
  return new hbs.handlebars.SafeString(str);
})

router.route('/')
// создание информации о магазине - переход на форму создания
  .get((req, res) => {
    try {
      return res.render('aboutUsForm', { numberId: "0", box1: 'box1', box2: 'box2' });
    } catch (err) {
      console.error(err.message);
    }
  })
  // создание информации о магазине - принятия информации из формы
  .post(async (req, res) => {
    try {
      await InfoModel.deleteMany()
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

router.route('/u')
  // изменение информации о магазине - переход на форму изменения
  .get(async (req, res) => {
    try {
      const infoAboutUs = await InfoModel.find();
      const number1 = infoAboutUs[0].liAboutUs1.length;
      const number2 = infoAboutUs[0].liAboutUs2.length;
      const number3 = infoAboutUs[0].liAboutUs3.length;
      const ulInputs = [
        infoAboutUs[0].liAboutUs1,
        infoAboutUs[0].liAboutUs2,
        infoAboutUs[0].liAboutUs3
      ]
      const box1 = 0;
      const box2 = 1;
      const box3 = 2;
      return res.render('updateAboutUsForm', {
        infoAboutUs: infoAboutUs[0],
        number1, number2, number3,
        box2, box3, box1,
        ulInputs
      });
    } catch (err) {
      console.error(err.message);
    }
  })
  // изменение информации о магазине - принятия  формы
  .put(async (req, res) => {
    try {
      const { inputAboutUs, inputOurMasters, inputСontacts, adminTel, adminMail } = req.body;
      let liAboutUs1 = [];
      let liAboutUs2 = [];
      let liAboutUs3 = [];
      for (let key in req.body) {
        if (req.body[key] !== "" && key.substr(key.length - 1) === '1') { liAboutUs1.push(req.body[key]) }
        else if (req.body[key] !== "" && key.substr(key.length - 1) === '2') { liAboutUs2.push(req.body[key]) }
        else if (req.body[key] !== "" && key.substr(key.length - 1) === '3') { liAboutUs3.push(req.body[key]) }
      }
      await InfoModel.updateMany({ inputAboutUs, inputOurMasters, inputСontacts, adminTel, adminMail, liAboutUs1, liAboutUs2, liAboutUs3 });
      return res.redirect('/');
    } catch (err) {
      console.error(err.message);
    }
  })

export default router;










