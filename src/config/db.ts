import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    const url = process.env.MONGO_URL as string;
    await mongoose.connect(url);
    console.log('connect mongose successfully');
  } catch (error) {
    console.log(error);
  }
};
