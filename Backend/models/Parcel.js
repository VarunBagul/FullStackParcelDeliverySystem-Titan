//schema for parcel

const mongoose = require("mongoose"); //1

//2
const ParcelSchema = mongoose.Schema(
  {
    //object 2b

    from: { type: String, require: true },
    to: { type: String, require: true },

    sendername: { type: String, require: true },
    recipientname: { type: String, require: true },
    senderemail: { type: String, require: true },
    recipientemail: { type: String, require: true },
    weight: { type: Number, require: true },
    cost: { type: Number, require: true },
    date: { type: Number, require: true },
    note: { type: String },
    feedback: { type: String }, //feedback written by the sender
    status: { type: Number, default: 0 }, //that parcel is pending and email is not sent so backgrnd service will sent mail and incr value to 1
  },
  {
    timestamp: true, // record its creation time
  }
);

//2a
//export the files before schema
module.exports = mongoose.model("Parcel", ParcelSchema);
