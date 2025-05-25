import { useState } from 'react';
import { productos } from '../data/productos';
import '../styles/productos.css';

const categorias = ['todos', 'peluches', 'bolsos', 'maquillaje', 'audifonos', 'productos casa', 'accesorios', 'camisetas', 'escolares'];

const Productos = () => {
  const [filtro, setFiltro] = useState('todos');
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const productosFiltrados =
    filtro === 'todos' ? productos : productos.filter(p => p.categoria === filtro);

  return (
    <>
      {productoSeleccionado ? (
        <div className="product-detail">
          <div className="product-images">
            <img src={productoSeleccionado.imagen} alt={productoSeleccionado.nombre} />
          </div>
          <div className="product-info">
            <h1>{productoSeleccionado.nombre}</h1>
            <div className="info-grid">
              <span>Categoría:</span><span>{productoSeleccionado.categoria}</span>
              <span>ID:</span><span>{productoSeleccionado.id}</span>
            </div>
            <p className="price">{productoSeleccionado.precio}</p>
            <div className="actions">
              <input type="number" defaultValue={1} min={1} />
              <button>Agregar al carrito</button>
              <button onClick={() => setProductoSeleccionado(null)}>Volver</button>
            </div>
          </div>
        </div>
      ) : (
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
                <img
                  src={p.imagen}
                  alt={p.nombre}
                  onClick={() => setProductoSeleccionado(p)}
                  style={{ cursor: 'pointer' }}
                />
                <h3>{p.nombre}</h3>
                <p className="price">{p.precio}</p>
                <button>COMPRAR</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Productos;
