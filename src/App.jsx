import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Productos from './pages/Productos';
import DetalleProducto from './pages/DetalleProducto';
import './index.css';

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/auth';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:id" element={<DetalleProducto />} />
      </Routes>
    </>
  );
}

export default App;
