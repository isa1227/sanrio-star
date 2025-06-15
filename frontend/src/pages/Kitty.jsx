import React, { useState } from "react";
import "../styles/Personajes.css";

import backImg from "../assets/img/j.webp";
import kittyLLAVERO from "../assets/img/kittyLLAVERO.jpg";
import tostadora from "../assets/img/tostadora.jpg";
import funkokitty from "../assets/img/funkokitty.jfif";
import cubiertos from "../assets/img/cubiertos.jpg";
import kittyLOCION from "../assets/img/kittyLOCION.jpg";
import kittyPELUCHE from "../assets/img/kittyPELUCHE.jpg";
import kittyLAMPARA from "../assets/img/kittyLAMPARA.jpeg";
import kittyMOUSE from "../assets/img/kittyMOUSE.jpeg";
import kittyTOALLASHUMEDAS from "../assets/img/kittyTOALLASHUMEDAS.jpeg";
import canecakitty from "../assets/img/canecakitty.jpg";
import organizadorkitty from "../assets/img/organizadorkitty.jpg";

const productos = [
  {
    img: kittyLLAVERO,
    title: "Llavero Hello Kitty",
    desc: "Un llavero de Hello Kitty para llevar en tu bolsito.",
    price: "$14.000",
  },
  {
    img: tostadora,
    title: "Tostadora Hello Kitty",
    desc: "Pequeña tostadora con forma de Hello Kitty para tostar panes y tostadas.",
    price: "$60.000",
  },
  {
    img: funkokitty,
    title: "Funko pop de Hello Kitty",
    desc: "Un Funko pop de Hello Kitty para decorar tu espacio.",
    price: "$35.000",
  },
  {
    img: cubiertos,
    title: "Cubiertos Hello Kitty",
    desc: "Unos cubiertos de Hello Kitty para comer con estilo.",
    price: "$20.000",
  },
  {
    img: kittyLOCION,
    title: "Loción Hello Kitty",
    desc: "Una pequeña loción de Hello Kitty para oler delicioso.",
    price: "$20.500",
  },
  {
    img: kittyPELUCHE,
    title: "Peluche Hello Kitty",
    desc: "Un peluche de Hello Kitty para decorar tu habitación.",
    price: "$50.000",
  },
  {
    img: kittyLAMPARA,
    title: "Lámpara Hello Kitty",
    desc: "Una pequeña lámpara de Hello Kitty para iluminar tu espacio.",
    price: "$42.000",
  },
  {
    img: kittyMOUSE,
    title: "Mouse Hello Kitty",
    desc: "Un mouse de Hello Kitty para jugar y divertirte.",
    price: "$38.000",
  },
  {
    img: kittyTOALLASHUMEDAS,
    title: "Toallas húmedas Hello Kitty",
    desc: "Unas toallas húmedas de Hello Kitty para limpiar y tener a mano.",
    price: "$10.000",
  },
  {
    img: canecakitty,
    title: "Papelera Hello Kitty",
    desc: "Una linda papelera de Hello Kitty.",
    price: "$18.000",
  },
  {
    img: organizadorkitty,
    title: "Organizador Hello Kitty",
    desc: "Un lindo organizador para tu escritorio.",
    price: "$38.000",
  },
];

export default function HelloKitty() {
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
    <div className="character-page hellokitty-theme">
      <header>
        <a href="/" className="back-btn circular-button">
          <img src={backImg} alt="Volver al inicio" />
        </a>
        <a href="/carrito" className="floating-cart-btn">
          🛒 Carrito
        </a>
      </header>

      {mensajeVisible && (
        <div className="mensaje-hellokitty">{productoAgregado}</div>
      )}

      <h1>🎀 Hello Kitty 🎀</h1>
      <p className="description-text">
        Una gatita blanca con un lazo rojo en la oreja izquierda. Es amable,
        cariñosa y le encanta hornear pasteles. Vive en Londres con su familia.
        🎀
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
