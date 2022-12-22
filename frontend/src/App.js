import './App.css';
import { useState, useEffect } from 'react';
import { droneData } from './utils/droneData';
import { pilotData } from './utils/pilotData';
import { useInterval } from './utils/useInterval';
import { checkDistanceFromNest } from './utils/distanceFromNest';

const App = () => {
  const [violators, setViolators] = useState([]);
  const [violatorsInfo, setViolatorsInfo] = useState([]);
  const [closestViolator, setClosestViolator] = useState({});

  useInterval(() => {
	droneData().then((violators) => {
	  setViolators(current => [...current, ...violators])
	});
  }, 3000); // try with 2000

  useEffect(() => {
	if(violators?.length) {
	  console.log(violators)
	  setClosestViolator(checkDistanceFromNest(violators));
      pilotData(violators).then((pilots) => {
        setViolatorsInfo(pilots);
      });
    };
  }, [violators]);

  return (
   <div>
      <h1>BEWARE VIOLATORS YOU WILL BE LISTED HERE!</h1>
   </div>
  );
}

export default App;
