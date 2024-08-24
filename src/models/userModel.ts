import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      unique: true,
    },

    name: {
      type: String,
      unique: true,
    },

    email: {
      type: String,
      unique: true,
    },
    profilePictureUrl: {
      type: String,
    },
    profileDataForResume: {
      type: Object,
      default: null,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models.users) {
  delete mongoose.models.users;
}

const UserModel = mongoose.model('users', userSchema);
export default UserModel;
