import { useState, useEffect, useMemo } from "react";
import axios from "axios";

export default function ProductsSearch() {
  const [q, setQ] = useState("");
  const [prods, setProds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch una sola vez
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios.get("/api/products")
      .then(res => {
        if (!mounted) return;
        setProds(res.data || []);
      })
      .catch(err => {
        if (!mounted) return;
        setError(err.message || "Error al cargar productos");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  // debounced query (100ms) usando useMemo para no recrear el timeout en cada render
  const debouncedQuery = useMemo(() => {
    let t = null;
    return {
      set: (val, onChange) => {
        if (t) clearTimeout(t);
        t = setTimeout(() => onChange(val), 100);
      },
      clear: () => { if (t) clearTimeout(t); }
    };
  }, []);

  // estado del query que realmente usamos para filtrar (despues del debounce)
  const [qActive, setQActive] = useState("");
  useEffect(() => {
    debouncedQuery.set(q, setQActive);
    return () => debouncedQuery.clear();
  }, [q, debouncedQuery]);

  // filtro simple: busca en name, description, category, characters
  const results = prods.filter(p => {
    if (!qActive) return true;
    const s = qActive.toLowerCase();
    const fields = [
      p.name || "",
      p.description || "",
      p.category || "",
      (p.characters || "").toString()
    ].join(" ").toLowerCase();
    return fields.includes(s);
  });

  return (
    <div style={{ padding: 12 }}>
      <h2 style={{ textAlign: "center" }}>Buscar productos</h2>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 12 }}>
        <input
          placeholder="Buscar por nombre, categoria, personaje..."
          value={q}
          onChange={e => setQ(e.target.value)}
          style={{
            width: 560,
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #444",
            background: "#111",
            color: "#eee"
          }}
        />
      </div>

      {loading && <p style={{ textAlign: "center" }}>Cargando productos...</p>}
      {error && <p style={{ textAlign: "center", color: "salmon" }}>{error}</p>}

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", color: "#eee" }}>
          <thead>
            <tr style={{ background: "#6a1b9a", color: "#fff" }}>
              <th style={{ padding: 12 }}>ID</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoria</th>
              <th>Personajes</th>
            </tr>
          </thead>
          <tbody>
            {results.length === 0 && !loading ? (
              <tr><td colSpan="7" style={{ padding: 16, textAlign: "center" }}>No se encontraron productos</td></tr>
            ) : (
              results.map(p => (
                <tr key={p.id} style={{ borderBottom: "1px solid #2a2a2a" }}>
                  <td style={{ padding: 10 }}>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.description}</td>
                  <td>{p.price}</td>
                  <td>{p.stock ?? "-"}</td>
                  <td>{p.category}</td>
                  <td>{p.characters}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
