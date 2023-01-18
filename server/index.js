const app = require("./app");
const http = require("http");
const path = require('path');
const { Server } = require("socket.io");
const distanceQueries = require("./queries/distanceQuery");
const pilotQueries = require("./queries/pilotQuery");
const fetchData = require('./utils/fetchData');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const server = http.createServer(app);

// Creating new websocket server.
const io = new Server(server, {
	cors: {
		origin: "https://reaktor-nesty.herokuapp.com",
		methods: ["GET"],
	},
});

// Listening for events.
// Client side emits an event where server responds by fetching
// information from the database and sends it back with the use of callback().
io.on("connection", (socket) => {
	socket.on("violators", async (callback) => {
		try {
			const allPilotsInfo = await pilotQueries.getPilots();
			callback(allPilotsInfo);
		} catch (error) {
			console.error(error);
			callback(null);
		};
	});
	socket.on("closest_distance", async (callback) => {
		try {
			const distance = await distanceQueries.getClosestDistance();
			callback(distance);
		} catch (error) {
			console.error(error);
			callback(null);
		};
	});
	socket.on("disconnect", () => {});
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});

// Setting an interval to fetch drone and pilot data from Reaktor API endpoints
// about every 2 seconds.
setInterval(fetchData, 2000);