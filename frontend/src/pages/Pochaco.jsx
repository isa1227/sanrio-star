import React, { useState } from "react";
import "../styles/Personajes.css";

import backImg from "../assets/img/po.png";
import peluche from "../assets/img/poPELUCHE.jpg";
import cubiertos from "../assets/img/poCUBIERTOS.jpg";
import peine from "../assets/img/poPEINE.jpg";
import sandalias from "../assets/img/poSANDALIAS.jpg";
import estucheCamara from "../assets/img/poESTUCHECAMARA.jpg";
import termo from "../assets/img/poTERMO.jpg";
import funko from "../assets/img/poFUNKO.jpeg";
import carnet from "../assets/img/pochaco.jfif";
import setEscritorio from "../assets/img/poSETESCRITORIO.jpeg";
import cosmetiquera from "../assets/img/cosmetiquerapochaco.jpg";
import pantuflas from "../assets/img/pantuflaspochaco.jpg";
import monedero from "../assets/img/monederopochaco.jpg";

const productos = [
  {
    img: peluche,
    title: "Muñeco Pochaco",
    desc: "Un adorable muñeco de peluche de Pochaco para tu colección.",
    price: "$25.000",
  },
  {
    img: cubiertos,
    title: "Cubiertos de Pochaco",
    desc: "Cubiertos de Pochaco para comer con estilo.",
    price: "$23.000",
  },
  {
    img: peine,
    title: "Peine Pochaco",
    desc: "Peine de Pochaco para cuidar tu peluca.",
    price: "$17.000",
  },
  {
    img: sandalias,
    title: "Sandalias Pochaco",
    desc: "Sandalias de Pochaco para el verano.",
    price: "$18.000",
  },
  {
    img: estucheCamara,
    title: "Estuche de cámara de Pochaco",
    desc: "Un estuche de cámara de Pochaco para proteger tu equipo.",
    price: "$30.000",
  },
  {
    img: termo,
    title: "Termo de Pochaco",
    desc: "Termo Pochaco para llevar tu bebida.",
    price: "$25.000",
  },
  {
    img: funko,
    title: "Funko Pop de Pochaco",
    desc: "Un adorable Funko Pop de Pochaco para tu colección.",
    price: "$55.000",
  },
  {
    img: carnet,
    title: "Carnet de Pochaco",
    desc: "Carnet de Pochaco para identificarte.",
    price: "$18.000",
  },
  {
    img: setEscritorio,
    title: "Set de escritorio",
    desc: "Un set de escritorio de Pochaco para trabajar en comodidad.",
    price: "$34.000",
  },
  {
    img: cosmetiquera,
    title: "Cosmetiquera Pochaco",
    desc: "Linda cosmetiquera para tu maquillaje.",
    price: "$49.000",
  },
  {
    img: pantuflas,
    title: "Pantuflas Pochaco",
    desc: "Unas calientitas pantuflas para las frías mañanas.",
    price: "$57.000",
  },
  {
    img: monedero,
    title: "Monedero Pochaco",
    desc: "Un pequeño pero necesario monedero.",
    price: "$18.000",
  },
];

export default function Pochaco() {
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
    <div className="character-page pochaco-theme">
      <header>
        <a href="/" className="back-btn">
          <img src={backImg} alt="Volver al inicio" />
        </a>
        <a href="/carrito" className="floating-cart-btn">
          🛒 Carrito
        </a>
      </header>

      {mensajeVisible && (
        <div className="mensaje-pochacco">{productoAgregado}</div>
      )}

      <h1>🐶 Pochaco 🐶</h1>
      <p className="description-text">
        Un perrito blanco con orejas negras, muy curioso y deportivo. Le encanta
        jugar al fútbol y andar en patineta.🐶
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
