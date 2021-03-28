import mongoose from 'mongoose';
mongoose.pluralize(null);

const ArticleSchema = new mongoose.Schema({
  articleTitle: {
    type: String,
    required: true,
  },
  articleDescription: {
    type: String,
    required: true,
  },
  articlePrice: {
    type: Number,
    required: true,
  },
  articleArticle: {
    type: String,
  },
  articleImg: {
    type: String,
  },
  articleBids:  [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bid'
  }]
});

ArticleSchema.pre('save', function (next) {
  this.articleArticle = this.id.slice(18);
  next();
});


export default mongoose.model('Article', ArticleSchema);
