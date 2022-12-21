import axios from "axios";
const baseUrl = "http://localhost:5000/api";

export const droneDataService = async () => {
    try {
        const response = await axios.get(`${baseUrl}/drones`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

// think of conditions on based what the api responded (200, 404, 500 etc.)
// try catch