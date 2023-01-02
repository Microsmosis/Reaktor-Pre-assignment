import axios from "axios";
const API_URL = "http://localhost:5000/api";
//const API_URL = https://reaktor-nesty.herokuapp.com

export const droneDataService = async () => {
    try {
        const response = await axios.get(`${API_URL}/drones`);
		//some sort of error handlind maybe here we might be returning 404 etc/
		// if response.status 200 return data, else some string indicating error to render error screen etc.
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
