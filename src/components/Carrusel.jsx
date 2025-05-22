// src/components/Carrusel.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Carrusel.css";

const personajes = [
  { nombre: "Hellokitty", img: "iconHello.jfif" },
  { nombre: "cinna", img: "iconCina.jfif" },
  { nombre: "kuromi", img: "iconK.jfif" },
  { nombre: "Mymelody", img: "iconMeldy.jfif" },
  { nombre: "paxmaru", img: "paxmaru.jpg" },
  { nombre: "pochaco", img: "iconPochaco.jfif" },
  { nombre: "pompom", img: "iconPompom.jfif" },
  { nombre: "keroppi", img: "iconKeroppi.jfif" },
  { nombre: "chococat", img: "iconcat.jpg" },
];

const Carrusel = () => {
  return (
    <div className="carrusel">
      <div className="contenedor">
        {[...personajes, ...personajes].map((p, index) => (
          <div className="item" key={index}>
            <Link to={`/${p.nombre}.html`} className="circular-button">
              <img src={`/img/${p.img}`} alt={`Imagen de ${p.nombre}`} />
            </Link>
          </div>
        ))}
      </div>
      <div className="contenedor">
        {[...personajes, ...personajes].map((p, index) => (
          <div className="item" key={`second-${index}`}>
            <Link to={`/${p.nombre}.html`} className="circular-button">
              <img src={`/img/${p.img}`} alt={`Imagen de ${p.nombre}`} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carrusel;
