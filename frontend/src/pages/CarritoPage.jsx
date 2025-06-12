import React, { useEffect, useState } from 'react';
import "../styles/CarritoPage.css";
import Factura from "../components/Factura";

const CarritoPage = () => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const usuario = localStorage.getItem("usuarioLogueado");

    if (!usuario) {
      setCarrito([]);
      return;
    }

    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
  }, []);

  return (
    <div className="container flex justify-between items-start p-4">
      <div className="w-2/3">
        <h2 className="titulo-carrito">🛒 Estás en el carrito</h2>

        {carrito.length === 0 ? (
          <p style={{ color: 'white', textAlign: 'center' }}>Tu carrito está vacío.</p>
        ) : (
          <div className="carrito-grid">
            {carrito.map((item, index) => (
              <div key={index} className="card">
                <img src={item.imagen} alt={item.nombre} />
                <h3>{item.nombre}</h3>
                <p className="price">${item.precio}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Factura a la derecha arriba */}
      {carrito.length > 0 && (
        <div className="carrito-derecha">
          <Factura productos={carrito} />
        </div>
      )}
    </div>
  );
};

export default CarritoPage;
