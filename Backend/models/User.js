//import mongoose to start scehma
const mongoose = require("mongoose"); //1

//2
const UserSchema = mongoose.Schema(
  {
    //object 2b

    fullname: { type: String, require: true },
    email: { type: String, require: true },
    age: { type: Number },
    country: { type: String, require: true },
    address: { type: String, require: true },
    password: { type: String, require: true },
    status: { type: Number, default: 0 }, //this user has just been created and email not sent so its 0
    role: { type: String, default: "user" }, //like its admin or user by default its user
  },
  {
    timestamp: true, //like when this user added we also record its creation time
  }
);

//2a
//export the files before schema
module.exports = mongoose.model("User", UserSchema);
