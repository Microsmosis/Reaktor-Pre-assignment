import { pilotDataService } from '../services/pilotDataService';

export const pilotData = (async (violatorData) => {
	const allPilots = await pilotDataService(violatorData);
	return allPilots;
});