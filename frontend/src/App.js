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
	  // useInterval, check Dan Abramov tutorial for interval api calls.
      setViolators(current => [...current, ...violators]); // this is pushing old once twice or more (longer delay can solve this too)have to filter before push
    });
  }, []);

  useEffect(() => {
	if(violators?.length) {
	  // console.log(violators)
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
