import './App.css';
import { List } from './components/List';
import { useState, useEffect } from 'react';
import { droneData } from './utils/droneData';
import { pilotData } from './utils/pilotData';
import { useInterval } from './utils/useInterval';
import { checkDistanceFromNest } from './utils/distanceFromNest';
import { removeViolator } from './utils/removeViolator';
import { removeDuplicates } from './utils/removeDuplicates';

const App = () => {
  const [violatorDrones, setViolatorDrones] = useState([]);
  const [violatorPilots, setViolatorPilots] = useState([]);
  const [closestViolator, setClosestViolator] = useState({}); // this is now the drone but has to be the pilot

  useInterval(() => {
	droneData().then((violators) => {
		if(violators?.length) {
			setViolatorDrones(violators);
		}
	});
  }, 3000);

  useEffect(() => {
	if(violatorDrones?.length) {
		pilotData(removeDuplicates(violatorDrones, violatorPilots)).then((pilots) => {
			if(pilots?.length) {
				setViolatorPilots(current => [...current, ...pilots]);
				setClosestViolator(checkDistanceFromNest(violatorPilots));
			}
		});
    };
  }, [violatorDrones]);

  return (
   <div>
      <List pilots={violatorPilots}/>
   </div>
  );
}

export default App;
