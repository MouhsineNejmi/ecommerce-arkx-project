require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const indexRoutes = require('./routes/index.routes');

const app = express();

app.use(express.json());
app.use('/v1', indexRoutes);

connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
