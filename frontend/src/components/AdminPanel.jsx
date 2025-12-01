import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminPanel.css";

const API_URL = "http://localhost:8000/api";

const AdminPanel = () => {
  const [view, setView] = useState("productos");
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({});
  const [editing, setEditing] = useState(null);

  // 🟣 Modal de Eliminación
  const [showModal, setShowModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  // 💾 Modal de Confirmación Guardar
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);

  // 🔍 Búsqueda
  const [query, setQuery] = useState("");

  // 🟦 PAGINACIÓN
  const [paginaProductos, setPaginaProductos] = useState(1);
  const [paginaUsuarios, setPaginaUsuarios] = useState(1);
  const porPagina = 10;

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
    if (view === "productos") fetchProductos();
    if (view === "usuarios") fetchUsuarios();
    if (view === "categorias") fetchCategorias();
  }, [view]);

  useEffect(() => {
    setQuery("");
    setPaginaProductos(1);
    setPaginaUsuarios(1);
  }, [view]);

  // -------------------------------
  // 📌 Input Change
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
  // 📌 Crear / Actualizar
  // -------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pendingSubmit) {
      setShowSaveModal(true);
      return;
    }

    setPendingSubmit(false);

    try {
      if (view === "productos") {
        const formData = new FormData();
        Object.keys(form).forEach((key) => formData.append(key, form[key]));

        if (editing) {
          formData.append("_method", "PUT");
          await axios.post(`${API_URL}/productos/${editing}`, formData);
        } else {
          await axios.post(`${API_URL}/productos`, formData);
        }

        fetchProductos();
      }

      if (view === "usuarios") {
        if (editing) {
          await axios.put(`${API_URL}/usuarios/${editing}`, form);
        } else {
          await axios.post(`${API_URL}/usuarios`, form);
        }

        fetchUsuarios();
      }

      if (view === "categorias") {
        if (editing) {
          await axios.put(`${API_URL}/categorias/${editing}`, form);
        } else {
          await axios.post(`${API_URL}/categorias`, form);
        }

        fetchCategorias();
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
    }
    if (view === "usuarios") {
      setEditing(item.usuario_id ?? item.id);
      setForm(item);
    }
    if (view === "categorias") {
      setEditing(item.categoria_id ?? item.id);
      setForm(item);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // -------------------------------
  // 🗑️ Eliminar
  // -------------------------------
  const handleDelete = (id) => {
    setIdToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      if (view === "productos") {
        await axios.delete(`${API_URL}/productos/${idToDelete}`);
        fetchProductos();
      }
      if (view === "usuarios") {
        await axios.delete(`${API_URL}/usuarios/${idToDelete}`);
        fetchUsuarios();
      }
      if (view === "categorias") {
        await axios.delete(`${API_URL}/categorias/${idToDelete}`);
        fetchCategorias();
      }
    } catch (err) {
      console.error("Error eliminando", err.response?.data ?? err);
    }

    setShowModal(false);
    setIdToDelete(null);
  };

  // -------------------------------
  // 🧩 Filtrado
  // -------------------------------
  const categoriaMap = categorias.reduce((acc, cat) => {
    acc[cat.categoria_id ?? cat.id] = cat.nombre_categoria ?? cat.nombre ?? "";
    return acc;
  }, {});

  const productosFiltrados = productos.filter((p) => {
    const s = query.toLowerCase();
    return (
      p.nombre_producto?.toLowerCase().includes(s) ||
      p.descripcion?.toLowerCase().includes(s) ||
      p.personajes?.toLowerCase().includes(s) ||
      categoriaMap[p.categoria_id]?.toLowerCase().includes(s)
    );
  });

  const usuariosFiltrados = usuarios.filter((u) => {
    const s = query.toLowerCase();
    return (
      u.nombre_usuario?.toLowerCase().includes(s) ||
      u.correo?.toLowerCase().includes(s)
    );
  });

  // -------------------------------
  // 🔢 Paginación
  // -------------------------------
  const totalPaginasProductos = Math.ceil(productosFiltrados.length / porPagina);
  const totalPaginasUsuarios = Math.ceil(usuariosFiltrados.length / porPagina);

  const productosPagina = productosFiltrados.slice(
    (paginaProductos - 1) * porPagina,
    paginaProductos * porPagina
  );

  const usuariosPagina = usuariosFiltrados.slice(
    (paginaUsuarios - 1) * porPagina,
    paginaUsuarios * porPagina
  );

  // -------------------------------
  // 🧩 Render
  // -------------------------------
  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>

      {/* Menú */}
      <div className="menu">
        <button onClick={() => setView("productos")}>Productos</button>
        <button onClick={() => setView("usuarios")}>Usuarios</button>
        <button onClick={() => setView("categorias")}>Categorias</button>
      </div>

      {/* Formulario */}
      <form className="formulario" onSubmit={handleSubmit}>
        {view === "productos" && (
          <>
            <input type="text" name="nombre_producto" placeholder="Nombre" value={form.nombre_producto || ""} onChange={handleChange} required />
            <input type="text" name="descripcion" placeholder="Descripción" value={form.descripcion || ""} onChange={handleChange} required />
            <input type="number" name="precio" placeholder="Precio" value={form.precio || ""} onChange={handleChange} required />
            <input type="number" name="stock" placeholder="Stock" value={form.stock || ""} onChange={handleChange} required />
            <select name="categoria_id" value={form.categoria_id || ""} onChange={handleChange} required>
              <option value="">Seleccione categoría</option>
              {categorias.map((cat) => (
                <option key={cat.categoria_id} value={cat.categoria_id}>
                  {cat.nombre_categoria}
                </option>
              ))}
            </select>
            <input type="text" name="personajes" placeholder="Personajes" value={form.personajes || ""} onChange={handleChange} />
            <input type="file" name="url_imagen" onChange={handleChange} />
          </>
        )}

        {view === "usuarios" && (
          <>
            <input type="text" name="nombre_usuario" placeholder="Nombre" value={form.nombre_usuario || ""} onChange={handleChange} required />
            <input type="email" name="correo" placeholder="Correo" value={form.correo || ""} onChange={handleChange} required />
            <input type="password" name="contrasena" placeholder="Contraseña" value={form.contrasena || ""} onChange={handleChange} required={!editing} />
            <input type="number" name="rol_id" placeholder="Rol" value={form.rol_id || ""} onChange={handleChange} required />
          </>
        )}

        {view === "categorias" && (
          <>
            <input type="text" name="nombre_categoria" placeholder="Nombre categoría" value={form.nombre_categoria || ""} onChange={handleChange} required />
            <textarea name="descripcion" placeholder="Descripción" value={form.descripcion || ""} onChange={handleChange} />
          </>
        )}

        <button type="submit">{editing ? "Actualizar" : "Crear"}</button>
        {editing && <button type="button" onClick={resetForm}>Cancelar</button>}
      </form>

      {/* Búsqueda */}
      <div style={{ textAlign: "center", margin: "14px 0" }}>
        <input
          type="text"
          placeholder={view === "productos" ? "Buscar productos..." : view === "usuarios" ? "Buscar usuarios..." : "Buscar categorías..."}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPaginaProductos(1);
            setPaginaUsuarios(1);
          }}
          style={{
            width: 600,
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
              {view === "productos" && (
                <>
                  <th>ID</th><th>Nombre</th><th>Descripción</th><th>Precio</th><th>Stock</th><th>Categoría</th><th>Imagen</th><th>Personajes</th><th>Acciones</th>
                </>
              )}
              {view === "usuarios" && (
                <>
                  <th>ID</th><th>Nombre</th><th>Correo</th><th>Rol</th><th>Acciones</th>
                </>
              )}
              {view === "categorias" && (
                <>
                  <th>ID</th><th>Nombre</th><th>Descripción</th><th>Acciones</th>
                </>
              )}
            </tr>
          </thead>

          <tbody>
            {view === "productos" &&
              productosPagina.map((p) => (
                <tr key={p.producto_id}>
                  <td>{p.producto_id}</td>
                  <td>{p.nombre_producto}</td>
                  <td>{p.descripcion}</td>
                  <td>${p.precio}</td>
                  <td>{p.stock}</td>
                  <td>{categoriaMap[p.categoria_id]}</td>
                  <td>{p.url_imagen ? <img src={p.url_imagen} width="65" /> : "Sin imagen"}</td>
                  <td>{p.personajes}</td>
                  <td>
                    <button onClick={() => handleEdit(p)}>Editar</button>
                    <button onClick={() => handleDelete(p.producto_id)}>Eliminar</button>
                  </td>
                </tr>
              ))
            }

            {view === "usuarios" &&
              usuariosPagina.map((u) => (
                <tr key={u.usuario_id}>
                  <td>{u.usuario_id}</td>
                  <td>{u.nombre_usuario}</td>
                  <td>{u.correo}</td>
                  <td>{u.rol_id}</td>
                  <td>
                    <button onClick={() => handleEdit(u)}>Editar</button>
                    <button onClick={() => handleDelete(u.usuario_id)}>Eliminar</button>
                  </td>
                </tr>
              ))
            }

            {view === "categorias" &&
              categorias.map((c) => (
                <tr key={c.categoria_id}>
                  <td>{c.categoria_id}</td>
                  <td>{c.nombre_categoria}</td>
                  <td>{c.descripcion}</td>
                  <td>
                    <button onClick={() => handleEdit(c)}>Editar</button>
                    <button onClick={() => handleDelete(c.categoria_id)}>Eliminar</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      {/* PAGINACIÓN */}
      {view !== "categorias" && (
        <div className="paginacion">
          {view === "productos" ? (
            <>
              <button disabled={paginaProductos === 1} onClick={() => setPaginaProductos(paginaProductos - 1)}>◀</button>
              <span>Página {paginaProductos} de {totalPaginasProductos}</span>
              <button disabled={paginaProductos === totalPaginasProductos || totalPaginasProductos === 0} onClick={() => setPaginaProductos(paginaProductos + 1)}>▶</button>
            </>
          ) : (
            <>
              <button disabled={paginaUsuarios === 1} onClick={() => setPaginaUsuarios(paginaUsuarios - 1)}>◀</button>
              <span>Página {paginaUsuarios} de {totalPaginasUsuarios}</span>
              <button disabled={paginaUsuarios === totalPaginasUsuarios || totalPaginasUsuarios === 0} onClick={() => setPaginaUsuarios(paginaUsuarios + 1)}>▶</button>
            </>
          )}
        </div>
      )}

      {/* MODAL ELIMINAR */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>¿Seguro que deseas eliminar este registro?</p>
            <div className="modal-buttons">
              <button className="btn-confirmar" onClick={confirmDelete}>Eliminar</button>
              <button className="btn-cancelar" onClick={() => setShowModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL GUARDAR */}
      {showSaveModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>¿Quieres {editing ? "actualizar" : "crear"} este registro?</p>
            <div className="modal-buttons">
              <button
                className="btn-confirmar"
                onClick={() => {
                  setPendingSubmit(true);
                  setShowSaveModal(false);
                  handleSubmit(new Event("submit"));
                }}
              >
                Sí
              </button>
              <button className="btn-cancelar" onClick={() => setShowSaveModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
