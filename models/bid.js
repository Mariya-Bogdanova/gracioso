import mongoose from 'mongoose';
mongoose.pluralize(null);

const BidSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
    match: /[A-Za-z]\w+/,
  },
  userPhone: {
    type: Number,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Bid', BidSchema);
