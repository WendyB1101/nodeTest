// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     await mongoose.connect("mongodb://127.0.0.1:27017/my-node-project", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log("MongoDB connected");
//   } catch (error) {
//     console.error("MongoDB connection failed:", error.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

// db.ts
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/my-node-project';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error(' MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};