// models/User.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  password: { type: String },
  // Add other fields as needed
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
