import React, { useEffect, useState } from "react";
import axios from "axios"; 
import "../styles/Personajes.css";
import backImg from "../assets/img/iconchococat.jpg";

export default function Chococat() {
  const [productos, setProductos] = useState([]);
  const [mensajeVisible, setMensajeVisible] = useState(false);
  const [productoAgregado, setProductoAgregado] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null); // estado para modal

  // Traer productos desde la BD
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/productos/personaje/chococat")
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  // Agregar al carrito
  const agregarAlCarrito = (producto) => {
    const carritoExistente = JSON.parse(localStorage.getItem("carrito")) || [];

    const existe = carritoExistente.find(
      (item) => item.producto_id === producto.producto_id
    );

    let nuevoCarrito;
    if (existe) {
      nuevoCarrito = carritoExistente.map((item) =>
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
      nuevoCarrito = [...carritoExistente, nuevoProducto];
    }

    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));

    setProductoAgregado(`${producto.nombre_producto} agregado al carrito 🛒`);
    setMensajeVisible(true);
    setTimeout(() => setMensajeVisible(false), 3000);
  };

  return (
    <div className="character-page chococat-theme">
      <header>
        <a href="/" className="back-btn circular-button">
          <img src={backImg} alt="Volver al inicio" />
        </a>
        <a href="/carrito" className="floating-cart-btn">
          🛒 Carrito
        </a>
      </header>

      {mensajeVisible && (
        <div className="mensaje-chococat">{productoAgregado}</div>
      )}

      <h1>🐱‍👤 Chococat 🐱‍👤</h1>
      <p className="description-text">
        Su nombre viene de su nariz color chocolate. Es muy inteligente, curioso
        y siempre está al tanto de las últimas noticias gracias a sus bigotes
        "antena". 🐱‍👤
      </p>

      <section className="product-section">
        <div className="product-grid">
          {productos.length > 0 ? (
            productos.map((item) => (
              <div
                className="product-card"
                key={item.producto_id}
                onClick={() => setProductoSeleccionado(item)} // abrir modal al click
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
                    e.stopPropagation(); // evitar que abra modal al agregar
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
          className="modal-overlay-chococat"
          onClick={() => setProductoSeleccionado(null)}
        >
          <div
            className="modal-content-detailed-chococat"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-chococat"
              onClick={() => setProductoSeleccionado(null)}
            >
              ✖
            </button>

            <div className="modal-product-gallery-chococat">
              {/* ✅ Imagen desde la BD */}
              <img
                src={productoSeleccionado.url_imagen}
                alt={productoSeleccionado.nombre_producto}
              />
            </div>

            <div className="modal-product-info-chococat">
              <h2>{productoSeleccionado.nombre_producto}</h2>
              <p className="modal-description-chococat">
                {productoSeleccionado.descripcion}
              </p>
              <p className="modal-price-chococat">
                Precio: ${productoSeleccionado.precio}
              </p>
              <p className="modal-stock-chococat">
                Stock: {productoSeleccionado.stock || "Disponible"}
              </p>

              <div className="quantity-selector-chococat">
                <label className="cantidad-modal">Cantidad:</label>
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  id="cantidadInput-chococat"
                />
              </div>

              <button
                className="pretty-button-chococat"
                onClick={() => {
                  const cantidad = parseInt(
                    document.getElementById("cantidadInput-chococat").value
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
        className="scroll-top-btn-chococat"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        🐱
      </button>
    </div>
  );
}
