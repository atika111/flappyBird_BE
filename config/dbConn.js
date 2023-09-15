const mongoose = require('mongoose');
require('dotenv').config();

const URI = process.env.MONGODB_URI;

const dbConnection = () => {
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("MongoDB connected!");
  }).catch((err) => {
    console.error("MongoDB connection error:", err);
  });
}

module.exports = { dbConnection };
