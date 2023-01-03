const droneDataRouter = require("express").Router();
const queries = require("../queries/pilotquery");

droneDataRouter.get('/', async (request, response) => {
	const allPilotsInfo = await queries.getPilots();

	if(allPilotsInfo?.length) {
		return response.status(200).send(allPilotsInfo);
	} else {
		return response.status(404).json({
			error: 'No pilots found.'
		});
	};
})

module.exports = droneDataRouter;