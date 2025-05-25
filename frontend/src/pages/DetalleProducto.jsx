import { useParams } from 'react-router-dom';
import { productos } from '../data/productos';

const DetalleProducto = () => {
  const { id } = useParams();
  const producto = productos.find(p => p.id === parseInt(id));

  if (!producto) return <p className="text-center text-red-500">Producto no encontrado.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full h-96 object-contain rounded-xl border"
        />
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{producto.nombre}</h1>
        <div className="grid grid-cols-2 gap-x-2 text-gray-600 text-sm">
          <div>Marca:</div><div>Unidad</div>
          <div>Categoría:</div><div><strong>Sanrio</strong></div>
          <div>Condición:</div><div>Nuevo</div>
          <div>Código de barras:</div><div>No informado</div>
        </div>
        <div className="text-3xl text-pink-600 font-bold">{producto.precio}</div>

        <div className="flex items-center gap-4">
          <input
            type="number"
            defaultValue="1"
            min="1"
            className="w-20 border rounded px-2 py-1"
          />
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded">
            AÑADIR AL PEDIDO
          </button>
        </div>

        <p className="text-sm text-gray-500">Disponible: 8</p>
      </div>
    </div>
  );
};

export default DetalleProducto;
