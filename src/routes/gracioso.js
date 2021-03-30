import express from 'express';
import ArticleModel from '../../models/article.js'

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    try {
      const adminName = res.locals.adminName;
      const articles = await ArticleModel.find()
      res.render('gracioso', { articles, adminName })
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


