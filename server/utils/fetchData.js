const getDroneData = require('./getDroneData');
const insertPilotData = require('./insertPilotData');
const queries = require("../queries/pilotQuery");
const errorLogger = require("../errors/errorLogger");

// Function to check if drones are violating the "ndz".
const isViolator = (droneX, droneY) => {
	const circleX = 250000;
	const circleY = 250000;
	const radius = 100000;

	// Equation to check if the drone is inside the 100m radius.
	if ((droneX - circleX) * (droneX - circleX) +
		  (droneY - circleY) * (droneY - circleY) <= radius * radius) {
		return true;
	} else {
		return false;
	};
};

// Function to return the distance to nest.
const getDistanceToNest = (x, y) => {
	const nestPosition = 250000;
	x = x - nestPosition;
	y = y - nestPosition;
	return Math.sqrt(x * x + y * y)
};

// Function to fetch data from Reaktor API endpoints and to filter out non-violators.
// This function will also insert the violating pilots into the database.
const fetchData = async () => {
	try {
		const allDrones = await getDroneData();
		await queries.deletePilots();
		const violators = [];
	
		if(allDrones?.length) {
			allDrones.map((drone) => {
				if(isViolator(drone.positionX, drone.positionY) === true) {
					drone.distanceToNest = getDistanceToNest(drone.positionX, drone.positionY);
					violators.push(drone);
				};
			});
			await insertPilotData(violators);
		}
	} catch (error) {
		errorLogger(error);
	}
};

module.exports = fetchData;