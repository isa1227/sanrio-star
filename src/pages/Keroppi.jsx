import React from "react";
import "../styles/Keroppi.css";

import backImg from "../assets/img/ke.jpeg";
import peluches from "../assets/img/kePELUCHES.jpg";
import cosmetiquera from "../assets/img/keCOSMETIQUERA.jpg";
import bolso from "../assets/img/keBOLSO.jpg";
import sandalias from "../assets/img/keSANDALIAS.jpg";
import cuaderno from "../assets/img/keCUADERNO.jpg";
import funda from "../assets/img/keFUNDA.jpg";
import kit from "../assets/img/keKIT.jpg";
import organizador from "../assets/img/keORGANIZADOR.jpg";
import lonchera from "../assets/img/keLONCHERA.jpg";
import cepillo from "../assets/img/cepillokeropi.jpg";
import llavero from "../assets/img/llaverokeropi.jpg";

const productos = [
  { img: peluches, title: "Muñecos Keroppi", desc: "Tres adorables muñecos de peluche de Keroppi para tu colección.", price: "$78.000" },
  { img: cosmetiquera, title: "Cosmetiquera Keroppi", desc: "Cosmetiquera de Keroppi para llevar tus productos de belleza en cualquier lugar.", price: "$20.000" },
  { img: bolso, title: "Bolso Keroppi", desc: "Bolso de mano con el diseño de Keroppi, ideal para salir con estilo.", price: "$34.000" },
  { img: sandalias, title: "Sandalias Keroppi", desc: "Unas hermosas sandalias de Keroppi para disfrutar del verano.", price: "$18.000" },
  { img: cuaderno, title: "Cuaderno Keroppi", desc: "Un cuaderno de Keroppi para escribir tus pensamientos y recuerdos.", price: "$20.000" },
  { img: funda, title: "Funda para cama de Keroppi", desc: "Una funda para cama de Keroppi para dormir con tu personaje favorito.", price: "$46.000" },
  { img: kit, title: "Kit estudiantil de Keroppi", desc: "Un kit estudiantil de Keroppi para aprender a manejar su rana.", price: "$70.000" },
  { img: organizador, title: "Organizador de Keroppi", desc: "Un organizador de Keroppi para llevar tus cosas en orden.", price: "$25.000" },
  { img: lonchera, title: "Lonchera de Keroppi", desc: "Una lonchera de Keroppi para llevar tus alimentos en un lugar seguro.", price: "$45.000" },
  { img: cepillo, title: "Set para lavado dental Keroppi", desc: "Un necesario set para tus pequeños a la hora del cepillado.", price: "$30.000" },
  { img: llavero, title: "Llavero Keroppi", desc: "Un lindo llavero para tus bolsos o llaves.", price: "$15.000" },
];

export default function Keroppi() {
  return (
    <div className="keroppi-page">
      <header>
        <a href="/" className="back-btn circular-button">
          <img src={backImg} alt="Volver al inicio" />
        </a>
        <div className="wave-bottom"></div>
      </header>

      <h1>🐸 Keroppi 🐸</h1>
      <p className="tex">
        Una ranita alegre con grandes ojos. Vive en el estanque Donut con su familia. 
        Es aventurero y le encantan los retos y la diversión.🐸
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

      <footer className="foooter">
        <h3>Contacto</h3>
        <p>Email: contacto@sanriostar.com</p>
        <p>Teléfono: +123 456 789</p>
        <p>© 2024 Sanrio Star</p>
      </footer>
    </div>
  );
}
