import './App.css';
import { useState } from 'react';
import { List } from './components/List';
import { Header } from './components/Header';
import { BackgroundImage } from './components/BacgroundImage';
import { ClosestDistance } from './components/ClosestDistance';
import { pilotDataService } from './services/pilotDataService';
import { distanceService } from './services/closestDistanceService';
import { useInterval } from './utils/useInterval';

const App = () => {
	const [violatorPilots, setViolatorPilots] = useState([]);
	const [closestDistance, setClosestDistance] = useState(0);

	useInterval(() => {
		pilotDataService().then((violators) => {
			if(violators?.length) {
				setViolatorPilots(violators);
			}
		});
		
		distanceService().then((distance) => {
			if(distance) {
				setClosestDistance(distance);
			}
		});
	}, 2000);

	return (
		<>
			{violatorPilots.length === 0 ? (<></>) :
				(<div>
					<BackgroundImage/>
					<Header/>
					<ClosestDistance distance={closestDistance}/>
					<List pilots={violatorPilots}/>
				</div>)}
		</>
	);
};

export default App;
