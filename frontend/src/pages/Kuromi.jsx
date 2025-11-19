import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Personajes.css";
import backImg from "../assets/img/ku.jpeg";

export default function Kuromi() {
  const [mensajeVisible, setMensajeVisible] = useState(false);
  const [productos, setProductos] = useState([]);
  const [productoAgregado, setProductoAgregado] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Traer productos desde la BD
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/productos/personaje/Kuromi")
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error al obtener productos:", err));
  }, []);

  // Agregar producto al carrito
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
        imagen: producto.url_imagen, // ✅ ahora usa la URL de la BD
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
    <div className="character-page kuromi-theme">
      <header>
        <a href="/" className="back-btn circular-button">
          <img src={backImg} alt="Volver al inicio" />
        </a>
        <a href="/carrito" className="floating-cart-btn">
          🛒 Carrito
        </a>
      </header>

      {mensajeVisible && (
        <div className="mensaje-kuromi">{productoAgregado}</div>
      )}

      <h1>💀 Kuromi 💀</h1>
      <p className="description-text">
        La rival traviesa de My Melody. Viste de negro con un gorro con una
        calavera rosa. Aunque parece ruda, también tiene un lado femenino y
        divertido. 💀
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
                {/* ✅ Imagen desde la BD */}
                <img src={item.url_imagen} alt={item.nombre_producto} />
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
            <p>Cargando productos...</p>
          )}
        </div>
      </section>

      {/* Modal detallado */}
      {productoSeleccionado && (
        <div
          className="modal-overlay-kuromi"
          onClick={() => setProductoSeleccionado(null)}
        >
          <div
            className="modal-content-detailed-kuromi"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-kuromi"
              onClick={() => setProductoSeleccionado(null)}
            >
              ✖
            </button>

            <div className="modal-product-gallery-kuromi">
              {/* ✅ Imagen desde la BD */}
              <img
                src={productoSeleccionado.url_imagen}
                alt={productoSeleccionado.nombre_producto}
              />
            </div>

            <div className="modal-product-info-kuromi">
              <h2>{productoSeleccionado.nombre_producto}</h2>
              <p className="modal-description-kuromi">
                {productoSeleccionado.descripcion}
              </p>
              <p className="modal-price-kuromi">
                Precio: ${productoSeleccionado.precio}
              </p>
              <p className="modal-stock-kuromi">
                Stock: {productoSeleccionado.stock || "Disponible"}
              </p>

              <div className="quantity-selector-kuromi">
                <label className="cantidad-modal">Cantidad:</label>
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  id="cantidadInput-kuromi"
                />
              </div>

              <button
                className="pretty-button-kuromi"
                onClick={() => {
                  const cantidad = parseInt(
                    document.getElementById("cantidadInput-kuromi").value
                  );
                  const productoConCantidad = {
                    ...productoSeleccionado,
                    cantidad,
                  };
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

      <footer className="footer">
        <h3>Contacto</h3>
        <p>Email: contacto@sanriostar.com</p>
        <p>Teléfono: +123 456 789</p>
        <p>© 2024 Sanrio Star</p>
      </footer>

      <button
        className="scroll-top-btn-kuromi"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        💀
      </button>
    </div>
  );
}
