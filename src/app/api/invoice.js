// api/invoice.js
import axios from 'axios';

export const getInvoice = async (token) => {
  return await axios.get('http://localhost:4000/api/getinvoice', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

