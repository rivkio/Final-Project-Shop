// salesService.ts
import axios from 'axios';

const baseUrl = 'https://apinodeproject-2.onrender.com/api/v1';
const analyticsUrl = `${baseUrl}/analytics`;


export const getSalesByDate = (startDate: String, endDate: String) => {
    return axios.get(`${analyticsUrl}/analytics`, {
        params: { startDate, endDate },
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
};


// export const getOrderStatus = () => {
//     return axios.get(`${analyticsUrl}/order-status`, {
//         headers: {
//             "x-auth-token": localStorage.getItem("token"),
//         }
//     });
// };


export const updateOrderStatus = (orderId: string, status: string) => {
    return axios.patch(`${analyticsUrl}/status/${orderId}`, { orderId, status }, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
}


export const getAllOrders = () => {
    const url = `${analyticsUrl}/all-orders`;
    return axios.get(url, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        },
    });
};


const analyticsService = { getSalesByDate, getAllOrders, updateOrderStatus };

export default analyticsService;