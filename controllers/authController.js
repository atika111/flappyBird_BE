const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");

async function signUp(req, res) {
  try {
    const user = req.body;
    const newUser = await User.create({
      email: user.email,
      password: user.password,
      repPassword: user.repPassword,
      firstName: user.firstName,
      lastName: user.lastName,
      nickname: user.nickname,
    });
    res.status(201).send('successfully signed up!');
  } catch (error) {
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.email === 1
    ) {
      return res.status(400).send({ error: "Email is already in use" });
    }
    if (error.name === "ValidationError") {
      const validationErrors = {};
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      res.status(400).send({ errors: validationErrors });
    } else {
      console.error("Error creating user:", error);
      res.status(500).send({ error: "Internal server error" });
    }
  }
}

async function logIn(req, res) {
  const userId = req.body.userId.valueOf()
  console.log('userId: ', userId);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const token = jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET)
    res.cookie('token', token, { httpOnly: true });
    res.send('Cookie has been saved successfully');

  } catch (error) {
    console.error("Error finding user by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  
  
}

module.exports = { signUp, logIn };
