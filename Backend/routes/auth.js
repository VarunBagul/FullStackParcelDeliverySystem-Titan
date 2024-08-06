//1
const express = require("express");

//2
const router = express.Router();

//4
const CryptoJs = require("crypto-js");

//5 import jwt
const jwt = require("jsonwebtoken");

//6 import user models from models
const User = require("../models/User");

//9 as process.env.PASS used in registration encryption
const dotenv = require("dotenv");
dotenv.config();

//7 REGISTRATION
//this will be posting data and 2 args(route,anonymous func(req,res)) 7a asyn func and await as it may take time before saved in db
router.post("/register", async (req, res) => {
  //registration functionality

  //create a newUser from User object
  const newUser = User({
    fullname: req.body.fullname,
    email: req.body.email,
    age: req.body.age,
    country: req.body.country,
    address: req.body.address,
    password: CryptoJs.AES.encrypt(
      req.body.password,
      process.env.PASS
    ).toString(),
  });
  //if any error
  try {
    const user = await newUser.save(); //save func from mongodb
    res.status(201).json(user); //if success send user to admin
  } catch (error) {
    res.status(500).json(error);
  }
});

//8 LOGIN
router.post("/login", async (req, res) => {
  //Login functionality

  try {
    //make sure user in db so findOne will do this
    const user = await User.findOne({ email: req.body.email }); //User model madhun findOne(takes 1 field) i.e email
    if (!user) {
      //no user so return msg to admin
      return res.status(401).json("Your have not registered ");
    }

    //if registered
    //decrypt the pass
    const hashedPassword = CryptoJs.AES.decrypt(
      user.password,
      process.env.PASS
    ); //decrypt pass from user pass and .env pass
    const originalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);

    //compare originalpass with send pass
    if (originalPassword !== req.body.password) {
      //not equal so return error
      return res.status(500).json("Wrong Password");
    }
    //pass match so proceed with login

    //pass and info separated
    const { password, ...info } = user._doc; //func from mongodb

    //Token
    const accessToken = jwt.sign({
      id: user._id,
      role: user.role,
    });
  } catch (error) {}
});

//3 export router as to use it in index.js
module.exports = router;
