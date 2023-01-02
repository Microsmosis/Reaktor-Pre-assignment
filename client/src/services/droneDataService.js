import axios from "axios";
//const API_URL = "http://localhost:5000";
const API_URL = "https://reaktor-nesty.herokuapp.com"

export const droneDataService = async () => {
	try {
		const response = await axios.get(`${API_URL}/drones`);
		return response.data;
	} catch (error) {
		console.error(error);
		return null;
	}
}
