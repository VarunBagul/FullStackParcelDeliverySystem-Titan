//import express
const express = require("express"); //require is used in nodejs
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

//2 take this after auth.js
const authRoute = require("./routes/auth");

//to use .env configure it
dotenv.config();

//to initialize app
const app = express();

//middlewares
app.use(cors());
app.use(express.json()); //express has function json i.e it can accept json data from anywhere

//ROUTES 2A
app.use("/auth", authRoute); //now we can use authRoute we have imported

//DATABASE CONNECTION
//we use mongoose
const DB = process.env.DB;
mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection is successful ");
  })
  .catch((err) => {
    console.log(err);
  });

//SERVER
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); //TEXT interportation done using` and $
}); //to listen to a server takes 2 args port and anonymous callback function
