import React from 'react';
import '../styles/auth.css';
import welcomeImage from '../assets/img/login.jpg';

const WelcomePanel = () => {
  return (
    <div className="auth-welcome">
      <img src={welcomeImage} alt="Bienvenida" />
      <h2>Plan your activities and control your progress online</h2>
    </div>
  );
};

export default WelcomePanel;
