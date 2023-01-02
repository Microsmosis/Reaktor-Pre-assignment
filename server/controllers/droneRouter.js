const droneDataRouter = require("express").Router();
const getDroneData = require('../utils/getDroneData');
const queries = require("../queries/pilotquery");
const insertPilotData = require('../utils/insertPilotData');

const isViolator = (droneX, droneY) => {
	const circleX = 250000;
	const circleY = 250000;
	const radius = 100000;

	if ((droneX - circleX) * (droneX - circleX) +
		  (droneY - circleY) * (droneY - circleY) <= radius * radius) {
	  return true;
	} else {
	  return false;
	}
}

const getDistanceToNest = (x, y) => {
	const nestPosition = 250000;
	x = x - nestPosition;
	y = y - nestPosition;
	return Math.sqrt(x * x + y * y)
}

droneDataRouter.get('/', async (request, response) => {
	const allDrones = await getDroneData();
	const violators = [];

	if(allDrones?.length) {
		allDrones.map((drone) => {
			if(isViolator(drone.positionX, drone.positionY) === true) {
				drone.distanceToNest = getDistanceToNest(drone.positionX, drone.positionY);
				violators.push(drone);
			};
		});
	} else {
		return response.status(404).json({
			error: 'No drones found.'
		});
	};

	await insertPilotData(violators);
	const allPilotsInfo = await queries.getPilots();

	if(allPilotsInfo?.length) {
		return response.status(200).send(allPilotsInfo);
	} else {
		return response.status(404).json({
			error: 'No pilots found.'
		});
	};
})

module.exports = droneDataRouter;