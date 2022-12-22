import { droneDataService } from '../services/droneDataService';

const isViolator = (drone) => {
	const circleX = 250000;
	const circleY = 250000;
	const radius = 100000;

	if ((drone.positionX - circleX) * (drone.positionX - circleX) +
		  (drone.positionY - circleY) * (drone.positionY - circleY) <= radius * radius) {
	  return true;
	} else {
	  return false;
	}
}

const convertCoordinates = (drone) => {
	const nestPosition = 250000;
	drone.positionX = drone.positionX - nestPosition;
	drone.positionY = drone.positionY - nestPosition;
	drone.distanceToNest = Math.sqrt(drone.positionX * drone.positionX + drone.positionY * drone.positionY)
	return drone;
}

export const droneData = (async () => {
	const allDrones = await droneDataService();
	return allDrones;
})