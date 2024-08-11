const Parcel = require("../models/Parcel");

//Create a parcel

const createParcel = async (req, res) => {
  try {
    const newParcels = Parcel(req.body);
    const parcel = await newParcels.save();
    res.status(201).json(parcel);
  } catch (error) {
    res.status(500).json(error);
  }
};

//GET ALL PARCELS

const getAllParcels = async (req, res) => {
  try {
    const parcels = await Parcel.find().sort({ createdAt: -1 });
    res.status(200).json(parcels);
  } catch (error) {
    res.status(500).json(error);
  }
};

//UPDATE THE PARCEL

const updateParcel = async (req, res) => {
  try {
    const parcel = await Parcel.findById(req.params.id);
    res.status(200).json(parcel);
  } catch (error) {
    res.status(500).json(error);
  }
};

//GET ONE PARCEL
//after await Parcel used is the model,we are getting data from it
const getOneParcel = async (req, res) => {
  try {
    const parcel = await Parcel.findById(req.params.id);
    res.status(200).json(parcel);
  } catch (error) {
    req.status(500).json(error);
  }
};

//GET USERS PARCEL
const getUserParcel = async (req, res) => {
  try {
    const parcels = await Parcel.find({ senderemail: req.body.email }).sort({
      createdAt: -1,
    });
    res.status(200).json(parcels);
  } catch (error) {
    req.status(500).json(error);
  }
};

//DELETE a parcel
const deleteParcel = async (req, res) => {
  try {
    await Parcel.findByIdAndDelete(req.params.id);
    res.status(201).json("parcel has been deleted successfully");
  } catch (error) {
    req.status(500).json(error);
  }
};

module.exports = {
  deleteParcel,
  getUserParcel,
  getOneParcel,
  getAllParcels,
  updateParcel,
  createParcel,
};
