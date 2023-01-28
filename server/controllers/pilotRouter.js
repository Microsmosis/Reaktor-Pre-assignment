const pilotDataRouter = require("express").Router();
const queries = require("../queries/pilotQuery");
const errorLogger = require("../errors/errorLogger");

// Querying the database for pilot data
pilotDataRouter.get('/', async (request, response) => {
	try {
		const allPilotsInfo = await queries.getPilots();
		if(allPilotsInfo) {
			return response.status(200).send(allPilotsInfo);
		} else {
			return response.status(404).json({
				error: 'No pilots found.'
			});
		}
	} catch (error) {
		errorLogger(error);
		return response.status(500).json({
			error: 'Internal server error.'
		});
	};
});

module.exports = pilotDataRouter;