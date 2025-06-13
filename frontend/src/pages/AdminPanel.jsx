import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminPanel.css';

const AdminPanel = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [usuarios, setUsuarios] = useState([]);
  const [usuarioForm, setUsuarioForm] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    rol_id: '',
  });
  const [roles, setRoles] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productoForm, setProductoForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    imagen: '',
  });
  const [cargando, setCargando] = useState(false);

  // Protección: Solo administradores pueden entrar
  useEffect(() => {
    if (!usuario || usuario.rol_id !== 2) {
      navigate("/");
    }
  }, []);

  // Cargar usuarios
  useEffect(() => {
    fetch('http://localhost:8000/api/usuarios')
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error("Error al cargar usuarios:", err));
  }, []);

  // Cargar roles
  useEffect(() => {
    fetch('http://localhost:8000/api/roles')
      .then(res => res.json())
      .then(data => setRoles(data))
      .catch(err => console.error("Error al cargar roles:", err));
  }, []);

  // Cargar productos
  useEffect(() => {
    fetch('http://localhost:8000/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error("Error al cargar productos:", err));
  }, []);

  // Manejo de cambios en el formulario de usuarios
  const handleChangeUsuario = (e) => {
    setUsuarioForm({
      ...usuarioForm,
      [e.target.name]: e.target.value,
    });
  };

  // Manejo de cambios en el formulario de productos
  const handleChangeProducto = (e) => {
    setProductoForm({
      ...productoForm,
      [e.target.name]: e.target.value,
    });
  };

  // Crear usuario
  const handleSubmitUsuario = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      const res = await fetch('http://localhost:8000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioForm),
      });

      if (!res.ok) throw new Error('Error al crear usuario');

      const nuevoUsuario = await res.json();
      setUsuarios([...usuarios, nuevoUsuario]);

      setUsuarioForm({ nombre: '', correo: '', contrasena: '', rol_id: '' });
    } catch (error) {
      console.error(error.message);
    } finally {
      setCargando(false);
    }
  };

  // Crear producto
  const handleSubmitProducto = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      const res = await fetch('http://localhost:8000/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoForm),
      });

      if (!res.ok) throw new Error('Error al crear producto');

      const nuevoProducto = await res.json();
      setProductos([...productos, nuevoProducto]);

      setProductoForm({ nombre: '', descripcion: '', precio: '', categoria: '', imagen: '' });
    } catch (error) {
      console.error(error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>

      {/* Formulario de usuario */}
      <h2>Crear Usuario</h2>
      <form onSubmit={handleSubmitUsuario}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={usuarioForm.nombre}
          onChange={handleChangeUsuario}
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={usuarioForm.correo}
          onChange={handleChangeUsuario}
          required
        />
        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          value={usuarioForm.contrasena}
          onChange={handleChangeUsuario}
          required
        />
        <select name="rol_id" value={usuarioForm.rol_id} onChange={handleChangeUsuario} required>
          <option value="">Seleccione un rol</option>
          {roles.map((rol) => (
            <option key={rol.rol_id} value={rol.rol_id}>
              {rol.nombre_rol}
            </option>
          ))}
        </select>

        <button type="submit" disabled={cargando}>
          {cargando ? 'Guardando...' : 'Crear Usuario'}
        </button>
      </form>

      {/* Tabla de usuarios */}
      <h2>Lista de Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.usuario_id}>
              <td>{u.nombre}</td>
              <td>{u.correo}</td>
              <td>{roles.find(r => r.rol_id === u.rol_id)?.nombre_rol || 'Sin rol'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario de producto */}
      <h2>Crear Producto</h2>
      <form onSubmit={handleSubmitProducto}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del producto"
          value={productoForm.nombre}
          onChange={handleChangeProducto}
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={productoForm.descripcion}
          onChange={handleChangeProducto}
          required
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={productoForm.precio}
          onChange={handleChangeProducto}
          required
        />
        <input
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={productoForm.categoria}
          onChange={handleChangeProducto}
          required
        />
        <input
          type="text"
          name="imagen"
          placeholder="URL de la imagen"
          value={productoForm.imagen}
          onChange={handleChangeProducto}
          required
        />
        <button type="submit" disabled={cargando}>
          {cargando ? 'Guardando...' : 'Crear Producto'}
        </button>
      </form>

      {/* Tabla de productos */}
      <h2>Lista de Productos</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.producto_id}>
              <td>{p.nombre}</td>
              <td>{p.descripcion}</td>
              <td>${p.precio}</td>
              <td>{p.categoria}</td>
              <td><img src={p.imagen} alt={p.nombre} width="50" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
