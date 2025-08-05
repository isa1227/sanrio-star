import React from "react";

const UserTable = ({ usuarios, onEdit, onDelete }) => {
  return (
    <div>
      <h2 style={{ marginBottom: "10px" }}>Lista de Usuarios</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol ID</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.usuario_id}>
              <td>{usuario.usuario_id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>{usuario.rol_id}</td>
              <td>
                {usuario.url_imagen ? (
                  <img
                    src={usuario.url_imagen}
                    alt={usuario.nombre}
                    width="50"
                    height="50"
                    style={{ objectFit: "cover", borderRadius: "4px" }}
                  />
                ) : (
                  "Sin imagen"
                )}
              </td>
              <td>
                <button onClick={() => onEdit(usuario)}>Editar</button>
                <button onClick={() => onDelete(usuario.usuario_id)} style={{ marginLeft: "8px" }}>
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

export default UserTable;
