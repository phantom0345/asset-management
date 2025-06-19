const mongoose = require("mongoose");
require("dotenv").config();  // Load environment variables

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined. Check your .env file.");
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tlsAllowInvalidCertificates: true,
    });

    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
