const express = require("express");
const app = express();
const cors = require("cors");
const droneRouter = require("./controllers/droneRouter");

// https://reaktor-nesty.herokuapp.com/

app.use(
  cors({
    origin: "https://reaktor-nesty.herokuapp.com",
  })
);

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "10mb" }));
app.use(express.text());

app.use("/drones", droneRouter);

if (process.env.NODE_ENV === 'production') {
	// Exprees will serve up production assets
	app.use(express.static('client/build'));
  
	// Express serve up index.html file if it doesn't recognize route
	const path = require('path');
	app.get('*', (req, res) => {
	  res.sendFile(path.resolve(path.join(__dirname + '/../client/build/index.html')));
	});
}

module.exports = app;