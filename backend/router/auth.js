const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({ message: "user already exist" });
    }

    const newUser = new User({
      name: name,
      email: email,
      password: password,
      phone: phone,
    });
    await newUser.save();

    const token = jwt.sign({ user: newUser._id }, process.env.KEY);

    res.status(200).json({ message: "success", token: token });
  } catch (error) {
    res.send(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      if (user.password === password) {
        const token = jwt.sign({ user: user._id }, process.env.KEY);
        res.status(200).json({ message: "success", token: token });
      } else {
        res.status(400).json({ message: "wrong password" });
      }
    } else {
      res.status(400).json({ message: "Invaild user" });
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/user", async (req, res) => {
  const { token } = req.body;
  console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.KEY);

    if (decoded) {
      const data = await User.findById(decoded.user);
      res.status(200).json(data);
    } else {
      res.status(400).json({ message: "invaild user" });
    }
  } catch (error) {}
});

router.post("/adminlogin", async (req, res) => {
  const { token } = req.body;

  console.log(token);

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  try {
    const decoded =  jwt.decode(token, {
      complete: true,
    });

    console.log(decoded);

    const { national_phone_number } = decoded.payload;
    console.log(national_phone_number)

    if (national_phone_number === process.env.PHONENUMBER) {
      res
        .status(200)
        .json({ message: "Authorization successful", user: decoded });
    } else {
      res.status(403).json({ message: "Unauthorized: Invalid phone number" });
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
