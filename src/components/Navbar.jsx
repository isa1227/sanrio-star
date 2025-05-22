// src/components/Navbar.jsx
import './Navbar.css';
import logo from '../assets/img/logo.PNG';

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logo} alt="Logo Sanrio" />
      <div className="nav-links">
        <a href="#" title="Productos">🛍️</a>
        <a href="#" title="Carrito">🛒</a>
        <a href="#" title="Contacto">📞</a>
      </div>
    </div>
  );
};

export default Navbar;