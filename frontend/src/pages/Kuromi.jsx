import React from "react";
import "../styles/Personajes.css";

import backImg from "../assets/img/ku.jpeg";
import jabonera from "../assets/img/JABONERAkuromi.jpg";
import peluche from "../assets/img/peluchekurumi.jpg";
import bolso from "../assets/img/kuBOLSO.jpg";
import abanico from "../assets/img/kuABANICO.jpg";
import calculadora from "../assets/img/kuCALCULADORA.jpg";
import manilla from "../assets/img/kuMANILLA.jpg";
import peine from "../assets/img/kuPEINE.jpg";
import cartera from "../assets/img/kuCARTERA.jpg";
import papelera from "../assets/img/kuPAPELERA.jpg";
import balsamo from "../assets/img/balsamokuromi.jpg";
import bolsa from "../assets/img/bolsakuromi.jpg";
import lapicero from "../assets/img/lapizerokuromi.jpg";



const productos = [
  { img: jabonera, title: "Jabonera Kuromi", desc: "Una jabonera con la imagen de Kuromi", price: "$12.000" },
  { img: peluche, title: "Peluche Kuromi", desc: "Un hermoso y adorable peluche de Kuromi", price: "$30.000" },
  { img: bolso, title: "Bolso Kuromi", desc: "Bolso de Kuromi, ideal para salir con estilo.", price: "$69.000" },
  { img: abanico, title: "Abanico Kuromi", desc: "Un hermoso abanico con la imagen de Kuromi", price: "$11.000" },
  { img: calculadora, title: "Calculadora Kuromi", desc: "Una calculadora con estilo", price: "$27.000" },
  { img: manilla, title: "Manilla de Kuromi", desc: "Una preciosa manilla de Kuromi", price: "$10.000" },
  { img: peine, title: "Peine de Kuromi", desc: "Un peine para que puedas peinar tu cabello.", price: "$17.000" },
  { img: cartera, title: "Cartera Kuromi", desc: "Una cartera adorable para llevar tus cosas", price: "$23.000" },
  { img: papelera, title: "Papelera Kuromi", desc: "Una linda papelera de Kuromi", price: "$18.000" },
  { img: balsamo, title: "Balsamo de Kuromi", desc: "Un suave y bonito balsamo con estuche de kuromi", price: "$9.000" },
  { img: bolsa, title: "Bolsa pequeña de Kuromi", desc: "Bolsa pequeña de kuromi", price: "$23.000" },
  { img: lapicero, title: "Lapicero de Kuromi", desc: "Lapicero color negro de kuromi", price: "$9.550" },
];

export default function Kuromi() {
  return (
    <div className="character-page kuromi-theme">
      <header>
        <a href="/" className="back-btn">
          <img src={backImg} alt="Volver al inicio" />
        </a>
      </header>

      <h1>💀 Kuromi 💀</h1>
      <p className="description-text">
        La rival traviesa de My Melody. Viste de negro con un gorro con una calavera rosa.
        Aunque parece ruda, también tiene un lado femenino y divertido.💀
      </p>

      <section className="product-section">
        <div className="product-grid">
          {productos.map((item, i) => (
            <div className="product-card" key={i}>
              <img src={item.img} alt={item.title} />
              <h3>{item.title}</h3>
             
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
