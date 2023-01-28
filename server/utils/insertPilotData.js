const axios = require('axios');
const queries = require("../queries/pilotQuery");
const errorLogger = require("../errors/errorLogger");

// Function to request pilot information from Reaktor /pilots/pilot:id endpoint.
// Violator pilot id's have been passed as argument to this function.
// The function will iterate threw the id's with map method and insert pilots
// into the database.
const insertPilotData = async (violators) => {
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
			errorLogger(error);
		};
	}));
};

module.exports = insertPilotData;