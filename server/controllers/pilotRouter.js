const pilotDataRouter = require("express").Router();
const queries = require("../queries/pilotquery");

pilotDataRouter.get('/', async (request, response) => {
	try {
		const allPilotsInfo = await queries.getPilots();
		return response.status(200).send(allPilotsInfo);
	} catch (error) {
		return response.status(404).json({
			error: 'No pilots found.'
		});
	};
});

module.exports = pilotDataRouter;