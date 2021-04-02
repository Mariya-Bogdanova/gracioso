import express from 'express';
import ArticleModel from '../../models/article.js'
import InfoModel from '../../models/info.js'
const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    try {
      const number = 3;
      const adminName = res.locals.adminName;
      const articles = await ArticleModel.find();
      const infoAboutUs = await InfoModel.find();
      res.render('gracioso', { articles, adminName, infoAboutUs, number })
    } catch (err) {
      console.error(err.message);
    }
  })
// .post((req, res) => {
//   try {
//     res.render('gracioso')
//   } catch (err) {
//     console.error(err.message);
//   }
// })
export default router;


