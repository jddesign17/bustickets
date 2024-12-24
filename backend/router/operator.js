const express = require("express");
const router = express.Router();
const OperatorModel = require("../models/opeartor");
const upload = require("../middleware/multer");

router.post("/create", upload.single("image"), async (req, res) => {
  let image = "";
  const { name, contact } = req.body;
  if (req.file) {
    image = req.file.filename;
  }
  try {
    const Operatordata = new OperatorModel({
      name: name,
      contact: contact,
      image: image,
    });
    await Operatordata.save();
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

router.get("/data", async (req, res) => {
  try {
    const data = await OperatorModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

router.put("/update/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { name, contact } = req.body;

  let image = "";

  try {
    const user = await OperatorModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.file) {
      image =   req.file.filename;
    } else {
      image = user.image;
    }

    const data = await OperatorModel.findByIdAndUpdate(id, {
      name: name,
      contact: contact,
      image: image,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await OperatorModel.findByIdAndDelete(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

module.exports = router;
