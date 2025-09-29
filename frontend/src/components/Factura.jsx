import React, { useRef, useState } from "react"; 
import html2canvas from "html2canvas"; // 🔹 Librería para capturar factura y descargar como imagen
import "../styles/factura.css"; 
import fondoFactura from "../assets/img/factura.jpg"; 
import fondoModal from "../assets/img/factura2.jpg"; 

const Factura = ({ productos }) => {
  const facturaRef = useRef(); 
  // 🔹 Referencia a la factura (para convertirla en imagen)

  // 📌 Estados principales
  const [mostrarModal, setMostrarModal] = useState(false); // 🔹 control modal
  const [mostrarFactura, setMostrarFactura] = useState(true); // 🔹 mostrar/ocultar factura
  const [nombre, setNombre] = useState(""); // 🔹 nombre del cliente
  const [telefono, setTelefono] = useState(""); // 🔹 teléfono del cliente
  const [metodoPago, setMetodoPago] = useState(""); // 🔹 método de pago elegido
  const [compraConfirmada, setCompraConfirmada] = useState(false); // 🔹 compra finalizada
  const [mostrarMensaje, setMostrarMensaje] = useState(false); // 🔹 mensaje éxito temporal

  // 📌 Función: Descargar factura en PNG
  const descargarFactura = () => {
    html2canvas(facturaRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = "factura.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  // 📌 Función: Calcular total de productos
  const calcularTotal = () => {
    return productos.reduce((total, producto) => {
      const precioTexto = producto?.precio || producto?.price || "0";
      const precioLimpio = Number(precioTexto.toString().replace(/[^\d]/g, "")) || 0;
      const cantidad = Number(producto.cantidad) || 1;
      return total + precioLimpio * cantidad;
    }, 0);
  };

  // 📌 Función: Formato de moneda (COP)
  const formatoMoneda = (valor) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(valor);

  // 📌 Función: Validación de formulario
  const validarFormulario = () => {
    if (
      !nombre.trim() ||
      !telefono.trim() ||
      !metodoPago
    ) {
      alert("Por favor completa todos los campos.");
      return false;
    }

    if (!/^\d{7,15}$/.test(telefono)) {
      alert(
        "El teléfono debe contener solo números y tener entre 7 y 15 dígitos."
      );
      return false;
    }

    return true;
  };

  return (
    <div className="factura-container">
      {/* 📌 Botones principales */}
      <div className="botones">
        <button
          onClick={() => setMostrarFactura((prev) => !prev)}
          className="boton-comprar"
        >
          {mostrarFactura ? "Ocultar Factura" : "Ver Factura"}
        </button>

        {compraConfirmada && (
          <button onClick={descargarFactura} className="boton-descargar">
            Descargar
          </button>
        )}
      </div>

      {/* 📌 Factura (solo si mostrarFactura = true) */}
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

            {/* Datos del comprador */}
            {nombre && (
              <p>
                <strong>Nombre:</strong> {nombre}
              </p>
            )}
            {telefono && (
              <p>
                <strong>Teléfono:</strong> {telefono}
              </p>
            )}
            {metodoPago && (
              <p>
                <strong>Método de pago:</strong> {metodoPago}
              </p>
            )}

            {/* 📌 Lista de productos */}
            <div className="productos-lista">
              {productos.map((producto, index) => {
                const nombreProducto =
                  producto?.nombre || producto?.title || "Producto sin nombre";
                const cantidad = Number(producto.cantidad) || 1;
                const precioBruto = producto?.precio || producto?.price || "0";
                const precioLimpio = Number(
                  precioBruto.toString().replace(/[^0-9]/g, "")
                );

                return (
                  <div key={index} className="producto-item">
                    <div className="producto-nombre">{nombreProducto}</div>
                    <div className="producto-detalle">
                      <span>Cantidad: {cantidad}</span>
                      <span>Precio: {formatoMoneda(precioLimpio)}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total */}
            <p className="total">Total: {formatoMoneda(calcularTotal())}</p>
          </div>
        </div>
      )}

      {/* 📌 Botón para abrir modal */}
      <button
        onClick={() => setMostrarModal(true)}
        className={`boton-comprar ${mostrarModal ? "sin-fondo" : ""}`}
      >
        Comprar
      </button>

      {/* 📌 Mensaje de éxito */}
      {mostrarMensaje && (
        <div className="mensaje-exito">¡Compra realizada con éxito!</div>
      )}

      {/* 📌 Modal de compra */}
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

            {/* Inputs del formulario */}
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

            {/* Botones dentro del modal */}
            <div className="modal-botones">
              <button onClick={() => setMostrarModal(false)}>Cancelar</button>
              <button
                onClick={() => {
                  if (validarFormulario()) {
                    setCompraConfirmada(true); // 🔹 compra finalizada
                    setMostrarModal(false); // 🔹 cerrar modal
                    setMostrarFactura(true); // 🔹 mostrar factura
                    setMostrarMensaje(true); // 🔹 mostrar mensaje éxito

                    // Ocultar mensaje después de 5 segundos
                    setTimeout(() => {
                      setMostrarMensaje(false);
                    }, 5000);
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
