import React, { useState } from 'react';
import '../styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/img/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [query, setQuery] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    localStorage.setItem("mensajeLogout", "🔒 Has cerrado sesión correctamente");
    navigate('/auth');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/buscar?q=${encodeURIComponent(q)}`);
    // opcional: limpiar input
    // setQuery("");
  };

  return (
    <div className="navbar">
      {/* Logo */}
      <Link to="/" className="nav-logo">
        <img src={logo} alt="Logo Sanrio" />
      </Link>

      {/* 🔎 Buscador centrado */}
      <form onSubmit={handleSearch} className="nav-search" role="search" aria-label="Buscar productos">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar productos..."
          aria-label="Buscar productos"
        />
        <button type="submit" aria-label="Buscar">🔍</button>
      </form>

      <div className="nav-links">
        <Link to="/productos" title="Productos">🛍️</Link>
        <Link to="/carrito" title="Carrito">🛒</Link>
        <a href="#contacto" title="Contacto">📞</a>
        {usuario?.rol_id === 2 && (
          <Link to="/admin" title="Panel Administrador">🛠️</Link>
        )}

        {usuario ? (
          <>
            <span className="usuario-nombre">
              {usuario.nombre_usuario} ({usuario.nombre_rol})
            </span>
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
