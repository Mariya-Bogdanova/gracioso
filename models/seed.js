import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import AdminModel from '../models/admin.js';

mongoose.connect('mongodb://localhost:27017/gracioso', { useNewUrlParser: true });


async function createAdmin() {
  const hashedPassword = await bcrypt.hash('qwerqwer', process.env.SALT_ROUNDS ?? 10);
  await AdminModel.create({
    adminName: 'qwer',
    adminPassword: hashedPassword,
  });
}

createAdmin()
