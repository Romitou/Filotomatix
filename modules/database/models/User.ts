import mongoose from 'mongoose';

export default mongoose.model('User',
  new mongoose.Schema({
    mail: String,
    password: String,
    isAdmin: Boolean
  })
);
