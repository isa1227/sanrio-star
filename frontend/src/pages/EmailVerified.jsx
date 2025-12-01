import React from 'react';
import '../styles/EmailVerified.css';

export default function EmailVerified() {
  return (
    <div className="email-verified-wrapper">
      <div className="email-card">
        <h1>¡Correo activado!</h1>
        <p>Tu cuenta ha sido verificada correctamente.</p>

        <button
          className="primary-btn"
          onClick={() => window.location.href = "http://localhost:5173/auth"}
        >
          Volver al Login
        </button>
      </div>
    </div>
  );
}
