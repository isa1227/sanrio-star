import React, { useState } from "react";
import "../styles/Personajes.css";

import backImg from "../assets/img/c.webp";
import peluche from "../assets/img/cinaPELUCHE.jpg";
import cuaderno from "../assets/img/cinaCUADERNO.jpg";
import kit from "../assets/img/cina.jfif";
import camisa from "../assets/img/camisaCINNA.jpg";
import chanclas from "../assets/img/cinaCHANCLAS.jpg";
import cosmetiquera from "../assets/img/cinaCOSMETIQUERA.jpg";
import taza from "../assets/img/cinaTAZA.jpg";
import balsamo from "../assets/img/balsamocina.jpg";
import libreta from "../assets/img/libretacina.jpg";
import morral from "../assets/img/bolosocinna.jpg";
import termo from "../assets/img/termocina.jpg";
import gorra from "../assets/img/gorracina.jpg";

const productos = [
  {
    img: peluche,
    title: "Muñeco Cinnamoroll",
    desc: "Un adorable muñeco de peluche de Cinnamoroll para tu colección.",
    price: "$38.000",
  },
  {
    img: cuaderno,
    title: "Cuaderno Cinnamoroll",
    desc: "Cuaderno de notas con un diseño exclusivo de Cinnamoroll, ideal para tus apuntes.",
    price: "$20.000",
  },
  {
    img: kit,
    title: "Kit Cinnamoroll",
    desc: "Kit completo de bolsos perfecto para estudiantes",
    price: "$120.000",
  },
  {
    img: camisa,
    title: "Camiseta Cinnamoroll",
    desc: "Una camiseta con estampado de Cinnamoroll, cómoda y moderna.",
    price: "$28.000",
  },
  {
    img: chanclas,
    title: "Chanclas Cinnamoroll",
    desc: "Unas hermosas chanclas con estampado de Cinnamoroll, cómodas y modernas.",
    price: "$18.000",
  },
  {
    img: cosmetiquera,
    title: "Cosmetiquera Cinnamoroll",
    desc: "Una cosmetiquera de Cinnamoroll, ideal para llevar tus productos de belleza.",
    price: "$20.000",
  },
  {
    img: taza,
    title: "Taza Cinnamoroll",
    desc: "Una taza perfecta para tu café.",
    price: "$23.000",
  },
  {
    img: balsamo,
    title: "Bálsamo labial Cinnamoroll",
    desc: "Un bálsamo para tus labios.",
    price: "$5.000",
  },
  {
    img: libreta,
    title: "Libreta Cinnamoroll",
    desc: "Una pequeña pero bonita libreta para tus apuntes.",
    price: "$29.000",
  },
  {
    img: morral,
    title: "Morral Cinnamoroll",
    desc: "Un hermoso morral perfecto para llevar tus cositas.",
    price: "$58.000",
  },
  {
    img: termo,
    title: "Termo Cinnamoroll",
    desc: "Un bonito bolso termo para estar hidratado.",
    price: "$40.000",
  },
  {
    img: gorra,
    title: "Gorra Cinnamoroll",
    desc: "Una gorra para los calores.",
    price: "$20.000",
  },
];

export default function Cinnamoroll() {
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
    <div className="character-page cinnamoroll-theme">
      <header>
        <a href="/" className="back-btn circular-button">
          <img src={backImg} alt="Volver al inicio" />
        </a>
        <a href="/carrito" className="floating-cart-btn">
          🛒 Carrito
        </a>
      </header>

      {mensajeVisible && (
        <div className="mensaje-cinnamoroll">{productoAgregado}</div>
      )}

      <h1>☁️ Cinnamoroll ☁️</h1>
      <p className="description-text">
        Un perrito blanco con orejas largas que le permiten volar. Tiene una
        cola rizada como un rollito de canela. Es muy tierno y tímido.☁️
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

  <button
    className="scroll-top-btn-cinnamoroll"
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  >
    ☁️
  </button>

    </div>
  );
}
