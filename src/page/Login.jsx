import React, { useState } from 'react';
import './stylee/login.css';
import { BsBicycle, BsEye, BsEyeSlash } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useLogin from '../hook/authook';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State untuk mengatur visibilitas password
    const [error, setError] = useState('');
    const Navigate = useNavigate();
    const sendRequest = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendRequest(email, password);
            Navigate('/menu')
            // Redirect atau tampilkan pesan sukses
        } catch (error) {
            setError('Login failed. Please check your credentials.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className='container_login_Box'>
                <div className='Login_Box1'>
                    <div className='Logo_Login'>
                        <NavLink to="/"> <BsBicycle size={20}/> WindBreaker </NavLink>
                    </div>

                    <div className='Text_login'>
                        <h1>Sign in or create an account</h1>
                        <p>Welcome Back! login your account </p>

                        <div className="login-container">
                            <form className="login-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        value={email}
                                        placeholder='Enter your email'
                                        onChange={(e) => setEmail(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <div className="password-input-container">
                                        <input 
                                            type={showPassword ? "text" : "password"} 
                                            id="password" 
                                            value={password}
                                            placeholder='Create a password'
                                            onChange={(e) => setPassword(e.target.value)}
                                            required 
                                        />
                                        <span onClick={togglePasswordVisibility} className="password-toggle-icon">
                                            {showPassword ? <BsEyeSlash /> : <BsEye />}
                                        </span>
                                    </div>
                                </div>
                                <button type="submit" className="login-button">Login</button>
                                {error && <p className="error-message">{error}</p>}
                                <div className='text_login_or'>
                                    <div className='garis1'> </div>
                                    <p> OR </p>
                                    <div className='garis2'> </div>
                                </div>
                                <button type="button" className="register-button">
                                    <NavLink to='/Register'>Register</NavLink>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
