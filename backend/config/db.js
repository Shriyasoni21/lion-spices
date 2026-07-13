import mongoose from 'mongoose';

const connectDB = async (mongoUri) => {
  const uri = mongoUri || process.env.MONGODB_URI;

  if (!uri) {
    console.error(
      'MongoDB connection error: MONGODB_URI environment variable is missing.\n' +
        'Please set MONGODB_URI to your MongoDB Atlas connection string in your .env file, for example:\n' +
        'MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/lion-spices?retryWrites=true&w=majority'
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.error(
      'Ensure MONGODB_URI is a valid MongoDB Atlas URI, credentials are correct, and your cluster accepts connections from this IP/network.'
    );
    process.exit(1);
  }
};

export default connectDB;
