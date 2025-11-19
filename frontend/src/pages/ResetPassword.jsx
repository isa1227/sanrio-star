import { useParams } from "react-router-dom";
import { useState } from "react";
import "../styles/ResetPassword.css";


function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(import.meta.env.VITE_API_URL + "/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, contrasena: password }),
    });

    const data = await res.json();
    console.log(data);
    alert(data.mensaje || data.error);
  };

  return (
    <form onSubmit={handleSubmit} className="reset-form">
  <h2>Restablecer contraseña</h2>
  <input
    type="password"
    placeholder="Nueva contraseña"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <button type="submit">Guardar</button>
</form>
  );
}

export default ResetPassword;
