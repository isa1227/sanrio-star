import React, { useState, useEffect } from "react";
import "../styles/vistaPedido.css"; 
import fondoPedido from "../assets/img/fondovista2.jpg"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VistaPedido = () => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const usuario = JSON.parse(localStorage.getItem("usuario")) || {};
  const usuarioId = usuario.user_id || 1;

  const formatoMoneda = (valor) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(valor);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/pedidos/${usuarioId}`)
      .then((res) => setPedidos(res.data))
      .catch((err) => console.error("Error al cargar pedidos:", err));
  }, [usuarioId]);

  const handleVolver = () => navigate("/"); 

  return (
    <div 
      className="vista-pedido-container" 
      style={{ backgroundImage: `url(${fondoPedido})` }}
    >
      <h2>🖤 Mis Pedidos 🖤</h2>

      {pedidos.length === 0 && <p className="sinpedido">No tienes pedidos todavía 😢</p>}

      {pedidos.map((pedido, i) => (
        <div key={i} className="pedido-card">

          {/* Información tipo tabla */}
          <div className="info-usuario">
            <p><strong>Fecha:</strong> {new Date(pedido.created_at).toLocaleDateString()}</p>
            <p><strong>Núm. de pedido:</strong> {pedido.pedido_id}</p>
            <p><strong>Nombre:</strong> {pedido.usuario?.nombre || "No registrado"}</p>
            <p><strong>Dirección:</strong> {pedido.usuario?.direccion || "No registrada"}</p>
            <p><strong>Total:</strong> {formatoMoneda(pedido.total)}</p>
            <p><strong>Estado:</strong> {pedido.estado}</p>
          </div>

          {/* Productos comprados */}
          <div className="productos-pedido">
            {pedido.productos.map((p, j) => (
              <div key={j} className="producto-card">
                <img src={p.imagen || "/img/default.png"} alt={p.nombre} />
                <div className="producto-info">
                  <p className="nombre">{p.nombre}</p>
                  <p>Cantidad: {p.cantidad}</p>
                  <p>Total: {formatoMoneda(Number(p.precio) * Number(p.cantidad))}</p>
                </div>
              </div>
            ))}
          </div>

           {/* Botón único */}
          <div className="botones-pedido">
            <button onClick={handleVolver}>Comprar otra vez</button>
               <button onClick={() => window.print()}>Descargar factura</button>
          </div>
        </div>
      ))}
      
    </div>
  );
};

export default VistaPedido;
