// src/components/Navbar.jsx
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';
import logo from "../assets/img/logo.png"; // Asegúrate de que la ruta sea correcta

const Navbar = () => {
  return (
    <div className="navbar">
      {/* Hacer clic en el logo lleva al Home */}
      <Link to="/">
        <img src={logo} alt="Logo Sanrio" />
      </Link>
      <div className="nav-links">
        <Link to="/productos">🛍️</Link>
        <a href="#" title="Carrito">🛒</a>
        <a href="#contacto" title="Contacto">📞</a>
        <Link to="/auth">🔐</Link> {/* ← Ir a login/signup */}
      </div>
    </div>
  );
};

export default Navbar;