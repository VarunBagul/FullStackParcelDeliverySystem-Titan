console.log("Parcel route loaded");

const express = require("express");
const router = express.Router();
const {
  createParcel,
  getAllParcels,
  updateParcel,
  getOneParcel,
  getUserParcel,
  deleteParcel,
} = require("../controllers/parcel");

//ADD PARCEL
router.post("/", createParcel);

//GETALL PARCELS
router.get("/", getAllParcels);

//Update parcel
router.put("/:id", updateParcel);

//GET ONE PARCEL
//every route will take 2 args-a)route b)functionality from controller
router.get("/find/:id", getOneParcel);

//GET USERS PARCEL TO SHOW SENDER
router.post("/me", getUserParcel);

//DELETE PARCEL
router.delete("/:id", deleteParcel);

module.exports = router;
