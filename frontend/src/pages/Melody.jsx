import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Personajes.css";
import backImg from "../assets/img/melo.png";

export default function MyMelody() {
  const [productos, setProductos] = useState([]);
  const [mensajeVisible, setMensajeVisible] = useState(false);
  const [productoAgregado, setProductoAgregado] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Traer productos de la BD
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/productos/personaje/my%20melody"
        );
        setProductos(res.data);
      } catch (err) {
        console.error("Error al obtener productos:", err);
      }
    };
    fetchProductos();
  }, []);

  // Agregar al carrito
  const agregarAlCarrito = (producto) => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const existe = carrito.find(
      (item) => item.producto_id === producto.producto_id
    );

    if (existe) {
      carrito = carrito.map((item) =>
        item.producto_id === producto.producto_id
          ? { ...item, cantidad: item.cantidad + (producto.cantidad || 1) }
          : item
      );
    } else {
      const nuevoProducto = {
        producto_id: producto.producto_id,
        nombre: producto.nombre_producto,
        descripcion: producto.descripcion,
        precio: producto.precio,
        imagen: `src/assets/img/${producto.url_imagen}`, // ajusta según tu ruta
        cantidad: producto.cantidad || 1,
      };
      carrito.push(nuevoProducto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    setProductoAgregado(`${producto.nombre_producto} agregado al carrito 🛒`);
    setMensajeVisible(true);
    setTimeout(() => setMensajeVisible(false), 3000);
  };

  return (
    <div className="character-page mymelody-theme">
      <header>
        <a href="/" className="back-btn circular-button">
          <img src={backImg} alt="Volver al inicio" />
        </a>
        <a href="/carrito" className="floating-cart-btn">
          🛒 Carrito
        </a>
      </header>

      {mensajeVisible && <div className="mensaje-mymelody">{productoAgregado}</div>}

      <h1>🌺 My Melody 🌺</h1>
      <p className="description-text">
        Una conejita dulce y amable que siempre usa una capucha rosa. Le encanta
        hornear y pasar tiempo con sus amigos, especialmente en el bosque de
        Mary Land. 🌺
      </p>

      <section className="product-section">
        <div className="product-grid">
          {productos.length > 0 ? (
            productos.map((item) => (
              <div
                className="product-card"
                key={item.producto_id}
                onClick={() => setProductoSeleccionado(item)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={`src/assets/img/${item.url_imagen}`}
                  alt={item.nombre_producto}
                />
                <h3>{item.nombre_producto}</h3>
                <p>{item.descripcion}</p>
                <div className="price">${item.precio}</div>
                <button
                  className="pretty-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    agregarAlCarrito(item);
                  }}
                >
                  Agregar al carrito
                </button>
              </div>
            ))
          ) : (
            <p>Cargando productos</p>
          )}
        </div>
      </section>

      {/* Modal detallado */}
      {productoSeleccionado && (
        <div
          className="modal-overlay-mymelody"
          onClick={() => setProductoSeleccionado(null)}
        >
          <div
            className="modal-content-detailed-mymelody"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-mymelody"
              onClick={() => setProductoSeleccionado(null)}
            >
              ✖
            </button>

            <div className="modal-product-gallery-mymelody">
              <img
                src={`src/assets/img/${productoSeleccionado.url_imagen}`}
                alt={productoSeleccionado.nombre_producto}
              />
            </div>

            <div className="modal-product-info-mymelody">
              <h2>{productoSeleccionado.nombre_producto}</h2>
              <p className="modal-description-mymelody">{productoSeleccionado.descripcion}</p>
              <p className="modal-price-mymelody">Precio: ${productoSeleccionado.precio}</p>
              <p className="modal-stock-mymelody">
                Stock: {productoSeleccionado.stock || "Disponible"}
              </p>

              <div className="quantity-selector-mymelody">
                <label className="cantidad-modal">Cantidad:</label>
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  id="cantidadInput-mymelody"
                />
              </div>

              <button
                className="pretty-button-mymelody"
                onClick={() => {
                  const cantidad = parseInt(document.getElementById("cantidadInput-mymelody").value);
                  const productoConCantidad = { ...productoSeleccionado, cantidad };
                  agregarAlCarrito(productoConCantidad);
                  setProductoSeleccionado(null);
                }}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="footer mymelody-theme">
        <h3>Contacto</h3>
        <p>Email: contacto@sanriostar.com</p>
        <p>Teléfono: +123 456 789</p>
        <p>© 2024 Sanrio Star</p>

        <button
          className="scroll-top-btn-mymelody"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          🌸
        </button>
      </footer>
    </div>
  );
}
