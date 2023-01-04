const getDroneData = require('./getDroneData');
const insertPilotData = require('./insertPilotData');

const isViolator = (droneX, droneY) => {
	const circleX = 250000;
	const circleY = 250000;
	const radius = 100000;

	if ((droneX - circleX) * (droneX - circleX) +
		  (droneY - circleY) * (droneY - circleY) <= radius * radius) {
		return true;
	} else {
		return false;
	};
};

const getDistanceToNest = (x, y) => {
	const nestPosition = 250000;
	x = x - nestPosition;
	y = y - nestPosition;
	return Math.sqrt(x * x + y * y)
};

const fetchData = async () => {
	const allDrones = await getDroneData();
	const violators = [];

	if(allDrones?.length) {
		allDrones.map((drone) => {
			if(isViolator(drone.positionX, drone.positionY) === true) {
				drone.distanceToNest = getDistanceToNest(drone.positionX, drone.positionY);
				violators.push(drone);
			};
		});
		await insertPilotData(violators);
	}
};

module.exports = fetchData;