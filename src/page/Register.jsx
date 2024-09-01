import React from 'react';
import { BsBicycle } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import './stylee/register.css';
import useAuthRegis from '../stateM/storeRegis';
const Register = () => {
  
 
  const {
    username,
    email,
    password,
    loading,
    error,
    setUsername,
    setEmail,
    setPassword,
    register,
  } = useAuthRegis();

  const handleSubmit = (e) => {
    e.preventDefault();
    register();

  };

  return (
    <>
      <div className="container_login_Box">
        <div className="Login_Box1">
          <div className="Logo_Login">
            <NavLink to="/">
              <BsBicycle size={20} /> WindBreaker
            </NavLink>
          </div>

          <div className="Text_login">
            <h1>Create your account now</h1>
            <p>Welcome Back! Please enter your details</p>

            <div className="login-container">
              <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    placeholder="Enter your username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    placeholder="Create a password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="login-button"
                  disabled={loading}
                >
                  {loading ? 'Registering...' : 'Register'}
                </button>

                {error && <div className="error">{error}</div>}

                <div className="text_login_or">
                  <div className="garis1"></div>
                  <p>OR</p>
                  <div className="garis2"></div>
                </div>

                <button type="button" className="register-button">
                  <NavLink to="/Login">Login</NavLink>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
