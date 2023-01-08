const getDroneData = require('./getDroneData');
const insertPilotData = require('./insertPilotData');
const queries = require("../queries/pilotQuery");

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

const getDistanceToNest = (x, y) => {
	const nestPosition = 250000;
	x = x - nestPosition;
	y = y - nestPosition;
	return Math.sqrt(x * x + y * y)
};

const fetchData = async () => {
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
};

module.exports = fetchData;