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
    };
}
// INSTEAD OF TRY CATCH MAYBE IF ELSE STATEMENTS TO RETURN VALID STUFF NOW IT WILL RETURN 'drones'
// EMPTY IF API FAILED WITH 404 etc
// errror handling if reaktor api returns something else than 200.

module.exports = getDroneData;