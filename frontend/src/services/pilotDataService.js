import axios from "axios";
const baseUrl = "http://localhost:5000/api";

export const pilotDataService = async (violatorData) => {
    const response = await axios.post(`${baseUrl}/pilots`, violatorData);
    return response.data
}

// think of conditions on based what the api responded (200, 404, 500 etc.)
// try catch