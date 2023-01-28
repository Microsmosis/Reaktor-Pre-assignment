const distanceRouter = require("express").Router();
const queries = require("../queries/distanceQuery");
const errorLogger = require("../errors/errorLogger");

// Querying the database for distance data
distanceRouter.get('/', async (request, response) => {
	try {
		const distance = await queries.getClosestDistance();
		if(distance) {
			return response.status(200).send(distance);
		} else {
			return response.status(404).json({
				error: 'No distance found.'
			});
		}
	} catch (error) {
		errorLogger(error);
		return response.status(500).json({
			error: 'Internal server error.'
		});
	};
});

module.exports = distanceRouter;