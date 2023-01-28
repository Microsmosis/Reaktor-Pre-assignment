const fs = require('fs');
const path = require('path');

const errorLogger = (err) => {
	const error = {
		message: err.message,
		stack: err.stack,
		date: new Date(),
	};
	const filePath = path.join(__dirname, 'errors.json');
	fs.appendFile(filePath, JSON.stringify(error) + '\n', (err) => {
		if (err) {
			console.error(err);
		}
	});
};

module.exports = errorLogger;
