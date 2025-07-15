import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, 
      socketTimeoutMS: 45000, 
      connectTimeoutMS: 30000, 
      maxPoolSize: 10, 
      heartbeatFrequencyMS: 10000, 
      maxIdleTimeMS: 30000, 
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err; 
  }
};