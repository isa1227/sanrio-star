import axios from "axios";

const TableComponent = ({ data, type, setSelected, refresh }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://http://localhost:8000/api/${type}/${id}`);
      refresh();
    } catch (err) {
      console.error("Error eliminando:", err);
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          {data.length > 0 &&
            Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item[`${type === "productos" ? "producto_id" : "usuario_id"}`]}>
            {Object.values(item).map((val, i) => (
              <td key={i}>
                {typeof val === "string" && val.includes(".jpg") ? (
                  <img
                    src={`http://localhost:8000/storage/${val}`}
                    alt="preview"
                    width="60"
                  />
                ) : (
                  val
                )}
              </td>
            ))}
            <td>
              <button onClick={() => setSelected(item)}>✏️ Editar</button>
              <button
                onClick={() =>
                  handleDelete(
                    item[`${type === "productos" ? "producto_id" : "usuario_id"}`]
                  )
                }
              >
                🗑️ Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
