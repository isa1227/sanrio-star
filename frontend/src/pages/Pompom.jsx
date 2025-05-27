import React from "react";
import "../styles/Personajes.css";

import backImg from "../assets/img/pom.png";
import peluche from "../assets/img/pomPELUCHE.jpg";
import monedero from "../assets/img/pomMONEDERO.jpg";
import bolso from "../assets/img/pomBOLSO.jpg";
import pinzas from "../assets/img/pomPINZAS.jpg";
import squishy from "../assets/img/pomSQUISHY.jpg";
import taza from "../assets/img/pomTAZA.jpg";
import cortaUnas from "../assets/img/pomCORTAUÑAS.jpg";
import termo from "../assets/img/pomTERMO.jpg";
import organizador from "../assets/img/pomORGANIZADOR.jpeg";
import funda from "../assets/img/fundapompom.jpg";
import medias from "../assets/img/mediaspompom.jpg";
import morral from "../assets/img/morralpompom.jpg";

const productos = [
  { img: peluche, title: "Muñeco Pompompurin", desc: "Un adorable muñeco de peluche de Pompompurin para tu colección.", price: "$37.000" },
  { img: monedero, title: "Monedero de Pompompurin", desc: "Monedero de Pompompurin para guardar tus pequeños tesoros.", price: "$12.000" },
  { img: bolso, title: "Bolso Pompompurin", desc: "Bolso de Pompompurin, ideal para salir con estilo.", price: "$45.000" },
  { img: pinzas, title: "Pinzas Pompompurin", desc: "Unas lindas pinzas para el cabello de Pompompurin.", price: "$12.000" },
  { img: squishy, title: "Squishy Pompompurin", desc: "Un bonito squishy de Pompompurin para manejar tu estrés o ansiedad.", price: "$15.000" },
  { img: taza, title: "Taza Pompompurin", desc: "Una taza de Pompompurin para disfrutar de tu café o té.", price: "$28.000" },
  { img: cortaUnas, title: "Corta uñas Pompompurin", desc: "Unas corta uñas de Pompompurin para cuidar tus uñas.", price: "$10.000" },
  { img: termo, title: "Termo Pompompurin", desc: "Un lindo termo para llevar a la escuela o al trabajo.", price: "$12.000" },
  { img: organizador, title: "Organizador Pompompurin", desc: "Un bonito organizador para tu escritorio o mesa de trabajo.", price: "$23.000" },
  { img: funda, title: "Funda de Pompompurin", desc: "Funda de Pompompurin para tu celular.", price: "$38.000" },
  { img: medias, title: "Medias de Pompompurin", desc: "Set de 3 pares de medias para el diario.", price: "$15.000" },
  { img: morral, title: "Morral Pompompurin", desc: "Un grande y espacioso morral para el colegio.", price: "$90.000" },
];

export default function Pompom() {
  return (
    <div className="character-page pompom-theme">
      <header>
        <a href="/" className="back-btn">
          <img src={backImg} alt="Volver al inicio" />
        </a>
      </header>

      <h1>🍮 Pompompurin 🍮</h1>
      <p className="description-text">
        Un perrito Golden Retriever de color crema con una boina marrón. Le encanta dormir, 
        comer pudín y pasar tiempo con sus amigos.🍮
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
