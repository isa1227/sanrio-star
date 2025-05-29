import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { productos } from '../data/productos';
import '../styles/productos.css';

const DetalleProducto = () => {
  const { id } = useParams();
  const producto = productos.find(p => p.id === parseInt(id));
  const [mensaje, setMensaje] = useState('');

  if (!producto) return <p className="text-center text-red-500">Producto no encontrado.</p>;

  const agregarAlCarrito = () => {
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");

    if (!usuarioLogueado) {
      setMensaje('⚠️ Debes iniciar sesión para agregar productos al carrito');
      setTimeout(() => setMensaje(''), 3000);
      return;
    }

    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    const nuevoCarrito = [...carritoActual, producto];
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    setMensaje('✅ Producto agregado al carrito');
    setTimeout(() => setMensaje(''), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* ✅ MENSAJE MOSTRADO JUSTO ARRIBA DEL DETALLE */}
      {mensaje && (
        <div className="mensaje-carrito">
          {mensaje}
        </div>
      )}

      <div className="product-detail">
        <div className="product-images">
          <img
            src={producto.imagen}
            alt={producto.nombre}
          />
        </div>

        <div className="product-info">
          <h1>{producto.nombre}</h1>
          <div className="info-grid">
            <span>Categoría:</span><span>Sanrio</span>
            <span>Condición:</span><span>Nuevo</span>
            <span>Código de barras:</span><span>No informado</span>
            <span>ID:</span><span>{producto.id}</span>
          </div>
          <p className="price">{producto.precio}</p>

          <div className="actions">
            <input type="number" defaultValue={1} min={1} />
            <button onClick={agregarAlCarrito}>AÑADIR AL PEDIDO</button>
          </div>

          <p className="text-sm text-gray-500">Disponible: 8</p>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
