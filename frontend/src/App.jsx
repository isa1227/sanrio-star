import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { useEffect } from "react";
import axios from "axios";

import AdminPanel from "./components/AdminPanel";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";
import CarritoPage from "./pages/CarritoPage";
import Kuromi from "./pages/Kuromi";
import Cinnamoroll from "./pages/Cina";
import MyMelody from "./pages/Melody";
import BadtzMaru from "./pages/BadtzMaru";
import Pochaco from "./pages/Pochaco";
import Pompom from "./pages/Pompom";
import Keroppi from "./pages/Keroppi";
import Chococat from "./pages/Chococat";
import HelloKitty from "./pages/Kitty";
import "./index.css";
import EmailVerified from "./pages/EmailVerified";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";


const PrivateRoute = ({ children }) => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  return usuario?.rol_id === 2 ? children : <Navigate to="/" />;
};

function App() {
  const location = useLocation();

  const hideNavbar = [
    "/auth",
    "/kuromi",
    "/cinnamoroll",
    "/mymelody",
    "/badtzmaru",
    "/pochaco",
    "/pompom",
    "/keroppi",
    "/chococat",
    "/kitty",
    "/forgot-password",
    "/reset-password/:token",
  ].includes(location.pathname.toLowerCase());

  // 🔄 Llamada al backend al cargar el sitio
  useEffect(() => {
    axios
      .get("http://localhost:5173/api/mensaje")
      .then((res) => {
        console.log("✅ Backend respondió correctamente:", res.data);
      })
      .catch((err) => {
        if (err.response) {
          console.error("❌ Error del servidor (Laravel):", err.response.data);
        } else if (err.request) {
          console.error(
            "❌ No hubo respuesta del backend. ¿Está Laravel corriendo en el puerto 8000?"
          );
        } else {
          console.error(
            "❌ Error en la configuración de la petición:",
            err.message
          );
        }
      });
  }, []);

  return (
    <>
      {/* Navbar solo cuando no está oculto */}
      {!hideNavbar && <Navbar />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:id" element={<DetalleProducto />} />
        <Route path="/carrito" element={<CarritoPage />} />
        <Route path="/kuromi" element={<Kuromi />} />
        <Route path="/cinnamoroll" element={<Cinnamoroll />} />
        <Route path="/mymelody" element={<MyMelody />} />
        <Route path="/badtzmaru" element={<BadtzMaru />} />
        <Route path="/pochaco" element={<Pochaco />} />
        <Route path="/pompom" element={<Pompom />} />
        <Route path="/keroppi" element={<Keroppi />} />
        <Route path="/chococat" element={<Chococat />} />
        <Route path="/kitty" element={<HelloKitty />} />
        <Route path="/email-verified" element={<EmailVerified />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
