// //import express
// const express = require("express"); //require is used in nodejs
// const dotenv = require("dotenv");
// const cors = require("cors");
// const mongoose = require("mongoose");

// //2 take this after auth.js
// const authRoute = require("./routes/auth");

// //to use .env configure it
// dotenv.config();

// //to initialize app
// const app = express();

// const userRoute = require("./routes/user");
// const parcelRoute = require("./routes/parcel");
// //middlewares
// app.use(cors());
// app.use(express.json()); //express has function json i.e it can accept json data from anywhere

// //ROUTES 2A
// app.use("/auth", authRoute); //now we can use authRoute we have imported

// app.use("/users", userRoute);

// app.use("/parcels", parcelRoute);

// //DATABASE CONNECTION
// //we use mongoose
// const DB = process.env.DB;
// mongoose
//   .connect(DB)
//   .then(() => {
//     console.log("DB connection is successful ");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// //SERVER
// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`); //TEXT interportation done using` and $
// }); //to listen to a server takes 2 args port and anonymous callback function

// Import dependencies
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

console.log("Server is running"); // Place this at the beginning of your main file

// Import routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const parcelRoute = require("./routes/parcel");

// Configure .env
dotenv.config();

// Initialize app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Express can accept JSON data from requests

// Routes
app.use("/api/v1/auth", authRoute); //initially it was just ("/auth",authRoute) then we added api/v1 for testing easily in Postman
//console.log(authRoute);
app.use("/api/v1/users", userRoute);
//console.log(userRoute);

app.use("/api/v1/parcels", parcelRoute);
//console.log(parcelRoute);
// Database connection
const DB = process.env.DB;
mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection is successful");
  })
  .catch((err) => {
    console.log(err);
  });

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // String interpolation using ` and $
});
