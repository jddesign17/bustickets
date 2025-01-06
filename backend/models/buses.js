const mongoose = require("mongoose");

const seatsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  seat: {
    type: String,
    required: true,
  },
  booked: {
    type: Boolean,
    required: true,
  },
});

const imageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const amenitiesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

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
    type: [amenitiesSchema],
    required: true,
  },
  registration_number: {
    type: String,
    required: true,
  },
  seatCount: {
    type: [seatsSchema],

    required: true,
  },
  images: {
    type: [imageSchema],
  },
});

const BusModel = mongoose.model("Bus", busSchema);

module.exports = BusModel;
