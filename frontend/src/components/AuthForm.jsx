import React, { useState } from 'react';
import '../styles/auth.css';

const API_URL = import.meta.env.VITE_API_URL;

const AuthForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_usuario: fullName,
          correo: email,
          contrasena: password,
        }),
      });

      const text = await response.text();

      try {
        const data = JSON.parse(text);
        console.log('✅ Registro exitoso:', data);
      } catch {
        console.error('❌ El servidor devolvió HTML (posible error 500):');
        console.error(text);
      }

    } catch (error) {
      console.error('❌ Error al conectar con el servidor:', error.message);
    }
  };

  return (
    <div className="auth-form">
      <div className="auth-toggle">
        <button className="inactive">Sign In</button>
        <button className="active">Sign Up</button>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="checkbox">
          <input type="checkbox" /> Acepto los <a href="#">términos del servicio</a>
        </label>

        <button type="submit" className="submit-btn">Registrarse</button>
        <p className="already">Ya soy miembro</p>
      </form>
    </div>
  );
};

export default AuthForm;