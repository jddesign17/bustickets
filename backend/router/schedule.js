const express = require("express");
const router = express.Router();
const ScheduleModel = require("../models/schedules");
const routeModel = require("../models/routes");

router.post("/create", async (req, res) => {
  const { bus_id, route_id, departure_time, fare, date } = req.body;

  console.log(req.body);
  try {
    const route_data = await routeModel.findById(route_id);
    const estimate_time = await route_data.estimatedtime;

    const [depHours, depMinutes] = departure_time.split(":").map(Number);
    const [estHours, estMinutes] = estimate_time.split(":").map(Number);

    let totalMinutes = depMinutes + estMinutes;
    let totalHours = depHours + estHours + Math.floor(totalMinutes / 60);
    totalMinutes %= 60;

    totalHours %= 24;

    const arrival_time = `${String(totalHours).padStart(2, "0")}:${String(
      totalMinutes
    ).padStart(2, "0")}`;

    console.log(`Arrival Time: ${arrival_time}`);

    if (totalHours === 0 && totalMinutes === 0) {
      return res.status(400).json({ error: "Arrival time exceeds 24:00." });
    }

    const schedule = await ScheduleModel.create({
      bus_id,
      route_id,
      departure_time,
      fare,
      arrival_time,
      date: date,
    });

    res.status(201).json(schedule);
  } catch (error) {
    console.error("Error creating schedule:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/data", async (req, res) => {
  try {
    const response = await ScheduleModel.find()
      .populate({
        path: "bus_id",
        populate: {
          path: "operatorid",
        },
      })
      .populate("route_id");
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});



router.put("/update", async (req, res) => {

  const { bus_id, route_id, departure_time, fare, date,_id } = req.body;
  try {

    console.log(req.body);
    const route_data = await routeModel.findById(route_id);
    const estimate_time = await route_data.estimatedtime;

    const [depHours, depMinutes] = departure_time.split(":").map(Number);
    const [estHours, estMinutes] = estimate_time.split(":").map(Number);

    let totalMinutes = depMinutes + estMinutes;
    let totalHours = depHours + estHours + Math.floor(totalMinutes / 60);
    totalMinutes %= 60;

    totalHours %= 24;

    const arrival_time = `${String(totalHours).padStart(2, "0")}:${String(
      totalMinutes
    ).padStart(2, "0")}`;

    console.log(`Arrival Time: ${arrival_time}`);

    if (totalHours === 0 && totalMinutes === 0) {
      return res.status(400).json({ error: "Arrival time exceeds 24:00." });
    }


    const schedule = await ScheduleModel.findByIdAndUpdate(
      _id,
      {
        bus_id,
        route_id,
        departure_time,
        fare,
        arrival_time,
        date: date,
      },
      { new: true }
    );
    res.status(200).json(schedule);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

router.post("/filterdata", async (req, res) => {
  console.log(req.body);
  const { source, destination, departure_time, date } = req.body;

  try {
    console.log("Request Body:", req.body);

    const scheduleresponse = await ScheduleModel.find({
      departure_time: departure_time,
      date: date,
    })
      .populate("route_id")
      .populate({
        path: "bus_id",
        populate: {
          path: "operatorid",
        },
      });

    const filteredResults = scheduleresponse.filter((schedule) => {
      return (
        schedule.route_id.source.toLowerCase() === source.toLowerCase() &&
        schedule.route_id.destination.toLowerCase() ===
          destination.toLowerCase()
      );
    });

    if (filteredResults.length > 0) {
      res.status(200).json({ success: true, data: filteredResults });
    } else {
      res
        .status(404)
        .json({ success: false, message: "No matching schedules found." });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
