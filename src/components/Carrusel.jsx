import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Importa Link
import '../styles/Carrusel.css';

import iconHello from '../assets/img/iconHello.jfif';
import iconCina from '../assets/img/iconCina.jfif';
import iconKuromi from '../assets/img/iconK.jfif';
import iconMelody from '../assets/img/iconMeldy.jfif';
import paxmaru from '../assets/img/paxmaru.jpg';
import iconPochaco from '../assets/img/iconPochaco.jfif';
import iconPompom from '../assets/img/iconPompom.jfif';
import iconKeroppi from '../assets/img/iconKeroppi.jfif';
import iconChococat from '../assets/img/iconcat.jpg';

const imagenes = [
  { src: iconCina, link: '/cinnamoroll', alt: 'Cinnamoroll' }, // ⬅ Corrige aquí también
  { src: iconKuromi, link: '/kuromi', alt: 'Kuromi' },         // ⬅ Corrige aquí también
  { src: iconMelody, link: '/mymelody', alt: 'My Melody' }, // ✅ corregido
  { src: paxmaru, link: '/badtzmaru', alt: 'Badtz-Maru' }, // ✅ cambiado
  { src: iconPochaco, link: '/pochaco', alt: 'Pochacco' },// ✅ cambiado
  { src: iconPompom, link: '/pompom', alt: 'Pompompurin' },// ✅ cambiado
  { src: iconKeroppi, link: '/keroppi', alt: 'Keroppi' }, // ✅ corregido (minúscula)
  { src: iconChococat, link: '/chococat', alt: 'Chococat' },// ✅ corregido (minúscula)
  { src: iconHello, link: '/Kitty', alt: 'Hello Kitty' },
];

const Carrusel = () => {
  const renderItems = () =>
    imagenes.concat(imagenes).map((img, index) => (
      <div className="item" key={index}>
        <Link to={img.link}>
          <img src={img.src} alt={img.alt} />
        </Link>
      </div>
    ));

  return (
    <div className="carrusel">
      <div className="contenedor" onMouseEnter={pauseAnimation} onMouseLeave={resumeAnimation}>
        {renderItems()}
      </div>
      <div className="contenedor">{renderItems()}</div>
    </div>
  );
};

function pauseAnimation(e) {
  e.currentTarget.style.animationPlayState = 'paused';
}

function resumeAnimation(e) {
  e.currentTarget.style.animationPlayState = 'running';
}

export default Carrusel;
