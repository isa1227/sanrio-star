import React, { useEffect, useState } from 'react';
import '../styles/AdminPanel.css';

const AdminPanel = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [roles, setRoles] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [usuarioForm, setUsuarioForm] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    rol_id: '',
  });

  const [productoForm, setProductoForm] = useState({
    nombre_producto: '',
    descripcion: '',
    precio: '',
    categoria_id: '',
    cantidad_minima: '',
    cantidad_maxima: '',
    imagen: null,
  });

  const [editandoUsuarioId, setEditandoUsuarioId] = useState(null);
  const [editandoProductoId, setEditandoProductoId] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [resUsuarios, resProductos, resRoles, resCategorias] = await Promise.all([
        fetch('http://localhost:8000/api/usuarios'),
        fetch('http://localhost:8000/api/productos'),
        fetch('http://localhost:8000/api/roles'),
        fetch('http://localhost:8000/api/categorias'),
      ]);

      setUsuarios(await resUsuarios.json());
      setProductos(await resProductos.json());
      setRoles(await resRoles.json());
      setCategorias(await resCategorias.json());
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  };

  const handleChangeUsuario = (e) => {
    setUsuarioForm({ ...usuarioForm, [e.target.name]: e.target.value });
  };

  const handleChangeProducto = (e) => {
    const { name, value, files } = e.target;
    setProductoForm({ ...productoForm, [name]: files ? files[0] : value });
  };

  const handleSubmitUsuario = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      const method = editandoUsuarioId ? 'PUT' : 'POST';
      const url = editandoUsuarioId
        ? `http://localhost:8000/api/usuarios/${editandoUsuarioId}`
        : 'http://localhost:8000/api/usuarios';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioForm),
      });

      if (!res.ok) throw new Error('Error al guardar usuario');

      await cargarDatos();

      setUsuarioForm({ nombre: '', correo: '', contrasena: '', rol_id: '' });
      setEditandoUsuarioId(null);
    } catch (error) {
      console.error(error.message);
    } finally {
      setCargando(false);
    }
  };

  const handleSubmitProducto = async (e) => {
    e.preventDefault();
    setCargando(true);

    const formData = new FormData();
    for (const key in productoForm) {
      if (productoForm[key]) {
        formData.append(key, productoForm[key]);
      }
    }

    try {
      const method = editandoProductoId ? 'POST' : 'POST';
      const url = editandoProductoId
        ? `http://localhost:8000/api/productos/${editandoProductoId}?_method=PUT`
        : `http://localhost:8000/api/productos`;

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) throw new Error('Error al guardar producto');

      await cargarDatos();

      setProductoForm({
        nombre_producto: '',
        descripcion: '',
        precio: '',
        categoria_id: '',
        cantidad_minima: '',
        cantidad_maxima: '',
        imagen: null,
      });
      setEditandoProductoId(null);
    } catch (error) {
      console.error(error.message);
    } finally {
      setCargando(false);
    }
  };

  const handleEditarUsuario = (usuario) => {
    setUsuarioForm({
      nombre: usuario.nombre,
      correo: usuario.correo,
      contrasena: '',
      rol_id: usuario.rol_id,
    });
    setEditandoUsuarioId(usuario.usuario_id);
  };

  const handleEliminarUsuario = async (id) => {
    if (!window.confirm('¿Eliminar este usuario?')) return;
    try {
      const res = await fetch(`http://localhost:8000/api/usuarios/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Error al eliminar');
      setUsuarios(usuarios.filter(u => u.usuario_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEditarProducto = (p) => {
    setProductoForm({
      nombre_producto: p.nombre_producto,
      descripcion: p.descripcion,
      precio: p.precio,
      categoria_id: p.categoria_id,
      cantidad_minima: p.cantidad_minima,
      cantidad_maxima: p.cantidad_maxima,
      imagen: null,
    });
    setEditandoProductoId(p.producto_id);
  };

  const handleEliminarProducto = async (id) => {
    if (!window.confirm('¿Eliminar este producto?')) return;
    try {
      const res = await fetch(`http://localhost:8000/api/productos/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Error al eliminar');
      setProductos(productos.filter(p => p.producto_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>

      <section>
        <h2>Gestión de Usuarios</h2>
        <form onSubmit={handleSubmitUsuario}>
          <input name="nombre" placeholder="Nombre" value={usuarioForm.nombre} onChange={handleChangeUsuario} required />
          <input name="correo" type="email" placeholder="Correo" value={usuarioForm.correo} onChange={handleChangeUsuario} required />
          <input name="contrasena" type="password" placeholder="Contraseña" value={usuarioForm.contrasena} onChange={handleChangeUsuario} required={!editandoUsuarioId} />
          <select name="rol_id" value={usuarioForm.rol_id} onChange={handleChangeUsuario} required>
            <option value="">Selecciona un rol</option>
            {roles.map(r => (
              <option key={r.rol_id} value={r.rol_id}>{r.nombre}</option>
            ))}
          </select>
          <button type="submit" disabled={cargando}>
            {editandoUsuarioId ? 'Actualizar Usuario' : 'Crear Usuario'}
          </button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.usuario_id}>
                <td>{u.nombre}</td>
                <td>{u.correo}</td>
                <td>{roles.find(r => r.rol_id === u.rol_id)?.nombre}</td>
                <td>
                  <button onClick={() => handleEditarUsuario(u)}>Editar</button>
                  <button onClick={() => handleEliminarUsuario(u.usuario_id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Gestión de Productos</h2>
        <form onSubmit={handleSubmitProducto} encType="multipart/form-data">
          <input name="nombre_producto" placeholder="Nombre" value={productoForm.nombre_producto} onChange={handleChangeProducto} required />
          <textarea name="descripcion" placeholder="Descripción" value={productoForm.descripcion} onChange={handleChangeProducto} required />
          <input name="precio" type="number" placeholder="Precio" value={productoForm.precio} onChange={handleChangeProducto} required />
          <select name="categoria_id" value={productoForm.categoria_id} onChange={handleChangeProducto} required>
            <option value="">Selecciona una categoría</option>
            {categorias.map(c => (
              <option key={c.categoria_id} value={c.categoria_id}>{c.nombre}</option>
            ))}
          </select>
          <input name="cantidad_minima" type="number" placeholder="Cantidad mínima" value={productoForm.cantidad_minima} onChange={handleChangeProducto} required />
          <input name="cantidad_maxima" type="number" placeholder="Cantidad máxima" value={productoForm.cantidad_maxima} onChange={handleChangeProducto} required />
          <input name="imagen" type="file" accept="image/*" onChange={handleChangeProducto} />
          <button type="submit" disabled={cargando}>
            {editandoProductoId ? 'Actualizar Producto' : 'Crear Producto'}
          </button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Cant. Mín.</th>
              <th>Cant. Máx.</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.producto_id}>
                <td>{p.nombre_producto}</td>
                <td>{p.descripcion}</td>
                <td>${p.precio}</td>
                <td>{categorias.find(c => c.categoria_id === p.categoria_id)?.nombre}</td>
                <td>{p.cantidad_minima}</td>
                <td>{p.cantidad_maxima}</td>
                <td>
                  <button onClick={() => handleEditarProducto(p)}>Editar</button>
                  <button onClick={() => handleEliminarProducto(p.producto_id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminPanel;
