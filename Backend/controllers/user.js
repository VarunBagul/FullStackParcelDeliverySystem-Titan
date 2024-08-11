//import model for user
const User = require("../models/User");

//Deleting user functionality
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(201).json("The user has been deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get all users functionality

const getAllUsers = async (req, res) => {
  console.log("all users");
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getAllUsers, deleteUser };
