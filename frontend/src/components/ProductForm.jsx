import { useState, useEffect } from "react";
import axios from "axios";

const ProductForm = ({ selected, setSelected, refresh }) => {
  const [form, setForm] = useState({
    nombre_producto: "",
    descripcion: "",
    precio: "",
    categoria_id: "",
    personajes: "",
    url_imagen: null,
  });

  useEffect(() => {
    if (selected) {
      setForm({ ...selected, url_imagen: null });
    }
  }, [selected]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key] !== null) data.append(key, form[key]);
    });

    try {
      if (selected) {
        await axios.post(
          `http://http://localhost:8000/api/productos/${selected.producto_id}?_method=PUT`,
          data
        );
      } else {
        await axios.post("http://localhost:8000/api/productos", data);
      }
      setForm({
        nombre_producto: "",
        descripcion: "",
        precio: "",
        categoria_id: "",
        personajes: "",
        url_imagen: null,
      });
      setSelected(null);
      refresh();
    } catch (err) {
      console.error("Error guardando producto:", err);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="nombre_producto"
        placeholder="Nombre"
        value={form.nombre_producto}
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
      <input
        type="number"
        name="precio"
        placeholder="Precio"
        value={form.precio}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="categoria_id"
        placeholder="Categoría ID"
        value={form.categoria_id}
        onChange={handleChange}
      />
      <input
        type="text"
        name="personajes"
        placeholder="Personajes"
        value={form.personajes}
        onChange={handleChange}
      />
      <input type="file" name="url_imagen" onChange={handleChange} />
      <button type="submit">{selected ? "Actualizar" : "Crear"}</button>
    </form>
  );
};

export default ProductForm;
