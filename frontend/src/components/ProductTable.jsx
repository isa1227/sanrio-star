import React from "react";

const ProductTable = ({ productos, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Categoría</th>
          <th>Imagen</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map(prod => (
          <tr key={prod.producto_id}>
            <td>{prod.nombre}</td>
            <td>{prod.descripcion}</td>
            <td>${prod.precio}</td>
            <td>{prod.categoria}</td>
            <td>
              {prod.imagen && <img src={`http://127.0.0.1:8000/storage/${prod.imagen}`} width="80" alt="Producto" />}
            </td>
            <td>
              <button onClick={() => onEdit(prod)}>Editar</button>
              <button onClick={() => onDelete(prod.producto_id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
