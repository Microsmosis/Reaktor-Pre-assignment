const axios = require('axios');
const queries = require("../queries/pilotquery");

const insertPilotData = async (violators) => {
	await queries.deletePilots();
	await Promise.all(violators.map(async (pilot) => {
		try {
			const { data: pilotInfo } = await axios
			.get(`https://assignments.reaktor.com/birdnest/pilots/${pilot.serialNumber}`);
			pilotInfo.distanceToNest = pilot.distanceToNest;
			pilotInfo.serialNumber = pilot.serialNumber;
			await queries.insertPilot(
				pilotInfo.firstName,
				pilotInfo.lastName,
				pilotInfo.email,
				pilotInfo.phoneNumber,
				pilotInfo.distanceToNest,
				pilotInfo.serialNumber
			);
		} catch (error) {
			console.error(error);
		};
	}));
}

module.exports = insertPilotData;