import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductForm({ selected, onSave, onCancel }) {
  const [producto, setProducto] = useState({
    nombre_producto: "",
    descripcion: "",
    precio: "",
    categoria_id: "",
    url_imagen: "",
  });

  useEffect(() => {
    if (selected) setProducto(selected);
  }, [selected]);

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (producto.producto_id) {
        await axios.put(`http://localhost:8000/api/productos/${producto.producto_id}`, producto);
      } else {
        await axios.post("http://localhost:8000/api/productos", producto);
      }
      onSave();
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <input name="nombre_producto" placeholder="Nombre" value={producto.nombre_producto} onChange={handleChange} />
      <input name="descripcion" placeholder="Descripción" value={producto.descripcion} onChange={handleChange} />
      <input name="precio" type="number" placeholder="Precio" value={producto.precio} onChange={handleChange} />
      <input name="categoria_id" placeholder="Categoría" value={producto.categoria_id} onChange={handleChange} />
      <input name="url_imagen" placeholder="URL de imagen" value={producto.url_imagen} onChange={handleChange} />
      <button type="submit">{producto.producto_id ? "Actualizar" : "Crear"}</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
}
