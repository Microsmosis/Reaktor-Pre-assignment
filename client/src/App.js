import './App.css';
import io from "socket.io-client";
import { useState } from 'react';
import { List } from './components/List';
import { Header } from './components/Header';
import { BackgroundImage } from './components/BacgroundImage';
import { ClosestDistance } from './components/ClosestDistance';
import { useInterval } from './utils/useInterval';

const socket = io.connect("http://reaktor-nesty.herokuapp.com");

const App = () => {
	const [violatorPilots, setViolatorPilots] = useState([]);
	const [closestDistance, setClosestDistance] = useState(0);

	useInterval(() => {
		socket.emit("violators", (violators) => {
			if(violators?.length) {
				setViolatorPilots(violators);
			}
		});
		socket.emit("closest_distance", (distance) => {
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
