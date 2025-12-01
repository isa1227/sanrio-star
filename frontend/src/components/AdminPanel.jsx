import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminPanel.css";
import CatList from "./CatList"; // <-- import corregido (mayúsculas según archivo)

const API_URL = "http://localhost:8000/api";
const ITEMS_PER_PAGE = 10; // 🔹 10 elementos por página

const AdminPanel = () => {
  const [view, setView] = useState("productos");
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({});
  const [editing, setEditing] = useState(null);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);

  // Modal Eliminar
  const [showModal, setShowModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  // Modal Guardar
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);

  // Búsqueda
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
    setCurrentPage(1); // 🔹 reset paginación al cambiar vista
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
  // 📌 Crear o Actualizar con Confirmación
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
      } else {
        await axios.delete(`${API_URL}/usuarios/${idToDelete}`);
        fetchUsuarios();
      }
    } catch (err) {
      console.error("Error eliminando", err.response?.data ?? err);
    }

    setShowModal(false);
    setIdToDelete(null);
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
  // 🔍 Búsqueda
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
    const fields = [u.nombre_usuario || "", u.correo || ""].join(" ").toLowerCase();
    return fields.includes(s);
  });

  // -------------------------------
  // 🔹 Paginación
  // -------------------------------
  const currentItems = view === "productos"
    ? productosFiltrados.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
    : usuariosFiltrados.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const totalPages = Math.ceil(
    (view === "productos" ? productosFiltrados.length : usuariosFiltrados.length) / ITEMS_PER_PAGE
  );

  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>

      <div className="menu">
        <button onClick={() => setView("productos")}>Productos</button>
        <button onClick={() => setView("usuarios")}>Usuarios</button>
        <button onClick={() => setView("categorias")}>Categorias</button>
      </div>

      {/* FORMULARIO */}
      <form className="formulario" onSubmit={handleSubmit}>
        {view === "productos" ? (
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
        ) : (
          <>
            <input type="text" name="nombre_usuario" placeholder="Nombre" value={form.nombre_usuario || ""} onChange={handleChange} required />
            <input type="email" name="correo" placeholder="Correo" value={form.correo || ""} onChange={handleChange} required />
            <input type="password" name="contrasena" placeholder="Contraseña" value={form.contrasena || ""} onChange={handleChange} required={!editing} />
            <input type="number" name="rol_id" placeholder="Rol" value={form.rol_id || ""} onChange={handleChange} required />
          </>
        )}

        <button type="submit">{editing ? "Actualizar" : "Crear"}</button>
        {editing && <button type="button" onClick={resetForm}>Cancelar</button>}
      </form>

      {/* BUSCADOR */}
      <div style={{ display: "flex", justifyContent: "center", margin: "12px 0" }}>
        <input
          type="text"
          placeholder={view === "productos" ? "Buscar por nombre, descripción, categoría o personaje..." : "Buscar por nombre o correo..."}
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

      {/* TABLA */}
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
            {(view === "productos" ? currentItems : currentItems).map((item) =>
              view === "productos" ? (
                <tr key={item.producto_id}>
                  <td>{item.producto_id}</td>
                  <td>{item.nombre_producto}</td>
                  <td>{item.descripcion}</td>
                  <td>${item.precio}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={item.stock}
                      onChange={(e) => {
                        const nuevoStock = e.target.value;
                        setProductos((prev) =>
                          prev.map((p) =>
                            p.producto_id === item.producto_id ? { ...p, stock: nuevoStock } : p
                          )
                        );
                      }}
                      style={{ width: "70px" }}
                    />
                  </td>
                  <td>{categoriaMap[item.categoria_id] || item.categoria_id}</td>
                  <td>{item.url_imagen ? <img src={item.url_imagen} alt={item.nombre_producto} width="60" /> : "Sin imagen"}</td>
                  <td>{item.personajes}</td>
                  <td>
                    <button onClick={() => handleEdit(item)}>Editar</button>
                    <button onClick={() => handleDelete(item.producto_id)}>Eliminar</button>
                  </td>
                </tr>
              ) : (
                <tr key={item.usuario_id}>
                  <td>{item.usuario_id}</td>
                  <td>{item.nombre_usuario}</td>
                  <td>{item.correo}</td>
                  <td>{item.rol_id}</td>
                  <td>
                    <button onClick={() => handleEdit(item)}>Editar</button>
                    <button onClick={() => handleDelete(item.usuario_id)}>Eliminar</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINACIÓN */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
            ◀ Anterior
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
            Siguiente ▶
          </button>
        </div>
      )}
      
      
    </div>
    
  );
  
};

export default AdminPanel;
