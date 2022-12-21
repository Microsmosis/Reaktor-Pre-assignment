import { droneDataService } from '../services/droneDataService';

// instead of plain numbers could save the value into some variable
// to improve readabilty and to clarify for people reading the code

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
	drone.positionX = drone.positionX - 250000;
	drone.positionY = drone.positionY - 250000;
	drone.distanceToNest = Math.sqrt(drone.positionX * drone.positionX + drone.positionY * drone.positionY)
	return drone;
}

export const droneData = (async () => {
    const allDrones = await droneDataService();
    const violators = [];
    if(allDrones?.length) {
	  // this map could be done into a own separate function to improve readability !!
      allDrones.map((drone) => {
        if(isViolator(drone) === true) {
		  drone = convertCoordinates(drone);
          violators.push(drone);
        };
      });
      return violators;
    }
})