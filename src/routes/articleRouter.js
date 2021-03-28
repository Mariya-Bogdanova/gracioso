import express from 'express';
import multer from 'multer';
import ArticleModel from '../../models/article.js'

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '/uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })

// const upload = multer({ storage: storage })
const upload = multer({ dest: 'public/uploads/' })
const router = express.Router();
router.route('/')
  .get(async (req, res) => {
    try {
      res.render('newArticle')
    } catch (err) {
      console.error(err.message);
    }
  })
  .post(upload.single('articleImg'), async (req, res, next) => {
    try {
      // const filedata = req.file;
      const { path } = req.file;
      const { articleTitle, articleDescription, articlePrice } = req.body;
      const newArticle = await new ArticleModel({ articleTitle, articleDescription, articlePrice, articleImg: path, }).save();
      console.log(newArticle)
      res.redirect('/')
    } catch (err) {
      console.error(err.message);
    }
  })

export default router;



