import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      // si quieres, puedes también llamar al backend para traer los datos del usuario
      navigate("/productos"); // 👈 cámbialo a donde quieras que aterrice
    } else {
      navigate("/auth");
    }
  }, [navigate]);

  return <p>Procesando autenticación...</p>;
}

export default AuthCallback;
//api