import { droneDataService } from '../services/droneDataService';

const isViolator = (drone) => {
    if (drone.positionX >= 150000 && 
        drone.positionX <= 350000 && 
        drone.positionY >= 150000 && 
        drone.positionY <= 350000) {
            return true
        } else {
            return false
        };
}

export const droneData = (async () => {
    const allDrones = await droneDataService();
    const violators = [];
    if(allDrones?.length) {
      allDrones.map((drone) => {
        if(isViolator(drone) === true) {
          violators.push(drone);
        };
      });
      return violators;
    }
})