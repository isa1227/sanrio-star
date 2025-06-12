import React, { useEffect, useState } from 'react';
import '../styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/img/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const handleLogout = () => {
    localStorage.removeItem("usuario");
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
        {usuario?.rol_id === 2 && (
          <Link to="/admin" title="Panel Administrador">🛠️</Link>
        )}

        {usuario ? (
          <>
           {usuario && (
  <span className="text-white font-bold">
    {usuario.nombre_usuario} ({usuario.nombre_rol})
  </span>
)}

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
