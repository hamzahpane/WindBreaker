import axios from "axios";

export async function fetchProducts(searchQuery, selectedTag, selectedCategory) {
    try {
    const response = await axios.get('http://localhost:4000/api/products', {
        params: {
        q: searchQuery,
        tags: selectedTag,
        category: selectedCategory
        }
    });
    return response.data.data;
    } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
    }
}
