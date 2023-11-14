require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

const connectDB = require('./config/db');
const indexRoutes = require('./routes/index.routes');
const errorHandlerMiddleware = require('./middlewares/error-handler.middleware');

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use('/v1', indexRoutes);

app.use(errorHandlerMiddleware);

connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
