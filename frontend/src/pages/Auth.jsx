import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import loginImage from '../assets/img/login.jpg';
import logoImage from '../assets/img/logo.PNG';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nombre_usuario: '',
    correo: '',
    contrasena: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin
        ? 'http://127.0.0.1:8000/api/login'
        : 'http://127.0.0.1:8000/api/register';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Ocurrió un error');
        return;
      }

      if (isLogin) {
        alert('Inicio de sesión exitoso');
        navigate('/productos');
      } else {
        alert('Registro exitoso');
        setIsLogin(true);
      }
    } catch (error) {
      console.error(error);
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div className="auth-container">
      <div
        className="auth-image"
        style={{
          backgroundImage: `url(${loginImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>

      <div className="auth-form">
        <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="nombre_usuario"
              placeholder="Nombre completo"
              value={formData.nombre_usuario}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required
            />
          )}
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={formData.correo}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            required
          />
          <input
            type="password"
            name="contrasena"
            placeholder="Contraseña"
            value={formData.contrasena}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            required
          />

          <button type="submit">
            {isLogin ? 'Ingresar' : 'Crear cuenta'}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
          <button
            className="toggle-button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </p>

        <Link to="/" className="back-button">
          <img src={logoImage} alt="Volver a inicio" />
        </Link>
      </div>
    </div>
  );
};

export default Auth;
