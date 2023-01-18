const distanceRouter = require("express").Router();
const queries = require("../queries/distanceQuery");

// Querying the database for distance data
distanceRouter.get('/', async (request, response) => {
	try {
		const distance = await queries.getClosestDistance();
		return response.status(200).send(distance);
	} catch (error) {
		return response.status(404).json({
			error: 'No distance found.'
		});
	};
});

module.exports = distanceRouter;