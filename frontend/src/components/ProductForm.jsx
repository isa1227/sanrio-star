import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductForm({ selected, onSave, onCancel }) {
  const [producto, setProducto] = useState({
    producto_id: null,
    nombre_producto: "",
    descripcion: "",
    precio: "",
    categoria_id: "",
    imagen: null,
  });

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/categorias").then((res) => {
      setCategorias(res.data);
    });
  }, []);

  useEffect(() => {
    if (selected) {
      setProducto({
        producto_id: selected.producto_id || null,
        nombre_producto: selected.nombre_producto || "",
        descripcion: selected.descripcion || "",
        precio: selected.precio || "",
        categoria_id: selected.categoria_id || "",
        imagen: null,
      });
    } else {
      setProducto({
        producto_id: null,
        nombre_producto: "",
        descripcion: "",
        precio: "",
        categoria_id: "",
        imagen: null,
      });
    }
  }, [selected]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProducto((prev) => ({
      ...prev,
      [name]: name === "imagen" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre_producto", producto.nombre_producto);
    formData.append("descripcion", producto.descripcion);
    formData.append("precio", producto.precio);
    formData.append("categoria_id", producto.categoria_id);
    if (producto.imagen) {
      formData.append("imagen", producto.imagen);
    }

    try {
      if (producto.producto_id) {
        await axios.post(
          `http://localhost:8000/api/productos/${producto.producto_id}?_method=PUT`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post("http://localhost:8000/api/productos", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      onSave(); // actualiza la tabla
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <input
        name="nombre_producto"
        placeholder="Nombre"
        value={producto.nombre_producto}
        onChange={handleChange}
        required
      />
      <input
        name="descripcion"
        placeholder="Descripción"
        value={producto.descripcion}
        onChange={handleChange}
        required
      />
      <input
        name="precio"
        type="number"
        placeholder="Precio"
        value={producto.precio}
        onChange={handleChange}
        required
      />

      <select
        name="categoria_id"
        value={producto.categoria_id}
        onChange={handleChange}
        required
      >
        <option value="">Seleccione categoría</option>
        {categorias.map((cat) => (
          <option key={cat.id_categoria} value={cat.id_categoria}>
            {cat.nombre_categoria}
          </option>
        ))}
      </select>

      <input
        name="imagen"
        type="file"
        onChange={handleChange}
        accept="image/*"
      />
      <div className="botones-formulario">
        <button type="submit">
          {producto.producto_id ? "Actualizar" : "Crear"}
        </button>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
