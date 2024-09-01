
import axios from "axios";

export async function postordersItem(payload, token) {
    return await axios.post('http://localhost:4000/api/ordersItem', payload, {
    headers: {
        Authorization: `Bearer ${token}`
    }
    });
};
