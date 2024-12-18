const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  operatorid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Operator",
  },
  bustype: {
    type: String,
    required: true,
  },
  amenities: {
    type: String,
    required: true,
  },
  registration_number: {
    type: String,
    required: true,
  },
  seatCount: {
    type: Array,
    required: true,
  },
  images: {
    type: Array,
    default: [],
  },
});

const busModel = mongoose.model("Bus", busSchema);

module.exports = busModel;
