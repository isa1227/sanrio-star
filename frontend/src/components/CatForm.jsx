import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { crearCategoria, editarCategoria } from "../services/categoryService";
import "../styles/AdminPanel.css";

export default function CatForm({ editing, onSaved, onCancel }) {
  const [form, setForm] = useState({
    nombre_categoria: "",
    descripcion: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editing) {
      setForm({
        nombre_categoria: editing.nombre_categoria ?? "",
        descripcion: editing.descripcion ?? "",
      });
    } else {
      setForm({
        nombre_categoria: "",
        descripcion: "",
      });
    }
  }, [editing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editing) {
        const id = editing.categoria_id ?? editing.id;
        await editarCategoria(id, form);
        toast.success("Categoría actualizada con éxito 🎯");
      } else {
        await crearCategoria(form);
        toast.success("Categoría creada correctamente 🚀");
      }

      setForm({ nombre_categoria: "", descripcion: "" });
      onSaved && onSaved();
    } catch (err) {
      console.error("Error guardando categoría:", err);
      toast.error("Ups... ocurrió un error 😢");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <input
        type="text"
        name="nombre_categoria"
        placeholder="Nombre"
        value={form.nombre_categoria}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="descripcion"
        placeholder="Descripción"
        value={form.descripcion}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : editing ? "Actualizar" : "Crear"}
      </button>

      {editing && (
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      )}
    </form>
  );
}
