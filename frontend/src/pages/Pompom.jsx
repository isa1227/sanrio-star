import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Personajes.css";
import backImg from "../assets/img/pom.png";

export default function Pompom() {
  const [productos, setProductos] = useState([]);
  const [mensajeVisible, setMensajeVisible] = useState(false);
  const [productoAgregado, setProductoAgregado] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Traer productos desde la BD
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/productos/personaje/Pompompurin")
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error al cargar productos:", err));
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
    <div className="character-page pompom-theme">
      <header>
        <a href="/" className="back-btn">
          <img src={backImg} alt="Volver al inicio" />
        </a>
        <a href="/carrito" className="floating-cart-btn">
          🛒 Carrito
        </a>
      </header>

      {mensajeVisible && (
        <div className="mensaje-pompompurin">{productoAgregado}</div>
      )}

      <h1>🍮 Pompompurin 🍮</h1>
      <p className="description-text">
        Un perrito Golden Retriever de color crema con una boina marrón. Le
        encanta dormir, comer pudín y pasar tiempo con sus amigos. 🍮
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
            <p className="cargando">Cargando productos...</p>
          )}
        </div>
      </section>

      {/* Modal detallado */}
      {productoSeleccionado && (
        <div
          className="modal-overlay-pompom"
          onClick={() => setProductoSeleccionado(null)}
        >
          <div
            className="modal-content-detailed-pompom"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-pompom"
              onClick={() => setProductoSeleccionado(null)}
            >
              ✖
            </button>

            <div className="modal-product-gallery-pompom">
              {/* ✅ Imagen desde la BD */}
              <img
                src={productoSeleccionado.url_imagen}
                alt={productoSeleccionado.nombre_producto}
              />
            </div>

            <div className="modal-product-info-pompom">
              <h2>{productoSeleccionado.nombre_producto}</h2>
              <p className="modal-description-pompom">
                {productoSeleccionado.descripcion}
              </p>
              <p className="modal-price-pompom">
                Precio: ${productoSeleccionado.precio}
              </p>
              <p className="modal-stock-pompom">
                Stock: {productoSeleccionado.stock || "Disponible"}
              </p>

              <div className="quantity-selector-pompom">
                <label className="cantidad-modal">Cantidad:</label>
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  id="cantidadInput-pompom"
                />
              </div>

              <button
                className="pretty-button-pompom"
                onClick={() => {
                  const cantidad = parseInt(
                    document.getElementById("cantidadInput-pompom").value
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

      <footer className="pompom-theme footer">
        <h3>Contacto</h3>
        <p>Email: contacto@sanriostar.com</p>
        <p>Teléfono: +123 456 789</p>
        <p>© 2024 Sanrio Star</p>

        <button
          className="scroll-top-btn-pompom"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          🍮
        </button>
      </footer>
    </div>
  );
}
