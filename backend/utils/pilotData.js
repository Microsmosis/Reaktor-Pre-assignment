const axios = require('axios');


const getPilotData = async (pilotSerialNumbers) => {
    const allPilotsInfo = [];
    await Promise.all(pilotSerialNumbers.map(async (pilot) => {
        const pilotInfo = await axios.get(`https://assignments.reaktor.com/birdnest/pilots/${pilot.serialNumber}`);
        allPilotsInfo.push(pilotInfo.data);
    }));
    return allPilotsInfo;
}

module.exports = getPilotData;