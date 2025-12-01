import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminPanel.css";
import CatList from "./CatList"; // <-- import corregido (mayúsculas según archivo)

const API_URL = "http://localhost:8000/api"; // <-- base correcta

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
      setProductos(res.data || []);
    } catch (err) {
      console.error("Error cargando productos", err);
      setProductos([]);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const res = await axios.get(`${API_URL}/usuarios`);
      setUsuarios(res.data || []);
    } catch (err) {
      console.error("Error cargando usuarios", err);
      setUsuarios([]);
    }
  };

  const fetchCategorias = async () => {
    try {
      const res = await axios.get(`${API_URL}/categorias`);
      setCategorias(res.data || []);
    } catch (err) {
      console.error("Error cargando categorías", err);
      setCategorias([]);
    }
  };

  useEffect(() => {
    // traer datos cuando se muestra cada vista
    if (view === "productos") fetchProductos();
    if (view === "usuarios") fetchUsuarios();
    if (view === "categorias") fetchCategorias();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  // limpiar búsqueda al cambiar de vista (mejora UX)
  useEffect(() => {
    setQuery("");
  }, [view]);

  // carga inicial de categorías (para select de productos)
  useEffect(() => {
    fetchCategorias();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categoriaMap = categorias.reduce((acc, cat) => {
    const id = cat.categoria_id ?? cat.id;
    const nombre = cat.nombre_categoria ?? cat.nombre ?? "";
    acc[id] = nombre;
    return acc;
  }, {});

  // -------------------------------
  // 📌 Manejo de formularios
  // -------------------------------
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length) {
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
          if (form[key] !== undefined && form[key] !== null) {
            formData.append(key, form[key]);
          }
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

        await fetchProductos();
      } else if (view === "usuarios") {
        if (editing) {
          await axios.put(`${API_URL}/usuarios/${editing}`, form);
        } else {
          await axios.post(`${API_URL}/usuarios`, form);
        }
        await fetchUsuarios();
      }

      resetForm();
    } catch (err) {
      console.error("Error guardando", err.response?.data ?? err);
    }
  };

  // -------------------------------
  // 📌 Editar
  // -------------------------------
  const handleEdit = (item) => {
    if (view === "productos") {
      setEditing(item.producto_id ?? item.id);
      const { url_imagen, ...rest } = item;
      setForm(rest);
    } else {
      setEditing(item.usuario_id ?? item.id);
      setForm(item);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      console.error("Error eliminando", err.response?.data ?? err);
    }
  };

  // -------------------------------
  // 📦 Actualizar STOCK directo en tabla
  // -------------------------------
  const handleStockChange = async (id, nuevoStockRaw) => {
    try {
      const nuevoStock = Number(nuevoStockRaw);
      if (Number.isNaN(nuevoStock) || nuevoStock < 0) return;

      setProductos((prev) =>
        prev.map((p) =>
          (p.producto_id ?? p.id) === id ? { ...p, stock: nuevoStock } : p
        )
      );

      const prod = productos.find((p) => (p.producto_id ?? p.id) === id);
      if (!prod) return;

      await axios.put(`${API_URL}/productos/${id}`, {
        nombre_producto: prod.nombre_producto ?? prod.nombre,
        descripcion: prod.descripcion ?? "",
        precio: prod.precio ?? prod.valor ?? 0,
        categoria_id: prod.categoria_id ?? prod.categoria_id,
        personajes: prod.personajes ?? "",
        stock: nuevoStock,
      });
    } catch (err) {
      console.error("Error actualizando stock", err.response?.data ?? err);
    }
  };

  // -------------------------------
  // 🧩 Filtrado (buscador integrado)
  // -------------------------------
  const productosFiltrados = productos.filter((p) => {
    if (!query) return true;
    const s = query.toLowerCase();
    const fields = [
      p.nombre_producto ?? p.nombre ?? "",
      p.descripcion ?? "",
      p.personajes ?? "",
      categoriaMap[p.categoria_id ?? p.categoria_id] ?? ""
    ]
      .join(" ")
      .toLowerCase();
    return fields.includes(s);
  });

  const usuariosFiltrados = usuarios.filter((u) => {
    if (!query) return true;
    const s = query.toLowerCase();
    const fields = [u.nombre_usuario ?? u.nombre ?? "", u.correo ?? u.email ?? ""]
      .join(" ")
      .toLowerCase();
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
        <button onClick={() => setView("categorias")}>Categorias</button>
      </div>

      {/* Si la vista es categorias, renderizamos el componente especializado */}
      {view === "categorias" ? (
        <div style={{ marginTop: 16 }}>
          <CatList />
        </div>
      ) : (
        <>
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
                  value={form.precio ?? ""}
                  onChange={handleChange}
                  required
                />
                <input
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={form.stock ?? ""}
                  onChange={handleChange}
                  required
                />

                <select
                  name="categoria_id"
                  value={form.categoria_id ?? ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione categoría</option>
                  {categorias.map((cat) => (
                    <option key={cat.categoria_id ?? cat.id} value={cat.categoria_id ?? cat.id}>
                      {cat.nombre_categoria ?? cat.nombre} (ID: {cat.categoria_id ?? cat.id})
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
                  value={form.rol_id ?? ""}
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
                      <tr key={p.producto_id ?? p.id}>
                        <td>{p.producto_id ?? p.id}</td>
                        <td>{p.nombre_producto ?? p.nombre}</td>
                        <td>{p.descripcion}</td>
                        <td>${p.precio}</td>
                        <td>
                          <input
                            type="number"
                            min="0"
                            value={p.stock}
                            onChange={(e) =>
                              handleStockChange(p.producto_id ?? p.id, e.target.value)
                            }
                            style={{ width: "70px" }}
                          />
                        </td>
                        <td>{categoriaMap[p.categoria_id ?? p.categoria_id] ?? (p.categoria_id ?? "-")}</td>
                        <td>
                          {p.url_imagen ? (
                            <img src={p.url_imagen} alt={p.nombre_producto ?? p.nombre} width="60" />
                          ) : (
                            "Sin imagen"
                          )}
                        </td>
                        <td>{p.personajes}</td>
                        <td>
                          <button onClick={() => handleEdit(p)}>Editar</button>
                          <button onClick={() => handleDelete(p.producto_id ?? p.id)}>
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))
                  : usuariosFiltrados.map((u) => (
                      <tr key={u.usuario_id ?? u.id}>
                        <td>{u.usuario_id ?? u.id}</td>
                        <td>{u.nombre_usuario ?? u.nombre}</td>
                        <td>{u.correo ?? u.email}</td>
                        <td>{u.rol_id ?? u.role_id}</td>
                        <td>
                          <button onClick={() => handleEdit(u)}>Editar</button>
                          <button onClick={() => handleDelete(u.usuario_id ?? u.id)}>
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </>
      )}

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
