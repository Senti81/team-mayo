import React from 'react'
import logo from '../icons/logo.webp'
import useAuth from '../hooks/useAuth'
import '../styles/login.css'

const Login = () => {
  const { login } = useAuth()
  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-center vh-100 login-container">
      <img src={logo} alt="Team MaYo Logo" className="logo-image" />
        <button className="btn btn-primary login-btn" onClick={login}>
        <img
          src="https://img.icons8.com/color/16/000000/google-logo.png"
          alt="Google Icon"
          className="me-2"
        />
        Mit Google anmelden
      </button>     
    </div>
  );
};

export default Login
