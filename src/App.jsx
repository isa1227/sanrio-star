import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Productos from './pages/Productos';
import DetalleProducto from './pages/DetalleProducto';
import './index.css';
import Kuromi from './pages/Kuromi';
import Cinnamoroll from './pages/Cina';
import MyMelody from './pages/Melody';
import BadtzMaru from './pages/BadtzMaru';
import Pochaco from './pages/Pochaco';
import Pompom from './pages/Pompom'; 
import Keroppi from './pages/Keroppi';
import Chococat from './pages/Chococat'; 
import HelloKitty from './pages/Kitty';

function App() {
  const location = useLocation();
const hideNavbar = ['/auth', '/kuromi', '/cinnamoroll', '/mymelody', '/badtzmaru', '/pochaco', '/pompom', '/keroppi', '/chococat', '/kitty'].includes(
  location.pathname.toLowerCase()
);

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
