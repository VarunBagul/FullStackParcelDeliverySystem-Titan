const express = require("express");
const { deleteUser, getAllUsers } = require("../controllers/user");

const router = express.Router();

//1) DELETING THE USER

router.delete("/:id", deleteUser);

//2) GET ALL USERS
router.get("/", getAllUsers);

module.exports = router;
