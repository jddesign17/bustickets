const mongoose = require("mongoose");

const routesSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  stops: [
    {
      name: {
        type: String,
        required: true,
      },
    },
  ],
  distance: {
    type: Number,
    required: true,
  },
  estimatedtime: {
    type: String,
    required: true,
  },
});


const routesModel = mongoose.model("routes",routesSchema)

module.exports = routesModel;
