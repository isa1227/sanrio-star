import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/productos.css';

const Productos = () => {
  const [filtro, setFiltro] = useState('todos');
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [cantidad, setCantidad] = useState(1);

  // Mensajes temporales
  useEffect(() => {
    const mensajeAuth = localStorage.getItem("mensajeAuth");
    if (mensajeAuth) {
      setMensaje(mensajeAuth);
      localStorage.removeItem("mensajeAuth");
      const timer = setTimeout(() => setMensaje(''), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Obtener productos desde la API Laravel
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/productos");
        setProductos(res.data);
      } catch (err) {
        console.error("Error al obtener productos:", err);
      }
    };
    fetchProductos();
  }, []);

  // Obtener categorías desde la API Laravel
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/categorias");
        setCategorias(res.data);
      } catch (err) {
        console.error("Error al obtener categorías:", err);
      }
    };
    fetchCategorias();
  }, []);

  // Filtrar productos
  const productosFiltrados =
    filtro === 'todos'
      ? productos
      : productos.filter(p => p.categoria_id === Number(filtro));

  // Agregar al carrito
  const agregarAlCarrito = (producto) => {
    const usuario = localStorage.getItem("usuario");
    if (!usuario) {
      setMensaje('⚠️ Debes iniciar sesión para agregar productos al carrito');
      setTimeout(() => setMensaje(''), 3000);
      return;
    }

    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    const nuevoCarrito = [...carritoActual, { ...producto, cantidad }];
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    setMensaje('✅ Producto agregado al carrito');
    setTimeout(() => setMensaje(''), 3000);
  };

  // Obtener nombre de categoría para el detalle
  const obtenerNombreCategoria = (categoria_id) => {
    const cat = categorias.find(c => c.categoria_id === categoria_id);
    return cat ? cat.nombre_categoria : 'Sin categoría';
  };

  return (
    <>
      {productoSeleccionado ? (
        <div style={{ padding: '20px' }}>
          {mensaje && <div className="mensaje-carrito">{mensaje}</div>}

          <div className="product-detail">
            <div className="product-images">
              <img
                src={productoSeleccionado.url_imagen}
                alt={productoSeleccionado.nombre_producto}
              />
            </div>
            <div className="product-info">
              <h1>{productoSeleccionado.nombre_producto}</h1>
              <div className="info-grid">
                <span>Categoría:</span>
                <span>{obtenerNombreCategoria(productoSeleccionado.categoria_id)}</span>
                <span>ID:</span>
                <span>{productoSeleccionado.producto_id}</span>
              </div>
              <p className="price">${productoSeleccionado.precio}</p>
              <div className="actions">
                <input
                  type="number"
                  min={1}
                  value={cantidad}
                  onChange={(e) => setCantidad(parseInt(e.target.value))}
                />
                <button onClick={() => agregarAlCarrito(productoSeleccionado)}>
                  Agregar al carrito
                </button>
                <button onClick={() => setProductoSeleccionado(null)}>
                  Volver
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="productos-layout">
          {/* Menú lateral */}
          <aside className="sidebar">
            <h3>Categorías</h3>

            {/* Botón TODOS */}
            <button
              onClick={() => setFiltro('todos')}
              className={filtro === 'todos' ? 'activo' : ''}
            >
              TODOS
            </button>

            {/* Categorías dinámicas */}
            {categorias.map(cat => (
              <button
                key={cat.categoria_id}
                onClick={() => setFiltro(cat.categoria_id)}
                className={filtro === cat.categoria_id ? 'activo' : ''}
              >
                {cat.nombre_categoria.toUpperCase()}
              </button>
            ))}
          </aside>

          {/* Contenido principal */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {mensaje && <div className="mensaje-carrito">{mensaje}</div>}

            <div className="containerr">
              {productosFiltrados.map((p) => (
                <div className="card" key={p.producto_id}>
                  <img
                    src={p.url_imagen}
                    alt={p.nombre_producto}
                    onClick={() => {
                      setProductoSeleccionado(p);
                      setCantidad(1);
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                  <h3>{p.nombre_producto}</h3>
                  <p className="price">${p.precio}</p>
                  <button
                    onClick={() =>
                      agregarAlCarrito({ ...p, cantidad: 1 })
                    }
                  >
                    COMPRAR
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <footer id="contacto" className="footer-productos">
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
