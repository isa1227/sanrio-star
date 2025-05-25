// src/components/Fondo.jsx
import React from "react";
import fondoImg from "../assets/img/fondo.jpg"; // 🔧 Ruta corregida
import "../styles/Fondo.css";


const Fondo = () => {
  return (
    <section
      className="lol"
      style={{ backgroundImage: `url(${fondoImg})` }}
    >
      {/* Puedes agregar texto o contenido aquí */}
    </section>
  );
};

export default Fondo;
