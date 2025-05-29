import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import loginImage from '../assets/img/login.jpg';
import logoImage from '../assets/img/logo.PNG';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [mensaje, setMensaje] = useState('');
  const [formData, setFormData] = useState({
    nombre_usuario: '',
    correo: '',
    contrasena: ''
  });

  const navigate = useNavigate();

  // Mostrar solo mensaje de logout (en /auth)
  useEffect(() => {
    const mensajeLogout = localStorage.getItem("mensajeLogout");
    if (mensajeLogout) {
      setMensaje(mensajeLogout);
      localStorage.removeItem("mensajeLogout");

      const timer = setTimeout(() => setMensaje(''), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin
      ? 'http://127.0.0.1:8000/api/login'
      : 'http://127.0.0.1:8000/api/register';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Ocurrió un error');
        return;
      }

      if (isLogin) {
        localStorage.setItem("usuarioLogueado", JSON.stringify(data.usuario));
        localStorage.setItem("mensajeAuth", "✅ Inicio de sesión exitoso");
        navigate('/productos'); // Mostrará el mensaje allá
      } else {
        alert('✅ Registro exitoso');
        setIsLogin(true);
      }

    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error al conectar con el servidor');
    }
  };

  return (
    <div className="auth-container">
      {/* Imagen a la izquierda */}
      <div
        className="auth-image"
        style={{
          backgroundImage: `url(${loginImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>

      {/* Formulario */}
      <div className="auth-form">
        <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>

        {mensaje && <p className="mensaje-auth">{mensaje}</p>}

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
          <button type="submit">{isLogin ? 'Ingresar' : 'Crear cuenta'}</button>
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
