const CryptoJs = require("crypto-js");

const jwt = require("jsonwebtoken"); //import jwt

const User = require("../models/User"); //import user models from models

const dotenv = require("dotenv"); // as process.env.PASS used in registration encryption
dotenv.config();
//Register User

const registerUser = async (req, res) => {
  //create a newUser from User object
  console.log("Request Body:", req.body); // Log incoming request data

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
    console.log("New User Object:", newUser); // Log the new user object before saving

    const user = await newUser.save(); //save func from mongodb
    console.log("Saved User:", user); // Log the saved user

    res.status(201).json(user); //if success send user to admin
  } catch (error) {
    console.error("Error Saving User:", error); // Log any error that occurs

    res.status(500).json(error);
  }
};

//function for login
//Login User
// const loginUser = async (req, res) => {
//   try {
//     //make sure user in db so findOne will do this
//     const user = await User.findOne({ email: req.body.email }); //User model madhun findOne(takes 1 field) i.e email
//     console.log("Request Body:", req.body);
//     if (!user) {
//       //no user so return msg to admin
//       return res.status(401).json("Your have not registered ");
//     }

//     //if registered
//     //decrypt the pass
//     const hashedPassword = CryptoJs.AES.decrypt(
//       user.password,
//       process.env.PASS
//     ); //decrypt pass from user pass and .env pass
//     const originalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);
//     console.log("Original Password:", originalPassword);

//     //compare originalpass with send pass
//     if (originalPassword !== req.body.password) {
//       //not equal so return error
//       return res.status(500).json("Wrong Password");
//     }
//     //pass match so proceed with login

//     //pass and info separated
//     const { password, ...info } = user._doc; //func from mongodb
//     console.log("User Info:", info);

//     //Token
//     const accessToken = jwt.sign(
//       {
//         id: user._id,
//         role: user.role,
//       },
//       process.env.JWT_SEC,
//       //specify time for our accestoken to expire in 10days
//       { expiresIn: "10d" }
//     );
//     console.log("Access Token:", accessToken);
//     //send this accesstoken to frontend
//     res.status(200).json(...info, accessToken); //only info send ,pass not send and accesstoken send
//   } catch (error) {
//     console.error("Error:", error); // Log error to console
//     res.status(500).json(error);
//   }
// };

const loginUser = async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });
    console.log("Request Body:", req.body);

    if (!user) {
      return res.status(401).json({ message: "You have not registered" });
    }

    // Decrypt the password
    const hashedPassword = CryptoJs.AES.decrypt(
      user.password,
      process.env.PASS
    );
    const originalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);
    console.log("Original Password:", originalPassword);

    // Compare passwords
    if (originalPassword !== req.body.password) {
      return res.status(500).json({ message: "Wrong Password" });
    }

    // Passwords match, prepare user info and token
    const { password, ...info } = user._doc;
    console.log("User Info:", info);

    // Generate access token
    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SEC,
      { expiresIn: "10d" }
    );
    console.log("Access Token:", accessToken);

    // Send response
    res.status(200).json({ ...info, accessToken });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { loginUser, registerUser };
