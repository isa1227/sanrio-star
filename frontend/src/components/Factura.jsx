import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import "../styles/factura.css";
import fondoFactura from "../assets/img/factura.jpg";
import fondoModal from "../assets/img/factura2.jpg";
import { useNavigate } from "react-router-dom";

const Factura = ({ productos, limpiarCarrito }) => {
  const navigate = useNavigate();
  const facturaRef = useRef();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarFactura, setMostrarFactura] = useState(true);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [compraConfirmada, setCompraConfirmada] = useState(false);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [direccion, setDireccion] = useState("");
  const [numeroNequi, setNumeroNequi] = useState("");
  const [tarjeta, setTarjeta] = useState({
    numero: "",
    expiracion: "",
    cvv: "",
  });

  const [verNequi, setVerNequi] = useState(false);
  const [verTarjeta, setVerTarjeta] = useState(false);
  const [verCVV, setVerCVV] = useState(false);

  // Descargar factura
  // const descargarFactura = () => {
  //   html2canvas(facturaRef.current).then((canvas) => {
  //     const link = document.createElement("a");
  //     link.download = "factura.png";
  //     link.href = canvas.toDataURL();
  //     link.click();
  //   });
  // };

  const calcularTotal = () => {
    return productos.reduce((total, producto) => {
      const precioTexto = producto?.precio || producto?.price || "0";
      const precioLimpio =
        Number(precioTexto.toString().replace(/[^\d]/g, "")) || 0;
      const cantidad = Number(producto.cantidad) || 1;
      return total + precioLimpio * cantidad;
    }, 0);
  };

  const formatoMoneda = (valor) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(valor);

  const formatearTarjeta = (num) => {
    const soloNumeros = num.replace(/\D/g, "").slice(0, 16);
    return soloNumeros.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatearFecha = (val) => {
    const soloNumeros = val.replace(/\D/g, "").slice(0, 4);
    if (soloNumeros.length >= 3) {
      return soloNumeros.slice(0, 2) + "/" + soloNumeros.slice(2);
    } else {
      return soloNumeros;
    }
  };

  const validarFormulario = () => {
    if (!nombre.trim()) {
      alert("Ingresa tu nombre.");
      return false;
    }
    if (!telefono.trim() || !/^\d{7,15}$/.test(telefono)) {
      alert("Teléfono inválido.");
      return false;
    }
    if (!direccion.trim()) {
      alert("Ingresa tu dirección.");
      return false;
    }
    if (!metodoPago) {
      alert("Selecciona método de pago.");
      return false;
    }

    if (metodoPago === "1") {
      if (!numeroNequi.trim() || !/^\d{7,15}$/.test(numeroNequi)) {
        alert("Nequi inválido.");
        return false;
      }
    }

    if (metodoPago === "2") {
      if (
        !tarjeta.numero.trim() ||
        !tarjeta.expiracion.trim() ||
        !tarjeta.cvv.trim()
      ) {
        alert("Completa datos tarjeta.");
        return false;
      }
      if (!/^\d{16}$/.test(tarjeta.numero.replace(/\s+/g, ""))) {
        alert("Número de tarjeta debe tener 16 dígitos.");
        return false;
      }
      if (!/^\d{2}\/\d{2}$/.test(tarjeta.expiracion)) {
        alert("Fecha expiración MM/AA.");
        return false;
      }
      if (!/^\d{3}$/.test(tarjeta.cvv)) {
        alert("CVV debe tener 3 dígitos.");
        return false;
      }
    }

    return true;
  };

  const confirmarCompra = async () => {
    if (!validarFormulario()) return;

    try {
      const usuarioId = localStorage.getItem("usuario_id") || 1;

      const datosPago =
        metodoPago === "1"
          ? { numero_nequi: numeroNequi }
          : metodoPago === "2"
          ? {
              tarjeta_numero: tarjeta.numero.replace(/\s+/g, ""),
              tarjeta_exp: tarjeta.expiracion,
              tarjeta_cvv: tarjeta.cvv,
            }
          : {};

      // 1️⃣ Guardar factura
      const resFactura = await fetch("http://127.0.0.1:8000/api/facturas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario_id: Number(usuarioId),
          total: calcularTotal(),
          metodo_pago_id: Number(metodoPago),
          nombre,
          telefono,
          direccion,
          ...datosPago,
        }),
      });

      if (!resFactura.ok) throw new Error("Error al guardar la factura");

      const dataFactura = await resFactura.json();
      const facturaId = dataFactura.factura_id;

      // 2️⃣ Guardar detalles_factura
      const detallesFactura = productos.map((p) => ({
        producto_id: p.producto_id || p.id,
        cantidad: p.cantidad,
        precio: Number(
          (p.precio || p.price || "0").toString().replace(/[^\d]/g, "")
        ),
      }));

      const resDetalle = await fetch(
        "http://127.0.0.1:8000/api/facturas/detalle",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            factura_id: facturaId,
            detalles: detallesFactura,
          }),
        }
      );

      if (!resDetalle.ok)
        throw new Error("Error al guardar los detalles de factura");

      // 3️⃣ Crear pedido
      const resPedido = await fetch("http://127.0.0.1:8000/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario_id: Number(usuarioId),
          total: calcularTotal(),
          estado: "pendiente",
          productos: productos.map((p) => ({
            id: p.producto_id || p.id,
            nombre: p.nombre || p.name,
            precio: Number(
              (p.precio || p.price || "0").toString().replace(/[^\d]/g, "")
            ),
            cantidad: Number(p.cantidad),
          })),
        }),
      });

      if (!resPedido.ok) throw new Error("Error al guardar el pedido");

      const dataPedido = await resPedido.json();
      console.log("Pedido creado:", dataPedido);

      // 4️⃣ Confirmación
      setCompraConfirmada(true);
      setMostrarModal(false);
      setMostrarFactura(true);
      setMostrarMensaje(true);

      localStorage.setItem("compraRealizada", "true");
      localStorage.removeItem("carrito");
      localStorage.removeItem("seleccionados");

      if (typeof limpiarCarrito === "function") limpiarCarrito();

      setTimeout(() => setMostrarMensaje(false), 5000);
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error 😭");
    }
  };

  return (
    <div className="factura-container">

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
            <h2 className="titulo">🖤Factura🖤</h2>
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
            {direccion && (
              <p>
                <strong>Dirección:</strong> {direccion}
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

      <button
        onClick={() => setMostrarModal(true)}
        className={`boton-comprar ${mostrarModal ? "sin-fondo" : ""}`}
      >
        Comprar
      </button>
      {mostrarMensaje && (
        <div className="mensaje-exito">¡Compra realizada con éxito!</div>
      )}

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
              onChange={(e) => {
                let valor = e.target.value;
                // ❌ Evitar espacio al inicio
                if (valor.startsWith(" ")) return;
                // ✔ Mantener solo letras y espacios válidos
                valor = valor.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
                setNombre(valor);
              }}
            />

            <label>Teléfono:</label>
            <input
              type="tel"
              placeholder="Tu teléfono"
              value={telefono}
              maxLength={10}
              onChange={(e) => setTelefono(e.target.value.replace(/\D/g, ""))}
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
              <option value="">Selecciona...</option>{" "}
              <option value="1">💜 Nequi</option>{" "}
              <option value="2">💳 Tarjeta</option>{" "}
              <option value="3">💵 Efectivo</option>
            </select>

            {metodoPago === "1" && (
              <div className="campo-con-ojito">
                <label>Número de Nequi:</label>
                <div className="input-wrapper">
                  <input
                    type={verNequi ? "text" : "password"}
                    placeholder="Ingresa tu número Nequi"
                    value={numeroNequi}
                    maxLength={10}
                    onChange={(e) =>
                      setNumeroNequi(e.target.value.replace(/\D/g, ""))
                    }
                  />

                  <button
                    type="button"
                    className="btn-ojito"
                    onClick={() => setVerNequi(!verNequi)}
                  >
                    {verNequi ? (
                      // OJO ABIERTO
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="none"
                        stroke="#440040"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    ) : (
                      // OJO CERRADO
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="none"
                        stroke="#440040"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.7 21.7 0 0 1 5.06-6.94M9.88 4.12A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.7 21.7 0 0 1-3.2 4.9" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            )}

            {metodoPago === "2" && (
              <>
                {/* Número de tarjeta */}
                <div className="campo-con-ojito">
                  <label>Número de tarjeta:</label>
                  <div className="input-wrapper">
                    <input
                      type={verTarjeta ? "text" : "password"}
                      placeholder="XXXX XXXX XXXX XXXX"
                      value={tarjeta.numero}
                      maxLength={19}
                      onChange={(e) =>
                        setTarjeta({
                          ...tarjeta,
                          numero: formatearTarjeta(e.target.value),
                        })
                      }
                    />

                    <button
                      type="button"
                      className="btn-ojito"
                      onClick={() => setVerTarjeta(!verTarjeta)}
                    >
                      {verTarjeta ? (
                        // OJO ABIERTO
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          fill="none"
                          stroke="#440040"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      ) : (
                        // OJO CERRADO
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          fill="none"
                          stroke="#440040"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.7 21.7 0 0 1 5.06-6.94M9.88 4.12A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.7 21.7 0 0 1-3.2 4.9" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <label>Fecha expiración:</label>
                <input
                  type="text"
                  placeholder="MM/AA"
                  value={tarjeta.expiracion}
                  maxLength={5}
                  onChange={(e) =>
                    setTarjeta({
                      ...tarjeta,
                      expiracion: formatearFecha(e.target.value),
                    })
                  }
                />

                {/* CVV */}
                <div className="campo-con-ojito">
                  <label>CVV:</label>
                  <div className="input-wrapper">
                    <input
                      type={verCVV ? "text" : "password"}
                      placeholder="CVV"
                      value={tarjeta.cvv}
                      maxLength={3}
                      onChange={(e) =>
                        setTarjeta({
                          ...tarjeta,
                          cvv: e.target.value.replace(/\D/g, ""),
                        })
                      }
                    />

                    <button
                      type="button"
                      className="btn-ojito"
                      onClick={() => setVerCVV(!verCVV)}
                    >
                      {verCVV ? (
                        // OJO ABIERTO
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          fill="none"
                          stroke="#440040"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      ) : (
                        // OJO CERRADO
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          fill="none"
                          stroke="#440040"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.7 21.7 0 0 1 5.06-6.94M9.88 4.12A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.7 21.7 0 0 1-3.2 4.9" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}

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
