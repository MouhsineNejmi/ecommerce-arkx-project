const express = require('express');
const app = express();
const passport = require('passport');
const indexRoutes = require('./routes/index.routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/order.routes');


const connectDB = require('./config/db');


require('dotenv').config(); 


app.use(express.json());
app.use('/v1', indexRoutes);

require('./config/passport')(passport);

connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
