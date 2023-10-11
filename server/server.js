require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();



connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
