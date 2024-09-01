import axios from "axios";

export async function getOrders(token) {

    return await axios.get(`http://localhost:4000/api/getOrders`, {
        headers: {
        Authorization: `${token}`
    }
    });
};


export async function deleteOrder(id, token) {
    try {
    const response = await axios.delete(`http://localhost:4000/api/Orders/${id}`, {
        headers: {
        Authorization: `${token}`
        }
    });
      return response.data;
    } catch (error) {
      console.error('Failed to delete Order:', error);
      throw error;
    }
  }
