import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import loginImage from "../assets/img/login.jpg";
import logoImage from "../assets/img/logo.PNG";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [formData, setFormData] = useState({
    nombre_usuario: "",
    correo: "",
    contrasena: "",
  });
  const [validations, setValidations] = useState({});
  const [showPassword, setShowPassword] = useState(false); // 👈 estado para ver/ocultar

  const navigate = useNavigate();

  useEffect(() => {
    const mensajeLogout = localStorage.getItem("mensajeLogout");
    if (mensajeLogout) {
      setMensaje(mensajeLogout);
      localStorage.removeItem("mensajeLogout");

      const timer = setTimeout(() => setMensaje(""), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const API_URL = import.meta.env.VITE_API_URL;

  // Validaciones locales
  const validateField = (name, value) => {
    let message = "";
    let isValid = true;

    if (name === "nombre_usuario" && !isLogin) {
      if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value)) {
        message = "Solo se permiten letras y espacios";
        isValid = false;
      } else {
        message = "Nombre válido";
      }
    }

    if (name === "correo") {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(value)) {
        message = "Correo no válido";
        isValid = false;
      } else {
        message = "Correo válido";
      }
    }

    if (name === "contrasena") {
      const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
      if (!regex.test(value)) {
        message =
          "Debe tener mínimo 6 caracteres, un número y un símbolo especial";
        isValid = false;
      } else {
        message = "Contraseña válida";
      }
    }

    setValidations((prev) => ({ ...prev, [name]: { message, isValid } }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasErrors = Object.values(validations).some(
      (val) => val && val.isValid === false
    );
    if (hasErrors) {
      alert("Corrige los errores antes de continuar");
      return;
    }

    const endpoint = isLogin ? `${API_URL}/login` : `${API_URL}/register`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Respuesta backend:", data);

      if (!response.ok) {
        if (response.status === 422 && typeof data === "object") {
          const mensajes = Object.values(data).flat().join("\n");
          alert("❌ Errores de validación:\n" + mensajes);
        } else {
          alert(data.error || data.mensaje || "Ocurrió un error");
        }
        return;
      }

      if (isLogin) {
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        localStorage.setItem("mensajeAuth", "✅ Inicio de sesión exitoso");
        navigate("/productos");
      } else {
        alert("✅ Registro exitoso");
        setIsLogin(true);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error al conectar con el servidor");
    }
  };

  return (
    <div className="auth-container">
      <div
        className="auth-image"
        style={{
          backgroundImage: `url(${loginImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <div className="auth-form">
        <h2>{isLogin ? "Iniciar Sesión" : "Registrarse"}</h2>

        {mensaje && <p className="mensaje-auth">{mensaje}</p>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                name="nombre_usuario"
                placeholder="Nombre completo"
                value={formData.nombre_usuario}
                onChange={handleChange}
                required
              />
              {validations.nombre_usuario && (
                <p
                  className={
                    validations.nombre_usuario.isValid ? "success" : "error"
                  }
                >
                  {validations.nombre_usuario.message}
                </p>
              )}
            </>
          )}

          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={formData.correo}
            onChange={handleChange}
            required
          />
          {validations.correo && (
            <p className={validations.correo.isValid ? "success" : "error"}>
              {validations.correo.message}
            </p>
          )}

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="contrasena"
              placeholder="Contraseña"
              value={formData.contrasena}
              onChange={handleChange}
              required
            />
          </div>

          {validations.contrasena && (
            <p className={validations.contrasena.isValid ? "success" : "error"}>
              {validations.contrasena.message}
            </p>
          )}

          <button type="submit">{isLogin ? "Ingresar" : "Crear cuenta"}</button>
        </form>

        <p className="toggle-text">
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
          <button
            className="toggle-button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Regístrate" : "Inicia sesión"}
          </button>
        </p>

        {isLogin && (
          <p className="forgot-password">
            <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
          </p>
        )}

        <Link to="/" className="back-button">
          <img src={logoImage} alt="Volver a inicio" />
        </Link>
      </div>
    </div>
  );
};

export default Auth;
