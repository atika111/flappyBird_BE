const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email is already in use"],
    lowercase: true,
    trim: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Invalid email format",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 8 characters long"],
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  nickname: {
    type: String,
    required: [true, "Nickname is required"],
    trim: true,
  },
  picture: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
