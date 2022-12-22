import { pilotDataService } from '../services/pilotDataService';

export const pilotData = (async (violatorData) => {
	if(violatorData?.length) {
		const allPilots = await pilotDataService(violatorData);
		return allPilots;
	} else {
		return
	}
});