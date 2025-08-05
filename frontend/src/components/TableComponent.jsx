export default function TableComponent({ data, onEdit, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(data[0] || {}).map((key) => (
            <th key={key}>{key}</th>
          ))}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.producto_id || item.id}>
            {Object.entries(item).map(([key, value]) => (
              <td key={key}>{value}</td>
            ))}
            <td>
              <button onClick={() => onEdit(item)}>✏️</button>
              <button onClick={() => onDelete(item.producto_id || item.id)}>🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
