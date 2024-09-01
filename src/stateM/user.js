import create from 'zustand';
import axios from 'axios';

// Define the user store
const useUserStore = create((set) => ({
    user: null, // Store user information
    token: localStorage.getItem('Token') || null, // Get token from localStorage or set to null
    setUser: (user) => set({ user }),
    setToken: (token) => {
        localStorage.setItem('Token', token); // Save token to localStorage
        set({ token });
    },
    fetchUser: async () => {
        const { token } = useUserStore.getState();
        if (!token) return; // Exit if no token is available

        try {
            // Call API to fetch user info
            const response = await axios.get('http://localhost:4000/aut/me', {
                headers: { Authorization: `Bearer ${token}` } // Send token in Authorization header
            });
            set({ user: response.data }); // Update state with user info
        } catch (error) {
            console.error("Failed to fetch user:", error);
            set({ user: null }); // Clear user if fetching fails
        }
    },
    clearUser: () => {
        localStorage.removeItem('Token'); // Remove token from localStorage
        set({ token: null, user: null }); // Clear user and token
    }
}));

export default useUserStore;
