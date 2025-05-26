import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Productos from './pages/Productos';
import DetalleProducto from './pages/DetalleProducto';
import Kuromi from './pages/Kuromi';
import Cinnamoroll from './pages/Cina';
import MyMelody from './pages/Melody';
import BadtzMaru from './pages/BadtzMaru';
import Pochaco from './pages/Pochaco';
import Pompom from './pages/Pompom'; 
import Keroppi from './pages/Keroppi';
import Chococat from './pages/Chococat'; 
import HelloKitty from './pages/Kitty';
import './index.css';

function App() {
  const location = useLocation();

  const hideNavbar = [
    '/auth',
    '/kuromi',
    '/cinnamoroll',
    '/mymelody',
    '/badtzmaru',
    '/pochaco',
    '/pompom',
    '/keroppi',
    '/chococat',
    '/kitty'
  ].includes(location.pathname.toLowerCase());

  // 🔄 Llamada al backend al cargar el sitio
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/mensaje')
      .then(res => {
        console.log('✅ Backend respondió correctamente:', res.data);
      })
      .catch(err => {
        if (err.response) {
          console.error('❌ Error del servidor (Laravel):', err.response.data);
        } else if (err.request) {
          console.error('❌ No hubo respuesta del backend. ¿Está Laravel corriendo en el puerto 8000?');
        } else {
          console.error('❌ Error en la configuración de la petición:', err.message);
        }
      });
  }, []);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:id" element={<DetalleProducto />} />
        <Route path="/kuromi" element={<Kuromi />} />
        <Route path="/cinnamoroll" element={<Cinnamoroll />} />
        <Route path="/mymelody" element={<MyMelody />} />
        <Route path="/badtzmaru" element={<BadtzMaru />} />
        <Route path="/pochaco" element={<Pochaco />} />
        <Route path="/pompom" element={<Pompom />} />
        <Route path="/keroppi" element={<Keroppi />} />
        <Route path="/chococat" element={<Chococat />} />
        <Route path="/kitty" element={<HelloKitty />} />
      </Routes>
    </>
  );
}

export default App;
