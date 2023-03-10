const pool = require("../utils/database");
const errorLogger = require("../errors/errorLogger");

const getClosestDistance = async () => {
	try {
		await pool.query(
			`UPDATE closest_distance
			SET distance = (SELECT MIN(distance_to_nest) FROM pilots)
			WHERE (SELECT MIN(distance_to_nest) FROM pilots) < distance`,
		);
		const closestDistance = await pool.query(
			`SELECT distance FROM closest_distance`
		)
		return closestDistance.rows[0].distance;
	} catch (error) {
		errorLogger(error);
		return null;
	}
};

module.exports = {
	getClosestDistance,
};
