import React from 'react';
import '../styles/Destacados.css';

import kuBolso from '../assets/img/kuBOLSO.jpg';
import vasoMelody from '../assets/img/vasomelody.jpg';
import cinaPeluche from '../assets/img/cinaPELUCHE.jpg';
import poSandalias from '../assets/img/poSANDALIAS.jpg';

const productos = [
  {
    img: kuBolso,
    nombre: 'Bolso de Kuromi',
    precio: '$69.000',
    link: '/Productos',
  },
  {
    img: vasoMelody,
    nombre: 'Vaso My Melody',
    precio: '$25.000',
    link: '/Productos',
  },
  {
    img: cinaPeluche,
    nombre: 'Peluche Cinnamoroll',
    precio: '$38.000',
    link: '/Productos',
  },
  {
    img: poSandalias,
    nombre: 'Sandalias Pochaco',
    precio: '$18.000',
    link: '/Productos',
  },
];

const Destacados = () => {
  return (
    <section className="destacados">
      <h2>✨ Productos Destacados ✨</h2>
      <div className="tarjetas-productos">
        {productos.map((p, index) => (
          <div className="tarjeta" key={index}>
            <img src={p.img} alt={p.nombre} />
            <h3>{p.nombre}</h3>
            <p>{p.precio}</p>
            <a href={p.link} className="btn">Ver más</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Destacados;
