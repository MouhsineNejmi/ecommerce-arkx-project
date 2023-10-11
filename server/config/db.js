const mongoose = require('mongoose');
const { MONGO_URI } = require('./auth');

const connectDB = async () => {
  const connection = await mongoose.connect(process.env.MONGODB_URI);
  console.log('Database is connected...');
};

module.exports = connectDB;
