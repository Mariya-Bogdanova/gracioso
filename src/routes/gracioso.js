import express from 'express';
import ArticleModel from '../../models/article.js';
import InfoModel from '../../models/info.js';

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    try {
      const adminName = res.locals.adminName;
      const articles = await ArticleModel.find();
      const infoAboutUs = await InfoModel.find();
      res.render('gracioso', { articles, adminName, infoAboutUs })
    } catch (err) {
      console.error(err.message);
    }
  })

export default router;


