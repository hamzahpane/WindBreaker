import create from 'zustand';
import { Logout } from '../app/api/auth';

const useAuthStore = create((set) => ({
    token: null,
    setToken: (token) => set({ token }),

    // Logout function
    logout: async () => {
        try {
            const token = useAuthStore.getState().token;
            if (token) {
                await Logout({ token }); 
                set({ token: null }); 
            }
        } catch (error) {
            console.error("Logout failed:", error.response?.data || error.message);
        }
    },
}));

export default useAuthStore;
