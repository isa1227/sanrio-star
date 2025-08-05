import React from "react";

const ProductTable = ({ productos, onEdit, onDelete }) => {
  return (
    <div>
      <h2 style={{ marginBottom: "10px" }}>Lista de Productos</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.producto_id}>
              <td>{producto.producto_id}</td>
              <td>{producto.nombre_producto}</td>
              <td>{producto.descripcion}</td>
              <td>${producto.precio}</td>
              <td>
                {producto.url_imagen ? (
                  <img
                    src={producto.url_imagen}
                    alt={producto.nombre_producto}
                    width="50"
                    height="50"
                    style={{ objectFit: "cover", borderRadius: "4px" }}
                  />
                ) : (
                  "Sin imagen"
                )}
              </td>
              <td>
                <button onClick={() => onEdit(producto)}>Editar</button>
                <button onClick={() => onDelete(producto.producto_id)} style={{ marginLeft: "8px" }}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
