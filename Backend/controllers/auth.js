const CryptoJs = require("crypto-js");

const jwt = require("jsonwebtoken"); //import jwt

const User = require("../models/User"); //import user models from models

const dotenv = require("dotenv"); // as process.env.PASS used in registration encryption
dotenv.config();

//Register User

const registerUser = async (req, res) => {
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
};

//function for login
//Login User
const loginUser = async (req, res) => {
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
    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SEC,
      //specify time for our accestoken to expire in 10days
      { expiresIn: "10d" }
    );
    //send this accesstoken to frontend
    res.status(200).json(...info, accessToken); //only info send ,pass not send and accesstoken send
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { loginUser, registerUser };
