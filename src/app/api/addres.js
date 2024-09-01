import axios from "axios";

export async function createAddress(payload, token) {
  return await axios.post('http://localhost:4000/api/deliveryAddres', payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};


export async function getAddress(token) {

  return await axios.get(`http://localhost:4000/api/deliveryAddres`, {
      headers: {
      Authorization: `${token}`
  }
    });
};

export async function deleteAddress(id, token) {
  try {
    const response = await axios.delete(`http://localhost:4000/api/deliveryAddres/${id}`, {
      headers: {
        Authorization: `${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to delete address:', error);
    throw error;
  }
}