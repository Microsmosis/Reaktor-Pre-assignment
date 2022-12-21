const pilotDataRouter = require("express").Router();
const getPilotData = require('../utils/pilotData');

pilotDataRouter.post('/', async (request, response) => {
    const pilotSerialNumbers = request.body;
    const pilotsData = await getPilotData(pilotSerialNumbers);
    response.status(200).send(pilotsData);
})

// think of conditions on based what to send based on error codes (200, 404, 500 etc.)
// try catch etc.

module.exports = pilotDataRouter;