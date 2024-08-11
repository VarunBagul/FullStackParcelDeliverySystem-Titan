//1
const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/auth");

//7 REGISTRATION
//this will be posting data and 2 args(route,anonymous func(req,res)) 7a asyn func and await as it may take time before saved in db
router.post("/register", registerUser);

//8 LOGIN
router.post("/login", loginUser);

//3 export router as to use it in index.js
module.exports = router;
