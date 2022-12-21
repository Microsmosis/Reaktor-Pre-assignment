import './App.css';
import { useState, useEffect } from 'react';
import { droneData } from './utils/droneData';
import { pilotData } from './utils/pilotData';
import { checkDistanceFromNest } from './utils/distanceFromNest';

const App = () => {
  const [violators, setViolators] = useState([]);
  const [violatorsInfo, setViolatorsInfo] = useState([]);
  const [closestViolator, setClosestViolator] = useState({});

  useEffect(() => {
    droneData().then((violators) => {
      // do some kind of checks that should we remove a violator of the list due to 10 min constrict
	  // maybe cron job or in the useEffect beneath ( can cause infinte loop so maybe bad idea ..)
      setViolators(current => [...current, ...violators]);
    });
  }, []);

  useEffect(() => {
	if(violators?.length) {
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
