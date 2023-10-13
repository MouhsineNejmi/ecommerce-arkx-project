
require('dotenv').config();
const express = require('express');
const app = express();
const passport = require('passport');
const cookieParser = require('cookie-parser');

const passportConfig = require('./config/passport');

const connectDB = require('./config/db');
const indexRoutes = require('./routes/index.routes');

require('dotenv').config();
passportConfig(passport);

app.use(express.json());
app.use(cookieParser());
app.use('/v1', indexRoutes);

connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
