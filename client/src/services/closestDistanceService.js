import axios from "axios";
//const API_URL = "https://reaktor-nesty.herokuapp.com"
const API_URL = "https://localhost:5000";

export const distanceService = async () => {
	try {
		const response = await axios.get(`${API_URL}/distance`);
		return response.data;
	} catch (error) {
		return null;
	};
};
