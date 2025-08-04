import React, { useState } from "react";
import "../styles/Personajes.css";

import backImg from "../assets/img/iconchococat.jpg";
import bolso from "../assets/img/bolsocat.jpg";
import billetera from "../assets/img/billeteracat.jpg";
import cosmetiquera from "../assets/img/cosmetiqueracat.jpg";
import crema from "../assets/img/cremacat.jpg";
import llavero from "../assets/img/llaverocat.jpg";
import libreta from "../assets/img/libretacat.jpg";
import funda from "../assets/img/fundacat.jpg";
import taza from "../assets/img/tazacat.jpg";
import kit from "../assets/img/kitcat.jpg";
import peluche from "../assets/img/peluchecat.jpg";
import armario from "../assets/img/armariocat.jpg";
import lapicero from "../assets/img/lapicerocat.jpg";

const productos = [
  {
    img: bolso,
    title: "Bolso de Chococat",
    desc: "Un bonito bolso pequeño de Chococat",
    price: "$48.000",
  },
  {
    img: billetera,
    title: "Billetera Chococat",
    desc: "Una billetera adorable para llevar tu dinero",
    price: "$15.000",
  },
  {
    img: cosmetiquera,
    title: "Cosmetiquera Chococat",
    desc: "Amplia y cómoda cosmetiquera para tu maquillaje",
    price: "$44.000",
  },
  {
    img: crema,
    title: "Crema corporal Chococat",
    desc: "Crema humectante y suave con olor a chocolate",
    price: "$28.000",
  },
  {
    img: llavero,
    title: "Llavero Chococat",
    desc: "Un bonito y pequeño llavero",
    price: "$12.000",
  },
  {
    img: libreta,
    title: "Libreta Chococat",
    desc: "Una pequeña pero bonita libreta para tus apuntes",
    price: "$29.000",
  },
  {
    img: funda,
    title: "Funda Chococat",
    desc: "Una preciosa funda para tu teléfono",
    price: "$38.000",
  },
  {
    img: taza,
    title: "Taza Chococat",
    desc: "Una bonita taza para tu café en las mañanas",
    price: "$69.000",
  },
  {
    img: kit,
    title: "Kit Chococat",
    desc: "Pequeño kit para el colegio",
    price: "$60.000",
  },
  {
    img: peluche,
    title: "Peluche Chococat",
    desc: "Tierno peluche de Chococat con camarita",
    price: "$56.000",
  },
  {
    img: armario,
    title: "Armario Chococat",
    desc: "Un armario para organizar tus cositas",
    price: "$100.000",
  },
  {
    img: lapicero,
    title: "Lapicero Chococat",
    desc: "Lapicero color negro",
    price: "$9.000",
  },
];

export default function Chococat() {
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
  className="scroll-top-btn-chococat"
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
>
  🐱
</button>



    </div>
  );
}
