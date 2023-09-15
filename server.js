// Server Requires
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const run = require("./config/dbConn");
const {globalErrorHandler} = require('./middleware/globalErrorHandler');

// Global Middleware
const app = express();
app.use(cors());
app.use(express.json());

// Routes setup
const authRoute = require("./routes/authRoutes");
const scoresRoute = require("./routes/scoreRoutes");
const usersRoute = require("./routes/userRoutes");

app.use("/auth", authRoute);
app.use("/scores", scoresRoute);
app.use("/users", usersRoute);
app.use(globalErrorHandler);

// Server & MongoDB Connection
const PORT = process.env.PORT;

app.listen(PORT, () => {
  try {
    run.dbConnection();
    console.log("Server connected!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
});
