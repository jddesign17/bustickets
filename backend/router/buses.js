const express = require("express");
const router = express.Router();
const busModel = require("../models/buses");
const upload = require("../middleware/multer");

router.post(
  "/create",
  upload.fields([{ name: "images", maxCount: 6 }]),
  async (req, res) => {
    const { operatorid, bustype, registration_number } = req.body;

    let amenities = req.body.amenities;
    let seatdetails = req.body.seatdetails;
    let imagedata = [];

    console.log(req.files);

    if (req.files && req.files.images) {
      req.files.images.forEach((item) => {
        imagedata.push({ name: item.filename });
      });
    }

    function generateSeats(seats, purpose) {
      return Array.from({ length: seats }, (_, index) => ({
        name: purpose,
        seat: `${purpose}${index + 1}`,
        booked: false,
      }));
    }

    try {
      amenities = amenities.map((amenity) => {
        try {
          return JSON.parse(amenity);
        } catch (error) {
          console.log(error);
          return null;
        }
      });

      seatdetails = seatdetails.map((seats) => {
        try {
          return JSON.parse(seats);
        } catch (error) {
          console.log(error);
          return null;
        }
      });

      let seats = [];
      seatdetails.forEach((seatDetail) => {
        const seatCount = parseInt(seatDetail.seatCount);
        const seatType = seatDetail.seattype;
        const seatLayout = generateSeats(seatCount, seatType);
        seats = seats.concat(seatLayout);
      });

      console.log("Generated Seats:", seats);

      const busdata = new busModel({
        operatorid: operatorid,
        bustype: bustype,
        amenities: amenities,
        registration_number: registration_number,
        seatCount: seats,
        images: imagedata,
      });

      await busdata.save();
      res.status(200).json({ message: "success" });
    } catch (error) {
      console.error("Error saving bus data:", error);
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

router.put(
  "/upadate/:id",
  upload.fields([{ name: "images" }]),
  async (req, res) => {
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
  }
);

module.exports = router;
