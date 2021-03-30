import express from 'express';
import multer from 'multer';
import ArticleModel from '../../models/article.js'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
const upload = multer({ storage: storage })
const router = express.Router();

router.route('/')
  // форма для создания новыго артикля
  .get(async (req, res) => {
    try {
      res.render('newArticle')
    } catch (err) {
      console.error(err.message);
    }
  })
  // принять созданный новый артикль
  .post(upload.single('articleImg'), async (req, res, next) => {
    try {
      // const filedata = req.file;
      const { path } = req.file;
      const { articleTitle, articleDescription, articlePrice } = req.body;
      const newArticle = await new ArticleModel({ articleTitle, articleDescription, articlePrice, articleImg: path.substr(6), }).save();
      res.redirect('/')
    } catch (err) {
      console.error(err.message);
    }
  })

  router.route('/:id')
  // форма для изменения новыго артикля
  .get(async (req, res) => {
    try {
      const article = ArticleModel.findById(req.params.id)
      res.render('updateArticle', article )
    } catch (err) {
      console.error(err.message);
    }
  })
export default router;



