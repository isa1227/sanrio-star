import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Buscar.css";

const personajesColores = {
  kuromi: { fondo: ["#F3BEFC", "#440040"], texto: "#000000" },
  cinnamoroll: { fondo: ["#BEEBFF", "#440040"], texto: "#000000" },
  "my melody": { fondo: ["#D1B3FF", "#440040"], texto: "#000000" },
  hello: { fondo: ["#E6CCFF", "#440040"], texto: "#000000" },
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Buscar() {
  const [productos, setProductos] = useState([]);
  const query = useQuery().get("q");
  const personajeKey = query ? query.toLowerCase().trim() : "";
  const estilo = personajesColores[personajeKey] || { fondo: ["#F3BEFC", "#440040"], texto: "#000000" };

  useEffect(() => {
    if (query) {
      fetch(`http://127.0.0.1:8000/api/productos/buscar?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => setProductos(data))
        .catch(err => console.error(err));
    }
  }, [query]);

  return (
    <div className="buscar-container" style={{
        background: `linear-gradient(135deg, ${estilo.fondo[0]}, ${estilo.fondo[1]})`,
        color: estilo.texto
    }}>
      <h1 className="buscar-title">Resultados para: <span>"{query}"</span></h1>

      {productos.length > 0 ? (
        <div className="productos-grid">
          {productos.map(p => (
            <div key={p.id} className="producto-card">
              <img src={p.imagen || "/placeholder.png"} alt={p.nombre} />
              <div className="overlay">
                <h3>{p.nombre}</h3>
                <p>{p.descripcion}</p>
                <p className="precio">${p.precio}</p>
                <button className="add-btn">Agregar</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="sin-resultados">
        </div>
      )}
    </div>
  );
}

export default Buscar;
