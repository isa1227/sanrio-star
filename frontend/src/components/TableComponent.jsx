import React from "react";
import "../styles/AdminPanel.css";

const TableComponent = ({ data, columns, onEdit, onDelete }) => {
  return (
    <table className="custom-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.producto_id || item.id}>
            {columns.map((col) => (
              <td key={`${col.key}-${item.producto_id || item.id}`}>
                {item[col.key]}
              </td>
            ))}
            <td>
              <button onClick={() => onEdit(item)}>✏️</button>
              <button
                onClick={() =>
                  onDelete(item.producto_id || item.id)
                }
              >
                🗑️
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
