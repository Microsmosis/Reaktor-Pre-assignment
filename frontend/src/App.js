import './App.css';
import { useState, useEffect } from 'react';
import { droneData } from './utils/droneData';
import { pilotData } from './utils/pilotData';

function App() {
  const [violators, setViolators] = useState([]);
  const [violatorsInfo, setViolatorsInfo] = useState([]);
  const [closestViolator, setClosestViolator] = useState({});
  // We might want to do this request in few second intervals
  // so this useEffect is here now only for testing.
  // Can try to pass violators as dependency for useEffect, but might be
  // a bit heavy way to do it :DDDDD
  useEffect(() => {
    droneData().then((violators) => {
      console.log('violators : ', violators);
      // could do a filter here for the closest nest violator from old and new violators
      // and here we would want to concat instead of always adding a new list of violators
      // and do some kind of checks that should we remove a violator of the list due to 10 min constrict
      setViolators(violators);
    })
  }, []);

  useEffect(() => {
    if(violators.length) {
      pilotData(violators).then((pilots) => {
        console.log(pilots);
        setViolatorsInfo(pilots);
      });
    }
  }, [violators])

  return (
   <div>
      <h1>BEWARE VIOLATORS YOU WILL BE LISTED HERE!</h1>
   </div>
  );
}

export default App;
