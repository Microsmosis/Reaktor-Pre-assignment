const axios = require('axios');
const XMLParser = require('fast-xml-parser/src/xmlparser/XMLParser');
const errorLogger = require("../errors/errorLogger");

// Function to request drone data from /drones endpoint.
// The response is also parsed from XML to JSON to improve
// the access and managment of the response data.
const getDroneData = async () => {
	try {
		const XMLResponse = await axios.get('https://assignments.reaktor.com/birdnest/drones');
		const parser = new XMLParser();
		const json = parser.parse(XMLResponse.data);
		const drones = json.report.capture.drone;
		return drones;
	} catch (error) {
		errorLogger(error);
		return null;
	};
};

module.exports = getDroneData;