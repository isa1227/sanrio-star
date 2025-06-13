import React, { useEffect, useState } from 'react';
import "../styles/CarritoPage.css";
import Factura from "../components/Factura";

const CarritoPage = () => {
  const [carrito, setCarrito] = useState([]);
  const [seleccionados, setSeleccionados] = useState({});

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    if (!usuario) {
      setCarrito([]);
      return;
    }

    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];

    const carritoConCantidad = carritoGuardado.map(item => ({
      ...item,
      cantidad: item.cantidad || 1
    }));

    setCarrito(carritoConCantidad);

    const seleccionInicial = {};
    carritoConCantidad.forEach((_, index) => {
      seleccionInicial[index] = true;
    });
    setSeleccionados(seleccionInicial);
  }, []);

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem("carrito");
    setSeleccionados({});
  };

  const toggleSeleccion = (index) => {
    setSeleccionados((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const productosSeleccionados = carrito.filter((_, index) => seleccionados[index]);

  return (
    <>
      <div className="container flex justify-between items-start p-4">
        <div className="w-2/3">
          {carrito.length === 0 ? (
            <>
              <h2 className="titulo-carrito">🛒 Estás en el carrito</h2>
              <p style={{ color: 'white', textAlign: 'center' }}>Tu carrito está vacío.</p>
            </>
          ) : (
            <>
              <button 
                onClick={vaciarCarrito} 
                className="btn-vaciar-carrito"
                style={{
                  marginBottom: '1rem',
                  backgroundColor: '#f87171',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Vaciar carrito
              </button>

              <div className="carrito-grid">
                {carrito.map((item, index) => (
                  <div key={index} className="card relative">
                    <input
                      type="checkbox"
                      checked={seleccionados[index] || false}
                      onChange={() => toggleSeleccion(index)}
                      className="checkbox-circulo"
                    />
                    <img src={item.imagen} alt={item.nombre} />
                    <h3>{item.nombre}</h3>
                    <p className="price">{item.precio}</p>

                    <label style={{ color: 'white' }}>Cantidad:</label>
                    <input
                      type="number"
                      min="1"
                      value={item.cantidad}
                      onChange={(e) => {
                        const nuevaCantidad = parseInt(e.target.value) || 1;
                        setCarrito((prev) => {
                          const nuevo = [...prev];
                          nuevo[index].cantidad = nuevaCantidad;
                          localStorage.setItem("carrito", JSON.stringify(nuevo));
                          return nuevo;
                        });
                      }}
                      style={{ width: '60px', textAlign: 'center' }}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {productosSeleccionados.length > 0 && (
          <div className="carrito-derecha">
            <Factura productos={productosSeleccionados} />
          </div>
        )}
      </div>

      {/* Footer personalizado para carrito */}
      <footer className="footer-carrito">
        <h3 className="footer-carrito-titulo">Contacto</h3>
        <p className="footer-carrito-texto">Email: contacto@sanriostar.com</p>
        <p className="footer-carrito-texto">Teléfono: +123 456 789</p>
        <p className="footer-carrito-texto">© 2024 Sanrio Star</p>
      </footer>
    </>
  );
};

export default CarritoPage;
