import { create } from 'zustand';
import axios from 'axios';

const useAuthRegis = create((set, get) => ({
  username: '',
  email: '',
  password: '',
  loading: false,
  error: null,
  userInfo: null,

  // Update field states
  setUsername: (username) => set({ username }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),

  // Register user
  register: async () => {
    set({ loading: true, error: null });
    const { username, email, password } = get(); // Mengakses state menggunakan get()
    try {
      const response = await axios.post('http://localhost:4000/aut/regis', {
        username,
        email,
        password,
      });
      set({ userInfo: response.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data || 'Something went wrong',
        loading: false,
      });
    }
  },

  // Reset store state
  reset: () =>
    set({
      username: '',
      email: '',
      password: '',
      loading: false,
      error: null,
      userInfo: null,
    }),
}));


export default useAuthRegis;
