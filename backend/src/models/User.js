import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: Date, required: true },
  pictureUrl: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
