import axios from "axios";
const baseUrl = "http://localhost:5000/api";

export const pilotDataService = async (violatorData) => {
    try {
        const response = await axios.post(`${baseUrl}/pilots`, violatorData);
        return response.data;
    } catch (error) {
		//maybe return something here to render 'not found' on screen or something ...
        console.error(error);
    }
}

// think of conditions on based what the api responded (200, 404, 500 etc.)
// try catch