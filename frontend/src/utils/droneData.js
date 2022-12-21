import { droneDataService } from '../services/droneDataService';

// instead of plain numbers could save the value into some variable
// to improve readabilty and to clarify for people reading the code

const isViolator = (drone) => {
    if(drone.positionX >= 150000 && 
        drone.positionX <= 350000 && 
        drone.positionY >= 150000 && 
        drone.positionY <= 350000) {
            return true
        } else {
            return false
        };
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
      allDrones.map((drone) => {
        if(isViolator(drone) === true) {
		  drone = convertCoordinates(drone);
          violators.push(drone);
        };
      });
      return violators;
    }
})