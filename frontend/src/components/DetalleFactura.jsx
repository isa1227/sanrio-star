import React, { useEffect, useState } from "react";

const DetalleFactura = ({ facturaId, cerrarModal }) => {
  const [detalles, setDetalles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetalles = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/facturas/${facturaId}/detalle`);
        const data = await res.json();
        setDetalles(data); // asumimos que el backend devuelve un array de detalles
      } catch (error) {
        console.error("Error cargando detalles de factura:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetalles();
  }, [facturaId]);

  if (loading) return <p>Cargando detalles...</p>;

  return (
    <div className="modal-overlay">
      <div className="modal" style={{ padding: "20px", borderRadius: "12px", backgroundColor: "#fff" }}>
        <h2>Detalle de Factura #{facturaId}</h2>
        {detalles.length === 0 ? (
          <p>No hay productos en esta factura.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {detalles.map((d, index) => (
                <tr key={index}>
                  <td>{d.nombre || d.producto_id}</td>
                  <td>{d.cantidad}</td>
                  <td>${d.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button onClick={cerrarModal} style={{ marginTop: "15px" }}>Cerrar</button>
      </div>
    </div>
  );
};

export default DetalleFactura;

