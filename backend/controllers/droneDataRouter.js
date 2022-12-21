const droneDataRouter = require("express").Router();
const getDroneData = require('../utils/droneData');

droneDataRouter.get('/', async (request, response) => {
    const drones = await getDroneData();
    response.status(200).send(drones);
})

// think of conditions on based what to send based on error codes (200, 404, 500 etc.)
// try catch

module.exports = droneDataRouter;