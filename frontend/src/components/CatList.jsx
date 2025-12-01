import React, { useEffect, useState } from "react";
import CatForm from "./CatForm";
import CatTable from "./CatTable";
import {
  listarCategorias,
  eliminarCategoria
} from "../services/categoryService";

import { toast } from "react-toastify";

export default function CatList() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState("");

  const fetchCategorias = async () => {
    setLoading(true);
    try {
      const res = await listarCategorias();
      // compatibilidad: res.data puede venir como array directo o como objeto
      const data = res.data ?? [];
      setCategorias(Array.isArray(data) ? data : data.categorias ?? []);
    } catch (err) {
      console.error("Error cargando categorías", err);
      setCategorias([]);
      toast.error("No se pudieron cargar las categorías");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleSaved = () => {
    setEditing(null);
    fetchCategorias();
  };

  const handleEdit = (cat) => {
    setEditing(cat);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar categoría?")) return;

    try {
      await eliminarCategoria(id);
      toast.info("Categoría eliminada 🗑️");
      // optimización: filtrar localmente sin recargar toda la lista
      setCategorias(prev => prev.filter(c => (c.categoria_id ?? c.id) !== id));
    } catch (err) {
      console.error("Error eliminando", err);
      toast.error("No se pudo eliminar 😵");
    }
  };

  const categoriasFiltradas = categorias.filter((c) => {
    if (!query) return true;
    const s = query.toLowerCase();
    return (
      (c.nombre_categoria ?? "").toLowerCase().includes(s) ||
      (c.descripcion ?? "").toLowerCase().includes(s)
    );
  });

  return (
    <div className="cat-list">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h2>Categorías</h2>

        <input
          type="text"
          placeholder="Buscar categorías..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: 8, borderRadius: 6 }}
        />
      </div>

      <CatForm editing={editing} onSaved={handleSaved} onCancel={() => setEditing(null)} />

      {loading ? (
        <div>Cargando categorías...</div>
      ) : (
        <CatTable categorias={categoriasFiltradas} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
}
