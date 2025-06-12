import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminPanel.css';

const AdminPanel = () => {
  const navigate = useNavigate();
  const usuarioLogueado = JSON.parse(localStorage.getItem("usuario"));

  const [usuarios, setUsuarios] = useState([]);
  const [usuarioForm, setUsuarioForm] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    rol_id: '',
    imagen: null,
  });
  const [productos, setProductos] = useState([]);
  const [productoForm, setProductoForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    imagen: null,
  });
  const [roles, setRoles] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (!usuarioLogueado || usuarioLogueado.rol_id !== 2) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/api/usuarios')
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error("Error al cargar usuarios:", err));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/api/roles')
      .then(res => res.json())
      .then(data => setRoles(data))
      .catch(err => console.error("Error al cargar roles:", err));

    fetch('http://localhost:8000/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error("Error al cargar productos:", err));
  }, []);

  const handleUsuarioChange = (e) => {
    const { name, value, files } = e.target;
    setUsuarioForm({
      ...usuarioForm,
      [name]: files ? files[0] : value,
    });
  };

  const handleProductoChange = (e) => {
    const { name, value, files } = e.target;
    setProductoForm({
      ...productoForm,
      [name]: files ? files[0] : value,
    });
  };

  const handleUsuarioSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    const formData = new FormData();
    for (const key in usuarioForm) {
      formData.append(key, usuarioForm[key]);
    }

    try {
      const res = await fetch('http://localhost:8000/api/usuarios', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Error al crear usuario');

      const nuevoUsuario = await res.json();
      setUsuarios([...usuarios, nuevoUsuario]);
      setUsuarioForm({ nombre: '', correo: '', contrasena: '', rol_id: '', imagen: null });
    } catch (error) {
      console.error(error.message);
    } finally {
      setCargando(false);
    }
  };

  const handleProductoSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    const formData = new FormData();
    for (const key in productoForm) {
      formData.append(key, productoForm[key]);
    }

    try {
      const res = await fetch('http://localhost:8000/api/productos', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Error al crear producto');

      const nuevoProducto = await res.json();
      setProductos([...productos, nuevoProducto]);
      setProductoForm({ nombre: '', descripcion: '', precio: '', categoria: '', imagen: null });
    } catch (error) {
      console.error(error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>

      <h2>Crear Usuario</h2>
      <form onSubmit={handleUsuarioSubmit} encType="multipart/form-data">
        <input type="text" name="nombre" placeholder="Nombre" value={usuarioForm.nombre} onChange={handleUsuarioChange} required />
        <input type="email" name="correo" placeholder="Correo" value={usuarioForm.correo} onChange={handleUsuarioChange} required />
        <input type="password" name="contrasena" placeholder="Contraseña" value={usuarioForm.contrasena} onChange={handleUsuarioChange} required />
        <select name="rol_id" value={usuarioForm.rol_id} onChange={handleUsuarioChange} required>
          <option value="">Seleccione un rol</option>
          {roles.map((rol) => (
            <option key={rol.rol_id} value={rol.rol_id}>{rol.nombre_rol}</option>
          ))}
        </select>
        <input type="file" name="imagen" onChange={handleUsuarioChange} />
        <button type="submit" disabled={cargando}>{cargando ? 'Guardando...' : 'Crear Usuario'}</button>
      </form>

      <h2>Crear Producto</h2>
      <form onSubmit={handleProductoSubmit} encType="multipart/form-data">
        <input type="text" name="nombre" placeholder="Nombre del producto" value={productoForm.nombre} onChange={handleProductoChange} required />
        <textarea name="descripcion" placeholder="Descripción" value={productoForm.descripcion} onChange={handleProductoChange} required />
        <input type="number" name="precio" placeholder="Precio" value={productoForm.precio} onChange={handleProductoChange} required />
        <input type="text" name="categoria" placeholder="Categoría" value={productoForm.categoria} onChange={handleProductoChange} required />
        <input type="file" name="imagen" onChange={handleProductoChange} />
        <button type="submit" disabled={cargando}>{cargando ? 'Guardando...' : 'Crear Producto'}</button>
      </form>

      <h2>Usuarios Registrados</h2>
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

      <h2>Productos Registrados</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoría</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.producto_id}>
              <td>{p.nombre}</td>
              <td>{p.descripcion}</td>
              <td>${p.precio}</td>
              <td>{p.categoria}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;