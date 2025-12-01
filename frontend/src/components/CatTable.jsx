// src/components/CatTable.jsx
import React from "react";

export default function CatTable({ categorias = [], onEdit, onDelete }) {
  return (
    <div className="cat-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Ult. actualización</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: 12 }}>
                No hay categorías
              </td>
            </tr>
          ) : (
            categorias.map((c) => {
              const id = c.categoria_id ?? c.id;
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{c.nombre_categoria}</td>
                  <td
                    style={{
                      maxWidth: 320,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {c.descripcion ?? ""}
                  </td>
                  <td>{c.ultima_actualizacion ?? "-"}</td>
                  <td>
                    <button onClick={() => onEdit(c)}>Editar</button>
                    <button onClick={() => onDelete(id)}>Eliminar</button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
