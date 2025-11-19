import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminPanel.css";

const API_URL = import.meta.env.VITE_API_URL;

const AdminPanel = () => {
  const [view, setView] = useState("productos");
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({});
  const [editing, setEditing] = useState(null);

  // ---- Estado para la búsqueda (integrado) ----
  const [query, setQuery] = useState("");

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

  const fetchCategorias = async () => {
    try {
      const res = await axios.get(`${API_URL}/categorias`);
      setCategorias(res.data);
    } catch (err) {
      console.error("Error cargando categorías", err);
    }
  };

  useEffect(() => {
    if (view === "productos") fetchProductos();
    if (view === "usuarios") fetchUsuarios();
  }, [view]);

  // limpiar búsqueda al cambiar de vista (mejora UX)
  useEffect(() => {
    setQuery("");
  }, [view]);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const categoriaMap = categorias.reduce((acc, cat) => {
    acc[cat.categoria_id] = cat.nombre_categoria;
    return acc;
  }, {});

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
  // 📌 Crear o actualizar productos / usuarios
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
          formData.append("_method", "PUT");
          await axios.post(`${API_URL}/productos/${editing}`, formData, {
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
    if (view === "productos") {
      setEditing(item.producto_id);
      const { url_imagen, ...rest } = item;
      setForm(rest);
    } else {
      setEditing(item.usuario_id);
      setForm(item);
    }
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

  // -------------------------------
  // 📦 Actualizar STOCK directo en tabla
  // -------------------------------
  const handleStockChange = async (id, nuevoStock) => {
    try {
      // Validar que sea número
      if (isNaN(nuevoStock) || nuevoStock < 0) return;

      // Actualiza el estado local
      setProductos((prev) =>
        prev.map((p) =>
          p.producto_id === id ? { ...p, stock: nuevoStock } : p
        )
      );

      // Llamar al backend (PUT)
      await axios.put(`${API_URL}/productos/${id}`, {
        stock: nuevoStock,
        nombre_producto: productos.find((p) => p.producto_id === id)
          .nombre_producto,
        descripcion: productos.find((p) => p.producto_id === id).descripcion,
        precio: productos.find((p) => p.producto_id === id).precio,
        categoria_id: productos.find((p) => p.producto_id === id).categoria_id,
        personajes: productos.find((p) => p.producto_id === id).personajes,
      });
    } catch (err) {
      console.error("Error actualizando stock", err);
    }
  };

  // -------------------------------
  // 🧩 Filtrado (buscador integrado)
  // -------------------------------
  const productosFiltrados = productos.filter((p) => {
    if (!query) return true;
    const s = query.toLowerCase();
    const fields = [
      p.nombre_producto || "",
      p.descripcion || "",
      p.personajes || "",
      categoriaMap[p.categoria_id] || ""
    ].join(" ").toLowerCase();
    return fields.includes(s);
  });

  const usuariosFiltrados = usuarios.filter((u) => {
    if (!query) return true;
    const s = query.toLowerCase();
    const fields = [
      u.nombre_usuario || "",
      u.correo || ""
    ].join(" ").toLowerCase();
    return fields.includes(s);
  });

  // -------------------------------
  // 🧩 Render
  // -------------------------------
  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>

      <div className="menu">
        <button onClick={() => setView("productos")}>Productos</button>
        <button onClick={() => setView("usuarios")}>Usuarios</button>
      </div>

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
              name="stock"
              placeholder="Stock"
              value={form.stock || ""}
              onChange={handleChange}
              required
            />

            <select
              name="categoria_id"
              value={form.categoria_id || ""}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione categoría</option>
              {categorias.map((cat) => (
                <option key={cat.categoria_id} value={cat.categoria_id}>
                  {cat.nombre_categoria} (ID: {cat.categoria_id})
                </option>
              ))}
            </select>

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
              name="nombre_usuario"
              placeholder="Nombre"
              value={form.nombre_usuario || ""}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="correo"
              placeholder="Correo"
              value={form.correo || ""}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="contrasena"
              placeholder="Contraseña"
              value={form.contrasena || ""}
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
        {editing && (
          <button type="button" onClick={resetForm}>
            Cancelar
          </button>
        )}
      </form>

      {/* Input de búsqueda integrado */}
      <div style={{ display: "flex", justifyContent: "center", margin: "12px 0" }}>
        <input
          type="text"
          placeholder={
            view === "productos"
              ? "Buscar por nombre, descripción, categoría o personaje..."
              : "Buscar por nombre o correo..."
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: 640,
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #444",
            background: "#111",
            color: "#eee"
          }}
        />
      </div>

      {/* Tabla */}
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
                  <th>Stock</th>
                  <th>Categoría</th>
                  <th>Imagen</th>
                  <th>Personajes</th>
                  <th>Acciones</th>
                </>
              ) : (
                <>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {view === "productos"
              ? productosFiltrados.map((p) => (
                  <tr key={p.producto_id}>
                    <td>{p.producto_id}</td>
                    <td>{p.nombre_producto}</td>
                    <td>{p.descripcion}</td>
                    <td>${p.precio}</td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        value={p.stock}
                        onChange={(e) =>
                          handleStockChange(p.producto_id, e.target.value)
                        }
                        style={{ width: "70px" }}
                      />
                    </td>
                    <td>{categoriaMap[p.categoria_id] || p.categoria_id}</td>
                    <td>
                      {p.url_imagen ? (
                        <img src={p.url_imagen} alt={p.nombre_producto} width="60" />
                      ) : (
                        "Sin imagen"
                      )}
                    </td>
                    <td>{p.personajes}</td>
                    <td>
                      <button onClick={() => handleEdit(p)}>Editar</button>
                      <button onClick={() => handleDelete(p.producto_id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              : usuariosFiltrados.map((u) => (
                  <tr key={u.usuario_id}>
                    <td>{u.usuario_id}</td>
                    <td>{u.nombre_usuario}</td>
                    <td>{u.correo}</td>
                    <td>{u.rol_id}</td>
                    <td>
                      <button onClick={() => handleEdit(u)}>Editar</button>
                      <button onClick={() => handleDelete(u.usuario_id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      <button
        className="scroll-top-btn-general"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ⭐
      </button>
    </div>
  );
};

export default AdminPanel;
