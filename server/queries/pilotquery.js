const pool = require("../utils/database");

const insertPilot = async (firstname, lastname, email, phone_number, distance_to_nest, serial_number) => {
	try {
		await pool.query(
			`INSERT INTO pilots(
				firstname, 
				lastname, 
				email, 
				phone_number, 
				distance_to_nest, 
				serial_number, 
				date_added
			) 
			VALUES($1, $2, $3, $4, $5, $6, CURRENT_TIME)`,
			[firstname, lastname, email, phone_number, distance_to_nest, serial_number]
		);
	} catch (error) {
		return null;
	};
};

const getPilots = async () => {
	try {
		let queryResponse = await pool.query(
			"SELECT * FROM pilots ORDER BY date_added ASC"
		);
		return queryResponse.rows;
	} catch (error) {
		console.error(error.message);
		return null;
	};
};

const deletePilots = async () => {
	try {
		await pool.query(
			"DELETE FROM pilots WHERE date_added < (CURRENT_TIME - INTERVAL '10 minutes')"
		);
	} catch (error) {
		console.error(error.message);
		return null;
	};
};

module.exports = {
	insertPilot,
	getPilots,
	deletePilots,
};