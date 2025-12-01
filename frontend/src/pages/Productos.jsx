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

  // 📌 PAGINACIÓN
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 8;

  // === MENSAJES ===
  useEffect(() => {
    const mensajeAuth = localStorage.getItem("mensajeAuth");
    if (mensajeAuth) {
      setMensaje(mensajeAuth);
      localStorage.removeItem("mensajeAuth");
      const timer = setTimeout(() => setMensaje(''), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  // === API: PRODUCTOS ===
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

  // === API: CATEGORÍAS ===
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

  // === FILTRO ===
  const productosFiltrados =
    filtro === 'todos'
      ? productos
      : productos.filter(p => p.categoria_id === Number(filtro));

  // === ACTUALIZAR PAGINACIÓN CUANDO CAMBIA EL FILTRO ===
  useEffect(() => {
    setPaginaActual(1);
  }, [filtro]);

  // === CÁLCULO DE PÁGINAS ===
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  const indexInicio = (paginaActual - 1) * productosPorPagina;
  const indexFin = indexInicio + productosPorPagina;
  const productosPaginados = productosFiltrados.slice(indexInicio, indexFin);

  // === AGREGAR AL CARRITO ===
  const agregarAlCarrito = (producto) => {
    const usuario = localStorage.getItem("usuario");
    if (!usuario) {
      setMensaje('⚠️ Debes iniciar sesión para agregar productos al carrito');
      setTimeout(() => setMensaje(''), 3000);
      return;
    }

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const existe = carrito.find(item => item.producto_id === producto.producto_id);

    if (existe) {
      carrito = carrito.map(item =>
        item.producto_id === producto.producto_id
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      );
    } else {
      carrito.push({
        producto_id: producto.producto_id,
        nombre: producto.nombre_producto,
        descripcion: producto.descripcion,
        precio: producto.precio,
        imagen: producto.url_imagen,
        cantidad: cantidad,
      });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    setMensaje('🛒 Producto agregado al carrito');
    setTimeout(() => setMensaje(''), 3000);
  };

  const obtenerNombreCategoria = (categoria_id) => {
    const cat = categorias.find(c => c.categoria_id === categoria_id);
    return cat ? cat.nombre_categoria : 'Sin categoría';
  };

  return (
    <>
      {productoSeleccionado ? (
        //---------------- DETALLE ----------------
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
              
              <p className="price">${productoSeleccionado.precio}</p>
              </div>
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
        //---------------- LISTA DE PRODUCTOS ----------------
        <div className="productos-layout">

          {/* -- SIDEBAR -- */}
          <aside className="sidebar">
            <h3>Categorías</h3>

            <button
              onClick={() => setFiltro('todos')}
              className={filtro === 'todos' ? 'activo' : ''}
            >
              TODOS
            </button>

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

          {/* -- CUADRÍCULA DE PRODUCTOS -- */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {mensaje && <div className="mensaje-carrito">{mensaje}</div>}

            <div className="containerr">
              {productosPaginados.map((p) => (
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
                    onClick={() => {
                      setCantidad(1);
                      agregarAlCarrito(p);
                    }}
                  >
                    COMPRAR
                  </button>
                </div>
              ))}
            </div>

            {/* ---- PAGINACIÓN ---- */}
            <div className="paginacion">
              <button
                disabled={paginaActual === 1}
                onClick={() => setPaginaActual(paginaActual - 1)}
              >
                ◀
              </button>

              {Array.from({ length: totalPaginas }, (_, i) => (
                <button
                  key={i + 1}
                  className={paginaActual === i + 1 ? "activo" : ""}
                  onClick={() => setPaginaActual(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={paginaActual === totalPaginas}
                onClick={() => setPaginaActual(paginaActual + 1)}
              >
                ▶
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Footer */}
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
