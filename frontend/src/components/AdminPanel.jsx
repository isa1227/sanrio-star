import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "../components/ProductForm";
import UserForm from "../components/UserForm";
import TableComponent from "../components/TableComponent";
import "../styles/AdminPanel.css";

const AdminPanel = () => {
  const [view, setView] = useState("productos");
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [selectedUsuario, setSelectedUsuario] = useState(null);

  const fetchProductos = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/productos");
      setProductos(res.data);
    } catch (err) {
      console.error("Error al obtener productos:", err);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/usuarios");
      setUsuarios(res.data);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
    }
  };

  const handleDeleteProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/productos/${id}`);
      fetchProductos();
      setSelectedProducto(null);
    } catch (err) {
      console.error("Error al eliminar producto:", err);
    }
  };

  const handleDeleteUsuario = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/usuarios/${id}`);
      fetchUsuarios();
      setSelectedUsuario(null);
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
    }
  };

  useEffect(() => {
    fetchProductos();
    fetchUsuarios();
  }, []);

  return (
    <div className="admin-panel">
      <div className="panel-switch">
        <button onClick={() => setView("productos")}>Administrar Productos</button>
        <button onClick={() => setView("usuarios")}>Administrar Usuarios</button>
      </div>

      {view === "productos" && (
        <>
          <h2>{selectedProducto ? "Editar Producto" : "Crear Producto"}</h2>
          <ProductForm
            selected={selectedProducto}
            onSave={() => {
              fetchProductos();
              setSelectedProducto(null);
            }}
            onCancel={() => setSelectedProducto(null)}
          />
          <TableComponent
            data={productos}
            columns={[
              { key: "producto_id", label: "ID" },
              { key: "nombre_producto", label: "Nombre" },
              { key: "descripcion", label: "Descripción" },
              { key: "precio", label: "Precio" },
              { key: "categoria_id", label: "Categoría" },
              { key: "url_imagen", label: "Imagen" },
            ]}
            onEdit={setSelectedProducto}
            onDelete={handleDeleteProducto}
          />
        </>
      )}

      {view === "usuarios" && (
        <>
          <h2>{selectedUsuario ? "Editar Usuario" : "Crear Usuario"}</h2>
          <UserForm
            selected={selectedUsuario}
            onSave={() => {
              fetchUsuarios();
              setSelectedUsuario(null);
            }}
            onCancel={() => setSelectedUsuario(null)}
          />
          <TableComponent
            data={usuarios}
            columns={[
              { key: "id", label: "ID" },
              { key: "nombre", label: "Nombre" },
              { key: "email", label: "Correo electrónico" },
              { key: "rol_id", label: "Rol" },
              { key: "direccion", label: "Dirección" },
              { key: "telefono", label: "Teléfono" },
            ]}
            onEdit={setSelectedUsuario}
            onDelete={handleDeleteUsuario}
          />
        </>
      )}
    </div>
  );
};

export default AdminPanel;