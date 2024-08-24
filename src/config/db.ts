import mongoose from 'mongoose';
const MONGO_URL =
  'mongodb+srv://hongfeidu3:KPI6WfaTVQwsKRzo@cluster0.quhuxx1.mongodb.net/MyResumes?retryWrites=true&w=majority&appName=Cluster0';
export const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('connect mongose successfully');
  } catch (error) {
    console.log(error);
  }
};
