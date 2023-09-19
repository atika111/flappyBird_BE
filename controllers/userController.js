const User = require("../models/User");

async function getAllUsers(req, res) {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).send(users);
  } catch (error) {
    console.log("Error getting all users", error);
    res.status(500).send({ error: "Internal server error" });
  }
}

module.exports = {getAllUsers};
