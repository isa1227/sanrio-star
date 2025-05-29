import React, { useEffect, useState } from 'react';
import '../styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/img/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogueado");
    localStorage.setItem("mensajeLogout", "🔒 Has cerrado sesión correctamente");
    navigate('/auth');
  };

  return (
    <div className="navbar">
      {/* Logo */}
      <Link to="/">
        <img src={logo} alt="Logo Sanrio" />
      </Link>

      <div className="nav-links">
        <Link to="/productos" title="Productos">🛍️</Link>
        <Link to="/carrito" title="Carrito">🛒</Link>
        <a href="#contacto" title="Contacto">📞</a>

        {usuario ? (
          <>
            <span className="usuario-nombre">{usuario.nombre_usuario}</span>
            <button className="logout-button" onClick={handleLogout}>🚪 Cerrar sesión</button>
          </>
        ) : (
          <Link to="/auth" title="Iniciar sesión">🔐</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
