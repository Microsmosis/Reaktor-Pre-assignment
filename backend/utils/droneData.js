const axios = require('axios');
const XMLParser = require('../node_modules/fast-xml-parser/src/xmlparser/XMLParser');

const getDroneData = async () => {
    const XMLResponse = await axios.get('https://assignments.reaktor.com/birdnest/drones');
    const parser = new XMLParser();
    const json = parser.parse(XMLResponse.data);
    const drones = json.report.capture.drone;
    return drones;
}

// errror handling if reaktor api returns something else than 200.

module.exports = getDroneData;