import { Login } from "../app/api/auth";
import useAuthStore from "../stateM/authstore";

const useLogin = () => {
    const setToken = useAuthStore((state) => state.setToken);

    const sendRequest = async (email, password) => {
        try {
            console.log('Sending login request...');
            const res = await Login({ email, password });
            console.log('Login response:', res);

            if (res && res.data && res.data.token) {
                const token = res.data.token;
                localStorage.setItem('Name' , res.data.username)
                localStorage.setItem('Token', token); // Simpan token di localStorage
                setToken(token);
                console.log('Token set in localStorage and Zustand state.');
                return res.data;
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    return sendRequest;
}



export default useLogin;
