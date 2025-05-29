import Carrusel from '../components/Carrusel';
import Destacados from '../components/Destacados';
import Footer from '../components/Footer';
import Fondo from '../components/Fondo'; 

import '../styles/Carrusel.css';
import '../styles/productos.css';
import '../styles/Navbar.css';
import '../styles/Fondo.css';

const Home = () => {
  return (
    <div className="home-container">
      <Fondo /> 
      <Carrusel />
      <Destacados />
      <Footer />
    </div>
  );
};

export default Home;
