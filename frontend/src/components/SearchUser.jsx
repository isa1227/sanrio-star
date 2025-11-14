import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/api";

export default function SearchUser() {
  const [query, setQuery] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  // Cargar usuarios
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await axios.get(`${API_URL}/usuarios`);
        setUsuarios(res.data);
      } catch (err) {
        console.error("Error cargando usuarios:", err);
      }
    };

    fetchUsuarios();
  }, []);

  // Filtrado
  const usuariosFiltrados = usuarios.filter((u) => {
    if (!query) return true;

    const s = query.toLowerCase();
    const fields = [
      u.nombre_usuario || "",
      u.correo || ""
    ]
      .join(" ")
      .toLowerCase();

    return fields.includes(s);
  });

  return (
    <div style={{ padding: "20px" }}>
      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar usuarios por nombre o correo..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "10px 12px",
          borderRadius: "8px",
          border: "1px solid #444",
          background: "#111",
          color: "#eee",
          marginBottom: "15px",
        }}
      />

      {/* Tabla */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
          </tr>
        </thead>

        <tbody>
          {usuariosFiltrados.map((u) => (
            <tr key={u.usuario_id}>
              <td>{u.usuario_id}</td>
              <td>{u.nombre_usuario}</td>
              <td>{u.correo}</td>
              <td>{u.rol_id}</td>
            </tr>
          ))}

          {usuariosFiltrados.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "12px" }}>
                No se encontraron usuarios 😢
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
