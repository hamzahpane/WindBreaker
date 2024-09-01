
import axios from "axios";

export async function CreateInvoice(payload, token) {
    return await axios.post('http://localhost:4000/api/cretInvoice', payload, {
    headers: {
        Authorization: `Bearer ${token}`
    }
    });
};


export async function getInvoice( token) {
    return await axios.get('http://localhost:4000/api/getinvoice', {
    headers: {
        Authorization: `Bearer ${token}`
    }
    });
};