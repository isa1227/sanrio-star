import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import "../styles/factura.css";
import fondoFactura from "../assets/img/factura.jpg";
import fondoModal from "../assets/img/factura2.jpg";
import DetalleFactura from "./DetalleFactura";
import { useNavigate } from "react-router-dom";

const Factura = ({ productos, limpiarCarrito }) => {
  const navigate = useNavigate(); // ✅ AQUÍ
  const facturaRef = useRef();

  // Estados
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarFactura, setMostrarFactura] = useState(true);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [compraConfirmada, setCompraConfirmada] = useState(false);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  // Descargar factura como imagen
  const descargarFactura = () => {
    html2canvas(facturaRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = "factura.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  // Calcular total
  const calcularTotal = () => {
    return productos.reduce((total, producto) => {
      const precioTexto = producto?.precio || producto?.price || "0";
      const precioLimpio =
        Number(precioTexto.toString().replace(/[^\d]/g, "")) || 0;
      const cantidad = Number(producto.cantidad) || 1;
      return total + precioLimpio * cantidad;
    }, 0);
  };

  // Formato moneda COP
  const formatoMoneda = (valor) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(valor);

  // Validación de formulario
  const validarFormulario = () => {
    if (!nombre.trim() || !telefono.trim() || !metodoPago) {
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

  // Confirmar compra (factura + detalle_factura)
  const confirmarCompra = async () => {
    if (!validarFormulario()) return;

    try {
      const usuarioId = localStorage.getItem("usuario_id") || 1;
      console.log("ID que estoy enviando:", Number(usuarioId));

      // 1️⃣ Crear factura
      // 1️⃣ Crear factura
      const resFactura = await fetch("http://127.0.0.1:8000/api/facturas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario_id: Number(usuarioId), // 👈 AQUI SE AGREGA
          total: calcularTotal(),
          metodo_pago_id: Number(metodoPago),
        }),
      });

      const dataFactura = await resFactura.json();
      const facturaId = dataFactura.factura_id;
      console.log("ID factura creada:", facturaId);

      // 2️⃣ Guardar detalles de la factura
      const detalles = productos.map((p) => ({
        producto_id: p.producto_id || p.id,
        cantidad: p.cantidad,
        precio: Number(
          (p.precio || p.price || "0").toString().replace(/[^\d]/g, "")
        ),
      }));
      console.log(
        "DETALLES DETALLADOS:",
        JSON.stringify(
          {
            factura_id: facturaId,
            detalles: detalles,
          },
          null,
          2
        )
      );

      await fetch("http://127.0.0.1:8000/api/facturas/detalle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          factura_id: facturaId,
          detalles,
        }),
      });

      // 3️⃣ Mostrar éxito y limpiar carrito
      setCompraConfirmada(true);
      setMostrarModal(false);
      setMostrarFactura(true);
      setMostrarMensaje(true);

      localStorage.removeItem("carrito");
      localStorage.removeItem("seleccionados");

      if (typeof limpiarCarrito === "function") 

      setTimeout(() => setMostrarMensaje(false), 5000);
    } catch (error) {
      console.error("Error realizando la compra:", error);
      alert("Ocurrió un error al realizar la compra 😭");
    }
  };

  return (
    <div className="factura-container">
      {/* Botones principales */}
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

      {/* Factura */}
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
                <strong>Método de pago:</strong>{" "}
                {["Nequi", "Tarjeta", "Efectivo"][Number(metodoPago) - 1]}
              </p>
            )}

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

            <p className="total">Total: {formatoMoneda(calcularTotal())}</p>
          </div>
        </div>
      )}

      {/* Botón abrir modal */}
      <button
        onClick={() => setMostrarModal(true)}
        className={`boton-comprar ${mostrarModal ? "sin-fondo" : ""}`}
      >
        Comprar
      </button>

      {/* Mensaje éxito */}
      {mostrarMensaje && (
        <div className="mensaje-exito">¡Compra realizada con éxito!</div>
      )}

      {/* Modal de compra */}
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

            <label>Método de pago:</label>
            <select
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value)}
            >
              <option value="">Selecciona...</option>
              <option value="1">Nequi</option>
              <option value="2">Tarjeta</option>
              <option value="3">Efectivo</option>
            </select>

            <div className="modal-botones">
              <button onClick={() => setMostrarModal(false)}>Cancelar</button>
              <button onClick={confirmarCompra}>Confirmar Compra</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Factura;
