import mongoose from 'mongoose';

// Remove deprecation warning
mongoose.set('strictQuery', false); // or true if you prefer

// Use 127.0.0.1 to avoid ::1 IPv6 ECONNREFUSED
const MONGO_URI = 'mongodb://127.0.0.1:27017/twitter_dev';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1); // Stop the app
  }
};
