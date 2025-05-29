import React from 'react';
import '../styles/Footer.css';

// Importar imágenes
import fondoFooter from '../assets/img/footer.jpg';
import facebookIcon from '../assets/img/facebook.jpeg';
import whatsappIcon from '../assets/img/whats.jpeg';
import instagramIcon from '../assets/img/insta.jpeg';


const Footer = () => {
  return (
    <div className="foter-container">
      <img src={fondoFooter} alt="Fondo de foter" className="foter-background" />

      <footer id="contacto" className="foter">
        <h3>Contacto</h3>
        <p>Email: contacto@sanriosatar.com</p>
        <p>Teléfono: +123 456 789</p>
        <p>© 2024 Sanrio Star</p>
      </footer>

      <footer className="foter2">
        <h3>Redes</h3>
        <div className="social-icons">
          <a href="https://www.facebook.com/Sanrio" target="_blank" rel="noopener noreferrer">
            <img src={facebookIcon} alt="Facebook" />
          </a>
          <a href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer">
            <img src={whatsappIcon} alt="WhatsApp" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram" />
          </a>
        </div>
      </footer>

      <footer className="foter2">
        <div>
          <h3>Sobre nosotros</h3>
          <p>En nuestra tienda Sanrio Star, nos apasiona llevarte lo mejor del universo Sanrio.</p>
          <p>¡Nos encanta compartir la magia de Sanrio con cada uno de nuestros clientes!</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
