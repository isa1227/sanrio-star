import React, { useEffect, useState } from 'react';
import '../styles/Destacados.css';

const Destacados = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchDestacados = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/productos/destacados');
        if (!res.ok) throw new Error('Error al obtener productos destacados');
        const data = await res.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };

    fetchDestacados();
  }, []);

  return (
    <section className="destacados">
      <h2>✨ Productos Nuevos ✨</h2>
      <div className="tarjetas-productos">
        {productos.map((p, index) => (
          <div className="tarjeta" key={index}>
            <img src={p.url_imagen} alt={p.nombre_producto} />
            <h3>{p.nombre_producto}</h3>
            <p>${p.precio}</p>
            <a href="/Productos" className="btn">Ver más</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Destacados;
