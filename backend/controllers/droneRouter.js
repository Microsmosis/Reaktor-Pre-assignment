const droneDataRouter = require("express").Router();
const getDroneData = require('../utils/getDroneData');

droneDataRouter.get('/', async (request, response) => {

        const drones = await getDroneData();
        if(drones?.length) {
            return response.status(200).send(drones);
        } else {
            return response.status(404).json({
                error: 'No drones found or some kind of error occured.'
            });
        };
})

// think of conditions on based what to send based on error codes (200, 404, 500 etc.)
// try catch

module.exports = droneDataRouter;