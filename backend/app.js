const express = require("express");
const app = express();
const cors = require("cors");
const droneRouter = require("./controllers/droneRouter");
const pilotRouter = require("./controllers/pilotRouter");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "10mb" }));
app.use(express.text());

app.use("/api/drones", droneRouter);
app.use("/api/pilots", pilotRouter);

module.exports = app;