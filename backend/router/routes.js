const express = require("express");
const routesModel = require("../models/routes");

const router = express.Router();

router.post("/create", async (req, res) => {
  const { source, destination, distance, estimatedtime } = req.body;
  console.log(req.body);

  try {
    const routesData = await routesModel.create({
      source: source,
      destination: destination,
      distance: distance,
      estimatedtime: estimatedtime,
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
  const { itemid } = req.params;
  try {
    const response = await routesModel.findByIdAndUpdate(itemid, req.body);
    res.status(200).send(response);
  } catch (error) {
    res.send(error);
  }
});

router.post("/stop/:itemid", async (req, res) => {
  const { itemid } = req.params;

  const { name } = req.body;

  try {
    const Item = await routesModel.findById(itemid);

    if (!Item) {
      return res.send("item not found");
    }

    Item.stops.push({ name: name });
    await Item.save();

    return res.status(200).send({ message: "Stops Added Successfully" });
  } catch (error) {
    res.send(error);
  }
});

router.put("/stop/:itemid/:dataid", async (req, res) => {
  const { name } = req.body;
  const { itemid, dataid } = req.params;

  try {
    const updatedItem = await routesModel.findOneAndUpdate(
      { _id: itemid, "stops._id": dataid },
      { $set: { "stops.$.name": name } },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).send("Route or stop not found");
    }

    res.status(200).send({ message: "Stop updated successfully", updatedItem });
  } catch (error) {
    console.error("Error updating stop:", error);
    res.status(500).send("Server error");
  }
});

router.delete("/stop/:itemid/:dataid", async (req, res) => {
  const { itemid, dataid } = req.params;

  try {
    const updatedItem = await routesModel.findOneAndUpdate(
      { _id: itemid },
      { $pull: { stops: { _id: dataid } } },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).send("Route or stop not found");
    }

    res.status(200).send({ message: "Stop deleted successfully", updatedItem });
  } catch (error) {
    console.error("Error deleting stop:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
