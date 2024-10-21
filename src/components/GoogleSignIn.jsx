import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../config/firebase';
import '../styles/login.css'
import logo from '../icons/logo.webp'
import useAuth from '../hooks/useAuth';

const GoogleSignIn = () => {
  const { user, loading, error } = useAuth()

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Fehler bei der Google-Anmeldung:", error.message);
    }
  };

  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-center vh-100 login-container">
      <img src={logo} alt="Team MaYo Logo" className="logo-image" />
        <button className="btn btn-primary login-btn" onClick={handleGoogleSignIn}>
        <img
          src="https://img.icons8.com/color/16/000000/google-logo.png"
          alt="Google Icon"
          className="me-2"
          />
        Mit Google anmelden
      </button>
      {error &&
        <div className="alert alert-danger alert-dismissible fade show mt-3" role="alert">
          <strong>{error}</strong>
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      }
    </div>
  );
};

export default GoogleSignIn;
