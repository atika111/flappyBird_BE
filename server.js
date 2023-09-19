// Server Requires
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser')

const run = require('./config/dbConn');
const { globalErrorHandler } = require('./middleware/globalErrorHandler');

const allowedOrigin = 'http://localhost:5173'

const corsOptions = {
  origin: allowedOrigin,
  credentials: true, // Enable credentials (cookies)
};
// Global Middleware
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));


// Routes setup
const authRoute = require('./routes/authRoutes');
const scoresRoute = require('./routes/scoreRoutes');
const usersRoute = require('./routes/userRoutes');

app.use('/auth', authRoute);
app.use('/scores', scoresRoute);
app.use('/users', usersRoute);
app.use(globalErrorHandler);

// Server & MongoDB Connection
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  try {
    run()
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});
