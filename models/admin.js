import mongoose from 'mongoose';
mongoose.pluralize(null);

const AdminSchema = new mongoose.Schema({
  adminName: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    match: /[A-Za-z]\w+/,
  },
  adminPassword: {
    type: String,
    required: true,
    minlength: 8,
  },
});

export default mongoose.model('Admin', AdminSchema);
