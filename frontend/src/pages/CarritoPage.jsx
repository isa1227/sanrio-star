import React, { useEffect, useState } from "react";
import "../styles/CarritoPage.css";
import Factura from "../components/Factura";

const CarritoPage = () => {
  const [carrito, setCarrito] = useState([]);
  const [seleccionados, setSeleccionados] = useState({});
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  useEffect(() => {
    localStorage.setItem("seleccionados", JSON.stringify(seleccionados));
  }, [seleccionados]);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];

    const carritoConCantidad = carritoGuardado.map((item) => ({
      ...item,
      cantidad: item.cantidad || 1,
    }));

    setCarrito(carritoConCantidad);

    const seleccionGuardada = JSON.parse(localStorage.getItem("seleccionados"));
    if (seleccionGuardada) {
      setSeleccionados(seleccionGuardada);
    } else {
      const seleccionInicial = {};
      carritoConCantidad.forEach((item) => {
        seleccionInicial[item.producto_id] = true; // ✅ usamos producto_id como clave
      });
      setSeleccionados(seleccionInicial);
    }
  }, []);

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem("carrito");
    setSeleccionados({});
    localStorage.removeItem("seleccionados");
  };

  const toggleSeleccion = (id) => {
    setSeleccionados((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const productosSeleccionados = carrito.filter(
    (item) => seleccionados[item.producto_id]
  );

  const confirmarEliminacion = () => {
    const nuevoCarrito = carrito.filter(
      (item) => item.producto_id !== productoAEliminar
    );
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));

    const nuevosSeleccionados = { ...seleccionados };
    delete nuevosSeleccionados[productoAEliminar];
    setSeleccionados(nuevosSeleccionados);
    localStorage.setItem("seleccionados", JSON.stringify(nuevosSeleccionados));

    setMostrarConfirmacion(false);
  };

  return (
    <>
      <div className="container flex justify-between items-start p-4">
        <div className="w-2/3">
          {carrito.length === 0 ? (
            <>
              <h2 className="titulo-carrito">🛒 Estás en el carrito</h2>
             
            </>
          ) : (
            <>
              <button
                onClick={vaciarCarrito}
                className="btn-vaciar-carrito"
                style={{
                  marginBottom: "1rem",
                  backgroundColor: "#f87171",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Vaciar carrito
              </button>

              <div className="carrito-grid">
                {carrito.map((item, index) => (
                  <div key={item.producto_id} className="card relative">
                    <input
                      type="checkbox"
                      checked={seleccionados[item.producto_id] || false}
                      onChange={() => toggleSeleccion(item.producto_id)}
                      className="checkbox-circulo"
                    />
                    <img src={item.imagen} alt={item.nombre} />
                    <h3>{item.nombre}</h3>
                    <p className="price">${item.precio}</p>

                    <label style={{ color: "white" }}>Cantidad:</label>
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
                      className="input-cantidad"
                    />

                    <button
                      onClick={() => {
                        setProductoAEliminar(item.producto_id);
                        setMostrarConfirmacion(true);
                      }}
                      className="boton-eliminar"
                      style={{
                        position: "absolute",
                        bottom: "-3px",
                        left: "9px",
                        backgroundColor: "#f87171",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        padding: "4px 8px",
                        fontSize: "0.8rem",
                        cursor: "pointer",
                      }}
                    >
                      🗑️
                    </button>
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

      {mostrarConfirmacion && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>¿Estás segura de eliminar este producto? 💔</p>
            <div className="modal-buttons">
              <button onClick={confirmarEliminacion} className="btn-confirmar">
                Sí
              </button>
              <button
                onClick={() => setMostrarConfirmacion(false)}
                className="btn-cancelar"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <footer id="contacto" className="footer-carrito">
        <h3 className="footer-carrito-titulo">Contacto</h3>
        <p className="footer-carrito-texto">Email: contacto@sanriostar.com</p>
        <p className="footer-carrito-texto">Teléfono: +123 456 789</p>
        <p className="footer-carrito-texto">© 2024 Sanrio Star</p>
      </footer>
    </>
  );
};
     
export default CarritoPage;
