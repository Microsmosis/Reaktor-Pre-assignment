const pool = require("../utils/database");

const insertPilot = async ({ firstname, lastname, email, phonenumber }) => {

	try {
	  const queryResponse = await pool.query(
		"INSERT INTO pilots(firstname, lastname, email, phonenumber) VALUES($1, $2, $3, $4) RETURNING *",
		[firstname, lastname, email, phonenumber]
	  );
	  return queryResponse;
	} catch (error) {
	  console.error(error.message);
	  return error.message;
	}
  };

/* const getUserPictures = async (user_id) => {
	try {
	  const queryResponse = await pool.query(
		"SELECT * FROM pictures WHERE user_id = $1",
		[user_id]
	  );
	  return queryResponse;
	} catch (error) {
	  console.error(error.message);
	  return false;
	}
  }; */

module.exports = {
	insertPilot,
};