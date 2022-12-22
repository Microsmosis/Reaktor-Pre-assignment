import './App.css';
import { List } from './components/List';
import { useState } from 'react';
import { droneDataService } from './services/droneDataService';
import { useInterval } from './utils/useInterval';
import { checkDistanceFromNest } from './utils/distanceFromNest';

const App = () => {
  const [violatorPilots, setViolatorPilots] = useState([]);
  const [closestViolator, setClosestViolator] = useState({}); // this is now the drone but has to be the pilot

  useInterval(() => {
	droneDataService().then((violators) => {
		if(violators?.length) {
			setViolatorPilots(violators);
			setClosestViolator(checkDistanceFromNest(violatorPilots));
		}
	});
  }, 3000);

  return (
	// could do small animation before pilots has been fetched
   <div>
      <List pilots={violatorPilots}/>
   </div>
  );
}

export default App;
