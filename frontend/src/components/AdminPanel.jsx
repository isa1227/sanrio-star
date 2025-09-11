import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminPanel.css";

const API_URL = "http://localhost:8000/api"; // ⚡ Cambia si usas otro puerto

const AdminPanel = () => {
  const [view, setView] = useState("productos");
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({});
  const [editing, setEditing] = useState(null);

  // -------------------------------
  // 📌 Cargar datos
  // -------------------------------
  const fetchProductos = async () => {
    try {
      const res = await axios.get(`${API_URL}/productos`);
      setProductos(res.data);
    } catch (err) {
      console.error("Error cargando productos", err);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const res = await axios.get(`${API_URL}/usuarios`);
      setUsuarios(res.data);
    } catch (err) {
      console.error("Error cargando usuarios", err);
    }
  };

  useEffect(() => {
    if (view === "productos") fetchProductos();
    if (view === "usuarios") fetchUsuarios();
  }, [view]);

  // -------------------------------
  // 📌 Manejo de formularios
  // -------------------------------
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const resetForm = () => {
    setForm({});
    setEditing(null);
  };

  // -------------------------------
  // 📌 Crear o actualizar
  // -------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (view === "productos") {
        const formData = new FormData();
        Object.keys(form).forEach((key) => {
          formData.append(key, form[key]);
        });

        if (editing) {
          await axios.post(`${API_URL}/productos/${editing}?_method=PUT`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        } else {
          await axios.post(`${API_URL}/productos`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        }
        fetchProductos();
      } else {
        if (editing) {
          await axios.put(`${API_URL}/usuarios/${editing}`, form);
        } else {
          await axios.post(`${API_URL}/usuarios`, form);
        }
        fetchUsuarios();
      }

      resetForm();
    } catch (err) {
      console.error("Error guardando", err);
    }
  };

  // -------------------------------
  // 📌 Editar
  // -------------------------------
  const handleEdit = (item) => {
    setEditing(view === "productos" ? item.producto_id : item.id);
    setForm(item);
  };

  // -------------------------------
  // 📌 Eliminar
  // -------------------------------
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este registro?")) return;
    try {
      if (view === "productos") {
        await axios.delete(`${API_URL}/productos/${id}`);
        fetchProductos();
      } else {
        await axios.delete(`${API_URL}/usuarios/${id}`);
        fetchUsuarios();
      }
    } catch (err) {
      console.error("Error eliminando", err);
    }
  };

  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>

      {/* Menú */}
      <div className="menu">
        <button onClick={() => setView("productos")}>Productos</button>
        <button onClick={() => setView("usuarios")}>Usuarios</button>
      </div>

      {/* -------------------------------
          FORMULARIO
      ------------------------------- */}
      <form className="formulario" onSubmit={handleSubmit}>
        {view === "productos" ? (
          <>
            <input
              type="text"
              name="nombre_producto"
              placeholder="Nombre"
              value={form.nombre_producto || ""}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="descripcion"
              placeholder="Descripción"
              value={form.descripcion || ""}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="precio"
              placeholder="Precio"
              value={form.precio || ""}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="categoria_id"
              placeholder="Categoría"
              value={form.categoria_id || ""}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="personajes"
              placeholder="Personajes"
              value={form.personajes || ""}
              onChange={handleChange}
            />
            <input type="file" name="url_imagen" onChange={handleChange} />
          </>
        ) : (
          <>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={form.nombre || ""}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email || ""}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password || ""}
              onChange={handleChange}
              required={!editing}
            />
            <input
              type="number"
              name="rol_id"
              placeholder="Rol"
              value={form.rol_id || ""}
              onChange={handleChange}
              required
            />
          </>
        )}
        <button type="submit">{editing ? "Actualizar" : "Crear"}</button>
        {editing && <button onClick={resetForm}>Cancelar</button>}
      </form>

      {/* -------------------------------
          TABLA
      ------------------------------- */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {view === "productos" ? (
                <>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Categoría</th>
                  <th>Imagen</th>
                  <th>Personajes</th>
                  <th>Acciones</th>
                </>
              ) : (
                <>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {view === "productos"
              ? productos.map((p) => (
                  <tr key={p.producto_id}>
                    <td data-label="ID">{p.producto_id}</td>
                    <td data-label="Nombre">{p.nombre_producto}</td>
                    <td data-label="Descripción">{p.descripcion}</td>
                    <td data-label="Precio">{p.precio}</td>
                    <td data-label="Categoría">{p.categoria_id}</td>
                    <td data-label="Imagen">
                      {p.url_imagen ? (
                        <img
                          src={p.url_imagen} // ✅ Ya viene completa del backend
                          alt={p.nombre_producto}
                          width="60"
                        />
                      ) : (
                        "Sin imagen"
                      )}
                    </td>
                    <td data-label="Personajes">{p.personajes}</td>
                    <td data-label="Acciones">
                      <button onClick={() => handleEdit(p)}>Editar</button>
                      <button onClick={() => handleDelete(p.producto_id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              : usuarios.map((u) => (
                  <tr key={u.id}>
                    <td data-label="ID">{u.id}</td>
                    <td data-label="Nombre">{u.nombre}</td>
                    <td data-label="Email">{u.email}</td>
                    <td data-label="Rol">{u.rol_id}</td>
                    <td data-label="Acciones">
                      <button onClick={() => handleEdit(u)}>Editar</button>
                      <button onClick={() => handleDelete(u.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
