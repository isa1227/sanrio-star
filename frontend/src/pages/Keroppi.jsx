import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Personajes.css";
import backImg from "../assets/img/ke.jpeg";

export default function Keroppi() {
  const [mensajeVisible, setMensajeVisible] = useState(false);
  const [productos, setProductos] = useState([]);
  const [productoAgregado, setProductoAgregado] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null); // estado para modal

  // Traer productos de la BD
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await axios.get(

          import.meta.env.VITE_API_URL + "/productos/personaje/keroppi"

          "http://localhost:8000/api/productos/personaje/keroppi"

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
        imagen: producto.url_imagen, // ✅ usar la URL de la BD
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
    <div className="character-page keroppi-theme">
      <header>
        <a href="/" className="back-btn circular-button">
          <img src={backImg} alt="Volver al inicio" />
        </a>
        <a href="/carrito" className="floating-cart-btn">
          🛒 Carrito
        </a>
      </header>

      {mensajeVisible && (
        <div className="mensaje-keroppi">{productoAgregado}</div>
      )}

      <h1>🐸 Keroppi 🐸</h1>
      <p className="description-text">
        Una ranita alegre con grandes ojos. Vive en el estanque Donut con su
        familia. Es aventurero y le encantan los retos y la diversión. 🐸
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
                {/* ✅ Mostrar imagen desde la BD */}
                <img
                  src={item.url_imagen}
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
            <p className="cargando">Cargando productos...</p>
          )}
        </div>
      </section>

      {/* Modal detallado */}
      {productoSeleccionado && (
        <div
          className="modal-overlay-keroppi"
          onClick={() => setProductoSeleccionado(null)}
        >
          <div
            className="modal-content-detailed-keroppi"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-keroppi"
              onClick={() => setProductoSeleccionado(null)}
            >
              ✖
            </button>

            <div className="modal-product-gallery-keroppi">
              {/* ✅ Imagen desde la BD */}
              <img
                src={productoSeleccionado.url_imagen}
                alt={productoSeleccionado.nombre_producto}
              />
            </div>

            <div className="modal-product-info-keroppi">
              <h2>{productoSeleccionado.nombre_producto}</h2>
              <p className="modal-description-keroppi">
                {productoSeleccionado.descripcion}
              </p>
              <p className="modal-price-keroppi">
                Precio: ${productoSeleccionado.precio}
              </p>
              <p className="modal-stock-keroppi">
                Stock: {productoSeleccionado.stock || "Disponible"}
              </p>

              <div className="quantity-selector-keroppi">
                <label className="cantidad-modal">Cantidad:</label>
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  id="cantidadInput-keroppi"
                />
              </div>

              <button
                className="pretty-button-keroppi"
                onClick={() => {
                  const cantidad = parseInt(
                    document.getElementById("cantidadInput-keroppi").value
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
        className="scroll-top-btn-keroppi"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        🐸
      </button>
    </div>
  );
}
