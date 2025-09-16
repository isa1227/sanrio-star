import { useState } from "react";
import "../styles/ForgotPassword.css";

const ForgotPassword = () => {
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo }),
      });
      const data = await resp.json();
      setMensaje(data.mensaje || "Revisa tu correo para continuar");
    } catch (error) {
      setMensaje("❌ Error en el servidor");
    }
  };

  return (
    <div className="auth-forma">
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Tu correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <button type="submit">Enviar enlace</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default ForgotPassword;
