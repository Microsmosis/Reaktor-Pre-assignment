import './App.css';
import { useState } from 'react';
import { List } from './components/List';
import { Header } from './components/Header';
import { BackgroundImage } from './components/BacgroundImage';
import { ClosestViolator } from './components/ClosestViolator';
import { droneDataService } from './services/droneDataService';
import { useInterval } from './utils/useInterval';
import { checkDistanceFromNest } from './utils/distanceFromNest';

const App = () => {
  const [violatorPilots, setViolatorPilots] = useState([]);
  const [closestViolator, setClosestViolator] = useState({});

  useInterval(() => {
	droneDataService().then((violators) => {
		if(violators?.length) {
			setViolatorPilots(violators);
			setClosestViolator(checkDistanceFromNest(violatorPilots));
		}
	});
  }, 3000);

  return (
	<>
		{violatorPilots.length === 0 ? (<></>) :
			(<div className='app'>
				<BackgroundImage/>
				<Header/>
				<ClosestViolator violator={closestViolator}/>
				<List pilots={violatorPilots}/>
			</div>)}
	</>
   );
}

export default App;
