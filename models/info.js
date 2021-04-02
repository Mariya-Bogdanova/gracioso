import mongoose from 'mongoose';
mongoose.pluralize(null);

const InfoSchema = new mongoose.Schema({
  inputAboutUs: {
    type: String,
    required: true,
  },
  inputOurMasters: {
    type: String,
    required: true,
  },
  inputСontacts: {
    type: String,
    required: true,
  },
  adminTel: {
    type: String,
    required: true,
  },
  adminMail: {
    type: String,
    required: true,
  },
  liAboutUs1: {
    type: [String],
    required: true,
  },
  liAboutUs2: {
    type: [String],
    required: true,
  },
  liAboutUs3: {
    type: [String],
    required: true,
  },
});

export default mongoose.model('Info', InfoSchema);
