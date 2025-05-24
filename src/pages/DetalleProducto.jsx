import { useParams } from 'react-router-dom';
import { productos } from '../data/productos';

const DetalleProducto = () => {
  const { id } = useParams();
  const producto = productos.find(p => p.id === parseInt(id));

  if (!producto) return <p>Producto no encontrado.</p>;

  return (
    <div className="product-detail">
      <div className="product-images">
        <img src={producto.imagen} alt={producto.nombre} />
        <div className="thumbnails">
          <img src={producto.imagen} alt="Vista 1" />
          <img src={producto.imagen} alt="Vista 2" />
          <img src={producto.imagen} alt="Vista 3" />
        </div>
      </div>
      <div className="product-info">
        <h1>{producto.nombre}</h1>
        <div className="info-grid">
          <div>Marca:</div><div>Unidad</div>
          <div>Categoría:</div><div><strong>Sanrio</strong></div>
          <div>Condición:</div><div>Nuevo</div>
          <div>Código de barras:</div><div>No informado</div>
        </div>
        <div className="price">{producto.precio}</div>
        <div className="actions">
          <input type="number" value="1" min="1" />
          <button>AÑADIR AL PEDIDO</button>
        </div>
        <p>Disponible: 8</p>
        
      </div>
    </div>
  );
};

export default DetalleProducto;
