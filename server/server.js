
require('dotenv').config();
const express = require('express');
const app = express();
const passport = require('passport');
const connectDB = require('./config/db');
const indexRoutes = require('./routes/index.routes');



app.use(express.json());
app.use('/v1', indexRoutes);

require('./config/passport')(passport);

connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
