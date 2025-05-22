import { Link } from 'react-router-dom';
import { productos } from '../data/productos';
import '../styles/productos.css';

const Productos = () => (
  <div className="container">
    {productos.map((p) => (
      <div className="card" key={p.id}>
        <img src={p.imagen} alt={p.nombre} />
        <h3>{p.nombre}</h3>
        <p>{p.precio}</p>
        <button>AÑADIR</button>
        <Link to={`/productos/${p.id}`}><button>MÁS INFORMACIÓN</button></Link>
      </div>
    ))}
  </div>
);

export default Productos;
