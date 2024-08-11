// //schema for parcel

// const mongoose = require("mongoose"); //1

// //2
// const ParcelSchema = mongoose.Schema(
//   {
//     //object 2b

//     // from: { type: String, require: true },
//     // to: { type: String, require: true },

//     // sendername: { type: String, require: true },
//     // recipientname: { type: String, require: true },
//     // senderemail: { type: String, require: true },
//     // recipientemail: { type: String, require: true },
//     from: { type: String, required: true },
//     to: { type: String, required: true },
//     senderName: { type: String, required: true },
//     recipientName: { type: String, required: true },
//     senderEmail: { type: String, required: true },
//     recipientEmail: { type: String, required: true },
//     weight: { type: Number, required: true },
//     cost: { type: Number, required: true },
//     date: { type: Date, required: true },
//     note: { type: String },
//     feedback: { type: String }, //feedback written by the sender
//     status: { type: Number, default: 0 }, //that parcel is pending and email is not sent so backgrnd service will sent mail and incr value to 1
//   },
//   {
//     timestamp: true, // record its creation time
//   }
// );

// //2a
// //export the files before schema
// module.exports = mongoose.model("Parcel", ParcelSchema);

const mongoose = require("mongoose");

const ParcelSchema = mongoose.Schema(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    senderName: { type: String, required: true },
    recipientName: { type: String, required: true },
    senderEmail: { type: String, required: true },
    recipientEmail: { type: String, required: true },
    weight: { type: Number, required: true }, // Fixed typo from require to required
    cost: { type: Number, required: true }, // Fixed typo from require to required
    date: { type: Date, required: true }, // Changed type from Number to Date
    note: { type: String },
    feedback: { type: String }, // feedback written by the sender
    status: { type: Number, default: 0 }, // that parcel is pending and email is not sent so background service will send mail and increment value to 1
  },
  {
    timestamps: true, // Corrected key to timestamps
  }
);

module.exports = mongoose.model("Parcel", ParcelSchema);
