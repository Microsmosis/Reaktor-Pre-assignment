const express = require("express");
const app = express();
const pilotRouter = require("./controllers/pilotRouter");

if (process.env.NODE_ENV === 'production') {
	const path = require('path');
	app.use(express.static(path.join(__dirname, '../client/build')))
	app.use("/pilots", pilotRouter);
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(path.join(__dirname + '/../client/build/index.html')));
	});
}

module.exports = app;