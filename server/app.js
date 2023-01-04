const express = require('express');
const app = express();
const pilotRouter = require('./controllers/pilotRouter');
const distanceRouter = require('./controllers/distanceRouter');

if (process.env.NODE_ENV === 'production') {
	const path = require('path');
	app.use(express.static(path.join(__dirname, '../client/build')));
	app.use('/pilots', pilotRouter);
	app.use('/distance', distanceRouter);
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(path.join(__dirname + '/../client/build/index.html')));
	});
}

module.exports = app;
