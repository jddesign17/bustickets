const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const operatorrouter = require("./router/operator");
const busesrouter = require("./router/buses");
const routesrouter = require("./router/routes");
const schedulerouter = require("./router/schedule");
dotenv.config();
app.use("/uploads", express.static("uploads"));
app.use(express.json());

app.use(cors());

app.use("/api/operator", operatorrouter);
app.use("/api/buses", busesrouter);
app.use("/api/routes", routesrouter);
app.use("/api/schedule", schedulerouter);

const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch("error", console.error);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
});
