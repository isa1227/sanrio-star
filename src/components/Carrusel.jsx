import { useEffect, useRef } from 'react';
import '../styles/Carrusel.css'; 

const personajes = [
  { nombre: 'Hello Kitty', ruta: '/Kitty.html', imagen: '/asset/img/iconHello.jfif' },
  { nombre: 'Cinnamoroll', ruta: '/Cina.html', imagen: '/asset/img/iconCina.jfif' },
  { nombre: 'Kuromi', ruta: '/Kuromi.html', imagen: '/asset/img/iconK.jfif' },
  { nombre: 'My Melody', ruta: '/Melody.html', imagen: '/asset/img/iconMeldy.jfif' },
  { nombre: 'Paxmaru', ruta: '/Paxmaru.html', imagen: '/asset/img/paxmaru.jpg' },
  { nombre: 'Pochaco', ruta: '/Pochaco.html', imagen: '/asset/img/iconPochaco.jfif' },
  { nombre: 'Pompom', ruta: '/Pompom.html', imagen: '/asset/img/iconPompom.jfif' },
  { nombre: 'Keroppi', ruta: '/Keroppi.html', imagen: '/asset/img/iconKeroppi.jfif' },
];

function Carrusel() {
  const carruselRef = useRef(null);

  useEffect(() => {
    const carrusel = carruselRef.current;

    const pauseAnimation = () => {
      carrusel.style.animationPlayState = 'paused';
    };

    const resumeAnimation = () => {
      carrusel.style.animationPlayState = 'running';
    };

    carrusel.addEventListener('mouseenter', pauseAnimation);
    carrusel.addEventListener('mouseleave', resumeAnimation);

    return () => {
      carrusel.removeEventListener('mouseenter', pauseAnimation);
      carrusel.removeEventListener('mouseleave', resumeAnimation);
    };
  }, []);

  return (
    <div className="carrusel">
      <div className="contenedor" ref={carruselRef}>
        {[...Array(2)].flatMap(() =>
          personajes.map((p, i) => (
            <div className="item" key={`${p.nombre}-${i}`}>
              <a href={p.ruta}><img src={p.imagen} alt={p.nombre} /></a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}


export default Carrusel;
