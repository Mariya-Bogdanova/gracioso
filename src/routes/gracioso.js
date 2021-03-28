import express from 'express';
import ArticleModel from '../../models/article.js'

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    try {
      const articles = await ArticleModel.find()
      res.render('gracioso', {articles})
    } catch (err) {
      console.error(err.message);
    }
  })
  .post((req, res) => {
    try {
      res.render('gracioso')
    } catch (err) {
      console.error(err.message);
    }
  })
export default router;


