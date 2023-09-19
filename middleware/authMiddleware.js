const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.token) res.status(401).send('Token required.');
  const token = cookies.token;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid token');
    }
    req.body.userId = decoded.id;
  });
  next();
};

const passwordMatch = (req, res, next) => {
  const repPassword = req.body.repPassword;
  if (!repPassword)
    return res.status(400).send('Please, provide repPassword field');
  const isMatch = req.body.password !== repPassword;
  if (isMatch) {
    return res
      .status(400)
      .send('Incorrect password. Please double-check your password.');
  }
  next();
};

const verifyPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send('User not found. Please log in again.');
    }

    const isVerified = await bcrypt.compare(password, user.password);
    if (!isVerified) {
      return res.status(400).send('Wrong password. Please try again.');
    }
    req.body.userId = user._id;
    next();
  } catch (error) {
    console.log('error: ', error);
  }
};

module.exports = { verifyPassword, passwordMatch, verifyToken };
