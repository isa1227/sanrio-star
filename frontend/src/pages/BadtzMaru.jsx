import React, { useState } from "react";
import "../styles/Personajes.css";

import backImg from "../assets/img/pax.jpeg";
import peluche from "../assets/img/paxPELUCHE.jpeg";
import cuaderno from "../assets/img/paxCUADERNO.jpeg";
import carrito from "../assets/img/paxCARRITO.jpg";
import funko from "../assets/img/paxFUNKO.jpg";
import kit from "../assets/img/paxKIT.jpg";
import medias from "../assets/img/paxMEDIAS.jpg";
import llavero from "../assets/img/paxLLAVERO.jpeg";
import taza from "../assets/img/paxTAZA.jpg";
import cosmetiquera from "../assets/img/cosmetiqueramaru.jpg";
import camisa from "../assets/img/paxCAMISA.jpg";
import monedero from "../assets/img/monederomaru.jpg";
import pantuflas from "../assets/img/pantuflasmaru.jpg";

const productos = [
  {
    img: peluche,
    title: "Muñeco Badtz-Maru",
    desc: "Un adorable muñeco de peluche de Badtz-Maru para tu colección.",
    price: "$60.000",
  },
  {
    img: cuaderno,
    title: "Cuaderno Badtz-Maru",
    desc: "Cuaderno de notas con un diseño exclusivo de Badtz-Maru, ideal para tus apuntes.",
    price: "$22.000",
  },
  {
    img: carrito,
    title: "Carro Badtz-Maru",
    desc: "Un divertido carro con un diseño de Badtz-Maru, perfecto para jugar.",
    price: "$34.000",
  },
  {
    img: funko,
    title: "Funko Pop Badtz-Maru",
    desc: "Un Funko Pop de Badtz-Maru para decorar tu espacio.",
    price: "$18.000",
  },
  {
    img: kit,
    title: "Kit Badtz-Maru",
    desc: "Un kit de colegio con un diseño de Badtz-Maru, ideal para niños.",
    price: "$42.000",
  },
  {
    img: medias,
    title: "Medias Badtz-Maru",
    desc: "Un par de medias con un diseño de Badtz-Maru para calentar tus pies.",
    price: "$12.000",
  },
  {
    img: llavero,
    title: "Llavero Badtz-Maru",
    desc: "Un llavero de Badtz-Maru para tu colección.",
    price: "$8.000",
  },
  {
    img: taza,
    title: "Taza Badtz-Maru",
    desc: "Una taza de café con un diseño de Badtz-Maru para disfrutar de tu café.",
    price: "$30.000",
  },
  {
    img: cosmetiquera,
    title: "Cosmetiquera Badtz-Maru",
    desc: "Amplia cosmetiquera para tu maquillaje.",
    price: "$39.000",
  },
  {
    img: camisa,
    title: "Camisa Badtz-Maru",
    desc: "Una camisa con un diseño de Badtz-Maru para lucir en cualquier ocasión.",
    price: "$28.000",
  },
  {
    img: monedero,
    title: "Monedero Badtz-Maru",
    desc: "Un pequeño pero necesario monedero.",
    price: "$18.000",
  },
  {
    img: pantuflas,
    title: "Pantuflas Badtz-Maru",
    desc: "Unas calientitas pantuflas para las frías mañanas.",
    price: "$57.000",
  },
];

export default function BadtzMaru() {
  const [mensajeVisible, setMensajeVisible] = useState(false);
  const [productoAgregado, setProductoAgregado] = useState("");
  const agregarAlCarrito = (producto) => {
    const carritoExistente = JSON.parse(localStorage.getItem("carrito")) || [];

    // Adaptar las propiedades
    const nuevoProducto = {
      imagen: producto.img,
      nombre: producto.title,
      descripcion: producto.desc,
      precio: producto.price,
      cantidad: 1,
    };

    const nuevoCarrito = [...carritoExistente, nuevoProducto];
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    setProductoAgregado(`${producto.title} agregado al carrito 🛒`);
    setMensajeVisible(true);
    setTimeout(() => setMensajeVisible(false), 3000);
  };

  return (
    <div className="character-page baxmaru-theme">
      <header>
        <a href="/" className="back-btn">
          <img src={backImg} alt="Volver al inicio" />
        </a>
        <a href="/carrito" className="floating-cart-btn">
          🛒 Carrito
        </a>
      </header>

      {mensajeVisible && (
        <div className="mensaje-badtzmaru">{productoAgregado}</div>
      )}

      <h1>🐧 Badtz-Maru 🐧</h1>
      <p className="description-text">
        Un pingüino negro con actitud rebelde y un poco sarcástico. Sueña con
        ser rico y famoso algún día.🐧
      </p>

      <section className="product-section">
        <div className="product-grid">
          {productos.map((item, i) => (
            <div className="product-card" key={i}>
              <img src={item.img} alt={item.title} />
              <h3>{item.title}</h3>

              <div className="price">{item.price}</div>
              <button
                className="pretty-button"
                onClick={() => agregarAlCarrito(item)}
              >
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <h3>Contacto</h3>
        <p>Email: contacto@sanriostar.com</p>
        <p>Teléfono: +123 456 789</p>
        <p>© 2024 Sanrio Star</p>
      </footer>
    </div>
  );
}
