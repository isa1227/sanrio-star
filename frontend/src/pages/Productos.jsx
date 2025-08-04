import { useState, useEffect } from 'react';
import { productos } from '../data/productos';
import '../styles/productos.css';

const categorias = ['todos', 'peluches', 'bolsos', 'maquillaje', 'audifonos', 'productos casa', 'accesorios', 'camisetas', 'escolares'];

const Productos = () => {
  const [filtro, setFiltro] = useState('todos');
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [cantidad, setCantidad] = useState(1); // NUEVO

  useEffect(() => {
    const mensajeAuth = localStorage.getItem("mensajeAuth");
    if (mensajeAuth) {
      setMensaje(mensajeAuth);
      localStorage.removeItem("mensajeAuth");

      const timer = setTimeout(() => setMensaje(''), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const productosFiltrados =
    filtro === 'todos' ? productos : productos.filter(p => p.categoria === filtro);

  const agregarAlCarrito = (producto) => {
    const usuario = localStorage.getItem("usuario");

    if (!usuario) {
      setMensaje('⚠️ Debes iniciar sesión para agregar productos al carrito');
      setTimeout(() => setMensaje(''), 3000);
      return;
    }

    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    const nuevoCarrito = [...carritoActual, { ...producto, cantidad }]; // AÑADIR cantidad
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    setMensaje('✅ Producto agregado al carrito');
    setTimeout(() => setMensaje(''), 3000);
  };

  return (
    <>
      {productoSeleccionado ? (
        <div style={{ padding: '20px' }}>
          {mensaje && (
            <div className="mensaje-carrito">
              {mensaje}
            </div>
          )}

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
                <input
                  type="number"
                  min={1}
                  value={cantidad}
                  onChange={(e) => setCantidad(parseInt(e.target.value))}
                />
                <button onClick={() => agregarAlCarrito(productoSeleccionado)}>Agregar al carrito</button>
                <button onClick={() => setProductoSeleccionado(null)}>Volver</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="productos-layout">
          {/* Menú lateral */}
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

          {/* Contenido principal */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {mensaje && (
              <div className="mensaje-carrito">
                {mensaje}
              </div>
            )}

            <div className="containerr">
              {productosFiltrados.map((p) => (
                <div className="card" key={p.id}>
                  <img
                    src={p.imagen}
                    alt={p.nombre}
                    onClick={() => {
                      setProductoSeleccionado(p);
                      setCantidad(1); // Reiniciar cantidad al entrar al detalle
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                  <h3>{p.nombre}</h3>
                  <p className="price">{p.precio}</p>
                  <button onClick={() => agregarAlCarrito({ ...p, cantidad: 1 })}>COMPRAR</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

<footer id="contacto"  className="footer-productos">
  <h3 className="footer-productos-titulo">Contacto</h3>
  <p className="footer-productos-texto">Email: contacto@sanriostar.com</p>
  <p className="footer-productos-texto">Teléfono: +123 456 789</p>
  <p className="footer-productos-texto">© 2024 Sanrio Star</p>
</footer>

  <button
    className="scroll-top-btn-general"
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  >
    ⭐
  </button>

    </>
  );
};

export default Productos;
