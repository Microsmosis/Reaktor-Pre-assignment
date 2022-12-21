const pilotDataRouter = require("express").Router();
const getPilotData = require('../utils/getPilotData');

pilotDataRouter.post('/', async (request, response) => {

        const pilotSerialNumbers = request.body;
        const pilotData = await getPilotData(pilotSerialNumbers);
        if(pilotData?.length) {
            return response.status(200).send(pilotData);
        } else {
            return response.status(404).json({
                error: 'No pilot data found or some kind of error occured.'
            });
        };
});

// think of conditions on based what to send based on error codes (200, 404, 500 etc.)
// try catch etc.

module.exports = pilotDataRouter;