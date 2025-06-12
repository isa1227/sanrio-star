import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import "../styles/factura.css";
import fondoFactura from "../assets/img/factura.jpg";

const Factura = ({ productos }) => {
  const facturaRef = useRef();

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [compraConfirmada, setCompraConfirmada] = useState(false);

  const descargarFactura = () => {
    html2canvas(facturaRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = "factura.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const calcularTotal = () => {
    return productos.reduce(
      (total, producto) => total + producto.precio * (producto.cantidad || 1),
      0
    );
  };

  const formatoMoneda = (valor) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(valor);

  return (
    <div className="factura-container">
      <div
        className="factura"
        ref={facturaRef}
        style={{
          backgroundImage: `url(${fondoFactura})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="piquitos superior">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="triangulo superior"></div>
          ))}
        </div>

        <div className="factura-contenido">
          <h2 className="titulo">Factura #000123</h2>
          <p>Fecha: {new Date().toLocaleDateString()}</p>

          {/* Datos del comprador */}
          {nombre && <p><strong>Nombre:</strong> {nombre}</p>}
          {telefono && <p><strong>Teléfono:</strong> {telefono}</p>}
          {direccion && <p><strong>Dirección:</strong> {direccion}</p>}
          {metodoPago && <p><strong>Método de pago:</strong> {metodoPago}</p>}

          <div className="productos-lista">
            {productos.map((producto, index) => (
              <div key={index} className="producto-item">
                <div className="producto-nombre">{producto.nombre}</div>
                <div className="producto-detalle">
                  <span>Cantidad: {producto.cantidad || 1}</span>
                  <span>
                    Precio: {formatoMoneda(producto.precio)} | Total:{" "}
                    {formatoMoneda(
                      producto.precio * (producto.cantidad || 1)
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="total">Total: {formatoMoneda(calcularTotal())}</p>
        </div>

        <div className="piquitos inferior">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="triangulo inferior"></div>
          ))}
        </div>
      </div>

      <div className="botones">
        <button onClick={descargarFactura} className="boton-descargar">
          Descargar
        </button>
        <button onClick={() => setMostrarModal(true)} className="boton-comprar">
          Comprar
        </button>
      </div>

      {compraConfirmada && (
        <div className="mensaje-exito">
          🎉 ¡Gracias por tu compra, {nombre}! Te contactaremos pronto.
        </div>
      )}

      {/* Modal */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <img
              src="https://i.pinimg.com/originals/e3/98/91/e39891a389edfe28202fdd0fd9b6824d.png"
              alt="Decoración"
              className="modal-imagen"
            />
            <h2>Finalizar Compra</h2>

            <label>Nombre completo:</label>
            <input
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            <label>Teléfono:</label>
            <input
              type="tel"
              placeholder="Tu teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />

            <label>Dirección:</label>
            <input
              type="text"
              placeholder="Tu dirección"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />

            <label>Método de pago:</label>
            <select
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value)}
            >
              <option value="">Selecciona...</option>
              <option value="Tarjeta">Tarjeta</option>
              <option value="Nequi">Nequi</option>
              <option value="Efectivo">Efectivo</option>
            </select>

            <div className="modal-botones">
              <button onClick={() => setMostrarModal(false)}>Cancelar</button>
              <button
                onClick={() => {
                  setCompraConfirmada(true);
                  setMostrarModal(false);
                }}
              >
                Confirmar Compra
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Factura;
