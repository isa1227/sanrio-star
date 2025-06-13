import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import "../styles/factura.css";
import fondoFactura from "../assets/img/factura.jpg";
import fondoModal from "../assets/img/factura2.jpg";

const Factura = ({ productos }) => {
  const facturaRef = useRef();

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarFactura, setMostrarFactura] = useState(true);
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
    return productos.reduce((total, producto) => {
      const precioLimpio = Number(producto.precio.replace(/[^0-9]/g, ""));
      const cantidad = Number(producto.cantidad) || 1;
      return total + precioLimpio * cantidad;
    }, 0);
  };

  const formatoMoneda = (valor) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(valor);

  const validarFormulario = () => {
    if (!nombre.trim() || !telefono.trim() || !direccion.trim() || !metodoPago) {
      alert("Por favor completa todos los campos.");
      return false;
    }

    if (!/^\d{7,15}$/.test(telefono)) {
      alert("El teléfono debe contener solo números y tener entre 7 y 15 dígitos.");
      return false;
    }

    return true;
  };

  return (
    <div className="factura-container">
      <div className="botones">
        

        <button onClick={() => setMostrarFactura((prev) => !prev)} className="boton-comprar">
          {mostrarFactura ? "Ocultar Factura" : "Ver Factura"}
        </button>

        {compraConfirmada && (
          <button onClick={descargarFactura} className="boton-descargar">
            Descargar
          </button>
        )}
      </div>

      {mostrarFactura && (
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
          

          <div className="factura-contenido">
            <h2 className="titulo">Factura #</h2>
            <p>Fecha: {new Date().toLocaleDateString()}</p>

            {nombre && <p><strong>Nombre:</strong> {nombre}</p>}
            {telefono && <p><strong>Teléfono:</strong> {telefono}</p>}
            {direccion && <p><strong>Dirección:</strong> {direccion}</p>}
            {metodoPago && <p><strong>Método de pago:</strong> {metodoPago}</p>}

            <div className="productos-lista">
              {productos.map((producto, index) => {
                const precioLimpio = Number(producto.precio.replace(/[^0-9]/g, ""));
                const cantidad = Number(producto.cantidad) || 1;
                return (
                  <div key={index} className="producto-item">
                    <div className="producto-nombre">{producto.nombre}</div>
                    <div className="producto-detalle">
                      <span>Cantidad: {cantidad}</span>
                      <span>Precio: {formatoMoneda(precioLimpio)}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="total">Total: {formatoMoneda(calcularTotal())}</p>
          </div>
        </div>
      )}

      <button
          onClick={() => setMostrarModal(true)}
          className={`boton-comprar ${mostrarModal ? "sin-fondo" : ""}`}
        >
          Comprar
        </button>

      {mostrarModal && (
        <div className="modal-overlay">
          <div
            className="modal"
            style={{
              backgroundImage: `url(${fondoModal})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              padding: "20px",
              borderRadius: "12px",
              color: "#000",
            }}
          >
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
                  if (validarFormulario()) {
                    setCompraConfirmada(true);
                    setMostrarModal(false);
                    setMostrarFactura(true);
                  }
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
