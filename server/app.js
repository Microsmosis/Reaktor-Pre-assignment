const express = require("express");
const app = express();
const cors = require("cors");
const droneRouter = require("./controllers/droneRouter");

// https://reaktor-nesty.herokuapp.com/

app.use(
  cors({
    origin: "https://reaktor-nesty.herokuapp.com/",
  })
);

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "10mb" }));
app.use(express.text());

app.use("/drones", droneRouter);

if (process.env.NODE_ENV === 'production') {
	const path = require('path');

	app.use(express.static(path.join(__dirname, '../client/build')))

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(path.join(__dirname + '/../client/build/index.html')));
	});
}

module.exports = app;