const express = require("express");
const routesModel = require("../models/routes");

const router = express.Router();

router.post("/create", async (req, res) => {
  const { source, destination, distance, estimatedtime ,stops} = req.body;
  console.log(req.body);

  try {
    const routesData = await routesModel.create({
      source: source,
      destination: destination,
      distance: distance,
      estimatedtime: estimatedtime,
      stops:stops
    });
    const data = await routesData.save();

    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/data", async (req, res) => {
  try {
    const response = await routesModel.find();
    res.status(200).send(response);
  } catch (error) {
    res.send(error);
  }
});

router.get("/data/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await routesModel.findById(id);
    res.status(200).send(response);
  } catch (error) {
    res.send(error);
  }
});

router.put("/update/:itemId", async (req, res) => {
  const { _id } = req.body;
  try {
    const response = await routesModel.findByIdAndUpdate(_id, req.body);
    res.status(200).send(response);
  } catch (error) {
    res.send(error);
  }
});




module.exports = router;
