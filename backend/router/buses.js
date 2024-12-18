const express = require("express");
const router = express.Router();
const busModel = require("../models/buses");
const upload = require("../middleware/multer");

router.post(
  "/create",
  upload.fields([{ name: "image1" }, { name: "image2" }]),
  async (req, res) => {
    const { operatorid, bustype, amenities, registration_number, seatCount } =
      req.body;
    try {
      const seats = Array.from({ length: seatCount }, (_, index) => ({
        seat: `A${index + 1}`,
        booked: false,
      }));

      const busdata = new busModel({
        operatorid: operatorid,
        bustype: bustype,
        amenities: amenities,
        registration_number: registration_number,
        seatCount: seats,
        images: [
          req.files.image1?.[0].filename,
          req.files.image2?.[0].filename,
        ],
      });
      await busdata.save();
      res.status(200).json({ message: "success" });
    } catch (error) {
      res.status(400).json({ message: "error" });
    }
  }
);

router.get("/data", async (req, res) => {
  try {
    const data = await busModel.find().populate("operatorid");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await busModel.findByIdAndDelete(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

router.put("/upadate/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { operatorid, bustype, amenities, registration_number, seatCount } =
    req.body;
  try {
    const data = await busModel.findByIdAndUpdate(id, {
      operatorid: operatorid,
      bustype: bustype,
      amenities: amenities,
      registration_number: registration_number,
      seatCount: seatCount,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

module.exports = router;
