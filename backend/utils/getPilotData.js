const axios = require('axios');


const getPilotData = async (pilotSerialNumbers) => {
        let allPilotsInfo = [];
        await Promise.all(pilotSerialNumbers.map(async (pilot) => {
            try {
                const pilotInfo = await axios.get(`https://assignments.reaktor.com/birdnest/pilots/${pilot.serialNumber}`);
                pilotInfo.data.violationTime = Date.now();
                allPilotsInfo.push(pilotInfo.data);
            } catch (error) {
                console.error(error);
                allPilotsInfo = [];
            };
        }));
        return allPilotsInfo;
}
// try catch might not catch reaktor api 404 response code and does not work as intended so double check this.
// INSTEAD OF TRY CATCH MAYBE IF ELSE STATEMENTS TO RETURN VALID STUFF NOW IT WILL RETURN 'drones'
// EMPTY IF API FAILED WITH 404 etc

module.exports = getPilotData;