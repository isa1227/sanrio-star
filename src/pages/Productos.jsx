import { useState } from 'react';
import { productos } from '../data/productos';
import '../styles/productos.css';


const categorias = ['todos', 'peluches', 'bolsos', 'maquillaje', 'audifonos', 'productos casa', 'accesorios', 'camisetas', 'escolares'];

const Productos = () => {
  const [filtro, setFiltro] = useState('todos');

  const productosFiltrados =
    filtro === 'todos' ? productos : productos.filter(p => p.categoria === filtro);

  return (
    <>

      <div className="productos-layout">
        {/* Menú lateral vertical */}
        <aside className="sidebar">
          <h3>Categorías</h3>
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setFiltro(cat)}
              className={filtro === cat ? 'activo' : ''}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </aside>

        {/* Lista de productos */}
        <div className="container">
          {productosFiltrados.map((p) => (
            <div className="card" key={p.id}>
              <img src={p.imagen} alt={p.nombre} />
              <h3>{p.nombre}</h3>
              <p>{p.precio}</p>
              <button>COMPRAR</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Productos;
