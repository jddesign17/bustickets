const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  bus_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bus",
  },
  route_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "routes",
  },
  departure_time: {
    type: String,
    required: true,
  },
  arrival_time: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  date:{
    type:Date,
    required:true
  }
});

const ScheduleModel = mongoose.model("Schedule", ScheduleSchema);

module.exports = ScheduleModel;
