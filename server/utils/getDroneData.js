const axios = require('axios');
const XMLParser = require('fast-xml-parser/src/xmlparser/XMLParser');

const getDroneData = async () => {
	try {
		const XMLResponse = await axios.get('https://assignments.reaktor.com/birdnest/drones');
		const parser = new XMLParser();
		const json = parser.parse(XMLResponse.data);
		const drones = json.report.capture.drone;
		return drones;
	} catch (error) {
		console.error(error);
		return null;
	};
}

module.exports = getDroneData;