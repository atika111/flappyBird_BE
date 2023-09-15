const bcrypt = require("bcrypt");
const User = require("../models/User");

const passwordMatch = (req, res, next) => {
    const isMatch = req.body.password !== req.body.repPassword;
    if (isMatch) {
      return res
        .status(400)
        .send("Incorrect password. Please double-check your password.");
    }
    next();
  };

const verifyPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send("User not found. Please log in again.");
    }

    const isVerified = await bcrypt.compare(password, user.password);
    if (!isVerified) {
      return res.status(400).send("Wrong password. Please try again.");
    }
    req.body.userId = user._id;
    next();
  } catch (error) {
    console.log("error: ", error);
  } 
};

module.exports = { verifyPassword, passwordMatch };
