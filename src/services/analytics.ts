// salesService.ts
import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/v1';
const analyticsUrl = `${baseUrl}/analytics`;

const getSalesByDate = (startDate: Date, endDate: Date) => {
    return axios.get(`${analyticsUrl}/sales-by-date`, {
        params: { startDate: startDate.toISOString(), endDate: endDate.toISOString() },
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
};

const salesService = { getSalesByDate };

export default salesService;