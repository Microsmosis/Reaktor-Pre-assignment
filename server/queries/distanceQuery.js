const pool = require("../utils/database");

const getClosestDistance = async () => {
	try {
		await pool.query(
			`UPDATE closest_distance
			SET distance = (SELECT distance FROM closest_distance)
			WHERE (SELECT MIN(distance_to_nest) FROM pilots) < distance`,
		);
		const closestDistance = await pool.query(
			`SELECT distance FROM closest_distance`
		)
		return closestDistance.rows[0].distance;
	} catch (error) {
		return null;
	};
};

module.exports = {
	getClosestDistance,
};
