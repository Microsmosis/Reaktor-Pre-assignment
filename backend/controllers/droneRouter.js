const axios = require('axios');
const droneDataRouter = require("express").Router();
const getDroneData = require('../utils/getDroneData');
const queries = require("../queries/pilotquery");

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
	}

	// this function into own file > getPilotData.js 
	await Promise.all(violators.map(async (pilot) => {
		try {
			const { data: pilotInfo } = await axios.get(`https://assignments.reaktor.com/birdnest/pilots/${pilot.serialNumber}`);
			pilotInfo.distanceToNest = pilot.distanceToNest;
			pilotInfo.serialNumber = pilot.serialNumber;
			await queries.insertPilot(pilotInfo.firstName, pilotInfo.lastName, pilotInfo.email, pilotInfo.phoneNumber, pilotInfo.distanceToNest, pilotInfo.serialNumber);
		} catch (error) {
			console.error(error);
			allPilotsInfo = [];
		};
	}));

	const allPilotsInfo = await queries.getPilots();

	if(allPilotsInfo?.length) {
		return response.status(200).send(allPilotsInfo);
	} else {
		return response.status(404).json({
			error: 'No drones found or some kind of error occured.'
		});
	};
})

// think of conditions on based what to send based on error codes (200, 404, 500 etc.)
// try catch

module.exports = droneDataRouter;