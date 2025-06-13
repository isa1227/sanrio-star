import React, { useEffect, useState } from 'react';
import "../styles/CarritoPage.css";
import Factura from "../components/Factura";

const CarritoPage = () => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const usuario = localStorage.getItem("usuario") || localStorage.getItem("usuario");

    if (!usuario) {
      setCarrito([]);
      return;
    }

    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
  }, []);

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem("carrito");
  };

  return (
    <div className="container flex justify-between items-start p-4">
      <div className="w-2/3">
        <h2 className="titulo-carrito">🛒 Estás en el carrito</h2>

        {carrito.length === 0 ? (
          <p style={{ color: 'white', textAlign: 'center' }}>Tu carrito está vacío.</p>
        ) : (
          <>
            <button 
              onClick={vaciarCarrito} 
              className="btn-vaciar-carrito"
              style={{ marginBottom: '1rem', backgroundColor: '#f87171', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
            >
              Vaciar carrito
            </button>

            <div className="carrito-grid">
              {carrito.map((item, index) => (
                <div key={index} className="card">
                  <img src={item.imagen} alt={item.nombre} />
                  <h3>{item.nombre}</h3>
                  <p className="price">${item.precio}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {carrito.length > 0 && (
        <div className="carrito-derecha">
          <Factura productos={carrito} />
        </div>
      )}
    </div>
  );
};

export default CarritoPage;
