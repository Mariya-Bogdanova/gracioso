import mongoose from 'mongoose';

// export default mongoose.connect(`${process.env.DB_URL}`, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });
mongoose.set('useFindAndModify', false);
export default mongoose.connect('mongodb://localhost:27017/gracioso', { useNewUrlParser: true, useUnifiedTopology: true });
