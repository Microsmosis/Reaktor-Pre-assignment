import axios from "axios";
const API_URL = "https://reaktor-nesty.herokuapp.com"

export const pilotDataService = async () => {
	try {
		const response = await axios.get(`${API_URL}/pilots`);
		return response.data;
	} catch (error) {
		return null;
	}
}
