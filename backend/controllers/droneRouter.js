const axios = require('axios');
const droneDataRouter = require("express").Router();
const getDroneData = require('../utils/getDroneData');
const queries = require("../queries/pilotquery");

const isViolator = (drone) => {
	const circleX = 250000;
	const circleY = 250000;
	const radius = 100000;

	if ((drone.positionX - circleX) * (drone.positionX - circleX) +
		  (drone.positionY - circleY) * (drone.positionY - circleY) <= radius * radius) {
	  return true;
	} else {
	  return false;
	}
}

const convertCoordinates = (drone) => {
	const nestPosition = 250000;
	drone.positionX = drone.positionX - nestPosition;
	drone.positionY = drone.positionY - nestPosition;
	drone.distanceToNest = Math.sqrt(drone.positionX * drone.positionX + drone.positionY * drone.positionY)
	return drone;
}

droneDataRouter.get('/', async (request, response) => {
	const allDrones = await getDroneData();
	const violators = [];
	
	if(allDrones?.length) {
		allDrones.map((drone) => {
			if(isViolator(drone) === true) {
				drone = convertCoordinates(drone);
				violators.push(drone);
			};
		});
	}

	// this function into own file > getPilotData.js 
	await Promise.all(violators.map(async (pilot) => {
		try {
			const pilotInfo = await axios.get(`https://assignments.reaktor.com/birdnest/pilots/${pilot.serialNumber}`);
			pilotInfo.data.distanceToNest = pilot.distanceToNest;
			pilotInfo.data.serialNumber = pilot.serialNumber;
			await queries.insertPilot(pilotInfo.data.firstName, pilotInfo.data.lastName, pilotInfo.data.email, pilotInfo.data.phoneNumber, pilotInfo.data.distanceToNest, pilotInfo.data.serialNumber);
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