const dotenv = require("dotenv");

const jwt = require("jsonwebtoken");
dotenv.config();
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.token;

    if (authHeader) {
      const token = authHeader.split("")[1]; //i.e split it based on ""space and take 2nd element i.e 1
      //check if token is burried or not
      jwt.verify(token, process.env.JWT_SEC, (err, user) => {
        //if verify and successful you get user if not you get error and this token is not valid
        if (err) res.status(401).json("Token is not valid");
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("You are not authenticated");
    }
  } catch (error) {}
};
const verifyTokenAndAuthorization = (req, res) => {
  verifyToken(req, res, () => {
    if (req.user.role == "admin") {
      next(); //you can proceed
    } else {
      res.status(403).json("You are not permitted to do this operation");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuthorization };
