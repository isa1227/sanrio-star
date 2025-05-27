import React from "react";
import "../styles/Personajes.css";

import backImg from "../assets/img/melo.png";
import peluche from "../assets/img/meloPELUCHE.jpeg";
import cuaderno from "../assets/img/meloCUADERNO.jpeg";
import bolso from "../assets/img/meloBOLSO.jpg";
import tenis from "../assets/img/meloZAPATOS.jpeg";
import termo from "../assets/img/melodyTERMO.jpg";
import cosmetiquera from "../assets/img/meloCOSMETIQUERA.jpg";
import organizador from "../assets/img/meloORGANIZADOR.jpg";
import peine from "../assets/img/meloPEINE.jpg";
import reloj from "../assets/img/meloRELOJ.jpg";
import audifonos from "../assets/img/audifonosmelody.jpg";
import caja from "../assets/img/cajamelody.jpg";
import cuaderno2 from "../assets/img/cuadernomelody.jpg";

const productos = [
  { img: peluche, title: "Muñeco My Melody", desc: "Un adorable muñeco de peluche de My Melody para tu colección.", price: "$40.000" },
  { img: cuaderno, title: "Cuaderno My Melody", desc: "Cuaderno de notas con un diseño exclusivo de My Melody, perfecto para tus apuntes.", price: "$15.000" },
  { img: bolso, title: "Bolso My Melody", desc: "Bolso de mano con el diseño de My Melody, ideal para salir con estilo.", price: "$34.000" },
  { img: tenis, title: "Tenis My Melody", desc: "Unos tenis de My Melody para que puedas lucir con estilo.", price: "$90.000" },
  { img: termo, title: "Termo My Melody", desc: "Un termo de My Melody para mantener tus bebidas calientes o frías.", price: "$22.000" },
  { img: cosmetiquera, title: "Cosmetiquera My Melody", desc: "Una hermosa cosmetiquera de My Melody para tus productos de belleza.", price: "$22.000" },
  { img: organizador, title: "Organizador My Melody", desc: "Un organizador de My Melody para mantener tus pertenencias en orden.", price: "$28.000" },
  { img: peine, title: "Peine My Melody", desc: "Un peine de My Melody para cuidar de tu cabello.", price: "$14.000" },
  { img: reloj, title: "Reloj My Melody", desc: "Un reloj de My Melody para que puedas estar a la hora.", price: "$30.000" },
  { img: audifonos, title: "Audífonos My Melody", desc: "Audífonos super cute.", price: "$50.000" },
  { img: caja, title: "Caja organizadora My Melody", desc: "Una caja super cómoda para organizar tus pertenencias.", price: "$35.000" },
  { img: cuaderno2, title: "Cuaderno My Melody", desc: "Lindo cuaderno para el colegio.", price: "$28.000" },
];

export default function MyMelody() {
  return (
    <div className="character-page mymelody-theme">
      <header>
        <a href="/" className="back-btn">
          <img src={backImg} alt="Volver al inicio" />
        </a>
      </header>

      <h1>🌺 My Melody 🌺</h1>
      <p className="tdescription-text">
        Una conejita dulce y amable que siempre usa una capucha rosa.
        Le encanta hornear y pasar tiempo con sus amigos, especialmente en el bosque de Mary Land. 🌺
      </p>

      <section className="product-section">
        <div className="product-grid">
          {productos.map((item, i) => (
            <div className="product-card" key={i}>
              <img src={item.img} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className="price">{item.price}</div>
              <button className="pretty-button">Agregar al carrito</button>
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
