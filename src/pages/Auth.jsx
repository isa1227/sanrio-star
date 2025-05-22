import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import loginImage from '../assets/img/login.jpg';
import backIcon from '../assets/img/logo.PNG'; 

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div
        className="auth-image"
        style={{ backgroundImage: `url(${loginImage})` }}
      >

      </div>

      <div className="auth-form">
        <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>

        <form>
          {!isLogin && (
            <input type="text" placeholder="Nombre completo" required />
          )}
          <input type="email" placeholder="Correo electrónico" required />
          <input type="password" placeholder="Contraseña" required />

          <button type="submit">
            {isLogin ? 'Ingresar' : 'Crear cuenta'}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
          <button className="toggle-button" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Regístrate' : 'Inicia sesión'}
          </button>
           <Link to="/" className="back-button">
  <img src="/src/assets/img/logo.PNG" alt="Volver a inicio" />
</Link>
        </p>
      </div>
    </div>
  );
};

export default Auth;
