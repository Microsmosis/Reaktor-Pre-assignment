const express = require("express");
const app = express();
const droneRouter = require("./controllers/droneRouter");

app.use(
  cors({
    origin: "https://reaktor-nesty.herokuapp.com",
  })
);

if (process.env.NODE_ENV === 'production') {
	const path = require('path');
	app.use(express.static(path.join(__dirname, '../client/build')))
	app.use("/drones", droneRouter);
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(path.join(__dirname + '/../client/build/index.html')));
	});
}

module.exports = app;