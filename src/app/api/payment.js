import axios from "axios";

export async function getpay( ) {

    return await axios.get(`http://localhost:4000/api/getpay`);
};
