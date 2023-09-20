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

async function deleteUser(req, res) {
    const userId = req.params.id
    try {
         await User.findByIdAndDelete(userId)
        res.status(200).send(`successful deleted user: ${userId}`)
    } catch (error) {
        console.log('Error deleting user', error);
        res.status(500).send({error: "Internal Error deleting"})
        
    }
}

async function updateUser(req, res) {
    try {
        const userId = req.params.id 
        const updatedUserData = req.body

        const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
            new: true
        })

        if (!updatedUser) {
            res.status(404).send({message: "User not found"})
        }
        res.status(200).send(updatedUser)
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' }); 
    }
}

module.exports = {getAllUsers, deleteUser, updateUser};
