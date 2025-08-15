import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Buscar.css";

const personajesColores = {
  kuromi: { fondo: ["#2a022a", "#d1a1e3"], texto: "#FFFFFF" },
  cinnamoroll: { fondo: ["#abdbe7", "#6ec1e4"], texto: "#000000" },
  "hello kitty": { fondo: ["#d94c4c", "#ffffff"], texto: "#000000" },
  pochacco: { fondo: ["#d9f0e7", "#3a9d9b"], texto: "#000000" },
  keroppi: { fondo: ["#d0f0c0", "#3b7a57"], texto: "#000000" },
  "my melody": { fondo: ["#f295be", "#ffffff"], texto: "#000000" },
  pompompurin: { fondo: ["#fff6dc", "#c7953e"], texto: "#000000" },
  chococat: { fondo: ["#1e1e2f", "#ffd600"], texto: "#FFFFFF" },
  badtzmaru: { fondo: ["#0d1b2a", "#9b9b9b"], texto: "#FFD400" },
};


const personajesNombres = Object.keys(personajesColores);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// Distancia de Levenshtein para sugerencias
function distanciaLevenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1].toLowerCase() === b[j - 1].toLowerCase()) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] =
          1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[a.length][b.length];
}

// Función para sugerir personaje si hay error de tipeo
function sugerirPersonaje(busqueda) {
  let sugerencia = null;
  let menorDistancia = Infinity;
  for (const personaje of personajesNombres) {
    const dist = distanciaLevenshtein(busqueda, personaje);
    if (dist < menorDistancia) {
      menorDistancia = dist;
      sugerencia = personaje;
    }
  }
  return menorDistancia <= 3 ? sugerencia : null;
}

// Normaliza nombres: elimina espacios y guiones, todo en minúscula
function normalizarNombre(nombre) {
  return nombre.toLowerCase().replace(/\s|-/g, "");
}

function Buscar() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sugerencia, setSugerencia] = useState(null);

  const query = useQuery().get("q");
  const personajeKey = query ? normalizarNombre(query) : "";
  const estilo =
    personajesColores[personajeKey] || { fondo: ["#F3BEFC", "#440040"], texto: "#000000" };

  const navigate = useNavigate();

  // useEffect actualizado
  useEffect(() => {
    if (!query) {
      setProductos([]);
      setLoading(false);
      setSugerencia(null);
      return;
    }

    setLoading(true);

    const sugerida = sugerirPersonaje(personajeKey);
    if (sugerida && normalizarNombre(sugerida) !== personajeKey) {
      setSugerencia(sugerida);
    } else {
      setSugerencia(null);
    }

    const queryFinal =
      sugerida && normalizarNombre(sugerida) !== personajeKey
        ? sugerida
        : query;

    fetch(`http://127.0.0.1:8000/api/productos/buscar?q=${encodeURIComponent(queryFinal)}`)
      .then((res) => res.json())
      .then((data) => {
        const dataFiltrada = data.filter((p) =>
          normalizarNombre(p.nombre_producto).includes(normalizarNombre(queryFinal))
        );
        setProductos(dataFiltrada);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [query, personajeKey]);

  // Función para agregar productos al carrito
  const agregarAlCarrito = (producto) => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];

    const productoFormateado = {
      nombre: producto.nombre_producto,
      precio: producto.precio,
      imagen: producto.url_imagen
        ? `http://127.0.0.1:8000/storage/${producto.url_imagen}`
        : "/placeholder.png",
      producto_id: producto.producto_id,
      cantidad: 1,
    };

    const existe = carritoActual.find(p => p.producto_id === producto.producto_id);
    if (!existe) {
      carritoActual.push(productoFormateado);
    } else {
      existe.cantidad += 1;
    }

    localStorage.setItem("carrito", JSON.stringify(carritoActual));
    alert(`${producto.nombre_producto} agregado al carrito 🛒`);
  };

  return (
    <>
      <div
        className="buscar-container"
        style={{
          background: `linear-gradient(135deg, ${estilo.fondo[0]}, ${estilo.fondo[1]})`,
          color: estilo.texto,
        }}
      >
        <h1 className="buscar-title">
          Resultados para: <span>"{query}"</span>
        </h1>

        {sugerencia && (
          <p className="sugerencia">
            Quizás querías decir:{" "}
            <span
              className="sugerencia-click"
              onClick={() =>
                navigate(`/buscar?q=${encodeURIComponent(sugerencia)}`)
              }
            >
              {sugerencia}
            </span>
            ?
          </p>
        )}

        {loading ? (
          <p>Cargando productos...</p>
        ) : productos.length > 0 ? (
          <div className="productos-grid">
            {productos.map((p) => (
              <div key={p.producto_id} className="producto-card">
                <img
                  src={
                    p.url_imagen
                      ? `http://127.0.0.1:8000/storage/${p.url_imagen}`
                      : "/placeholder.png"
                  }
                  alt={p.nombre_producto}
                />
                <div
                  className="overlay"
                  style={{
                    background: `linear-gradient(135deg, ${estilo.fondo[0]}, ${estilo.fondo[1]})`,
                    color: estilo.texto,
                  }}
                >
                  <h3>{p.nombre_producto}</h3>
                  <p>{p.descripcion}</p>
                  <p
                    className="precio"
                    style={{ background: estilo.texto, color: estilo.fondo[0] }}
                  >
                    ${p.precio}
                  </p>
                  <button
                    className="add-btn"
                    style={{
                      background: `linear-gradient(135deg, ${estilo.fondo[1]}, ${estilo.fondo[0]})`,
                      color: estilo.texto,
                    }}
                    onClick={() => agregarAlCarrito(p)}
                  >
                    Agregar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h2 className="sin-resultados">
            No se encontraron productos para: "{query}"
          </h2>
        )}
      </div>

      <footer className="footer-buscar">
        <h3 className="footer-buscar-titulo">Contacto</h3>
        <p className="footer-buscar-texto">Email: contacto@sanriostar.com</p>
        <p className="footer-buscar-texto">Teléfono: +123 456 789</p>
        <p className="footer-buscar-texto">© 2024 Sanrio Star</p>
      </footer>
    </>
  );
}

export default Buscar;
