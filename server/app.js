const express = require('express');
const app = express();
const pilotRouter = require('./controllers/pilotRouter');
const distanceRouter = require('./controllers/distanceRouter');

if (process.env.NODE_ENV === 'production') {
	const path = require('path');
	app.use(express.static(path.join(__dirname, '../client/build')))
	app.use('/pilots', pilotRouter);
	app.use('/distance', distanceRouter);
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(path.join(__dirname + '/../client/build/index.html')));
	});
}

module.exports = app;
/* 
const express = require('express');
const app = express();
const cors = require('cors'); // uninstall CORS when done with dev.
const pilotRouter = require('./controllers/pilotRouter');
const distanceRouter = require('./controllers/distanceRouter')

app.use(
	cors({
	  origin: 'http://localhost:3000',
	})
);

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '10mb' }));
app.use(express.text());

app.use('/pilots', pilotRouter);
app.use('/distance', distanceRouter);

module.exports = app; */