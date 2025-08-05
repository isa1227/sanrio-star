import { useState, useEffect } from "react";
import axios from "axios";

export default function UserForm({ selected, onSave, onCancel }) {
  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    rol_id: "",
    telefono: "",
  });

  useEffect(() => {
    if (selected) {
      setUsuario({ ...selected, password: "" }); // no mostrar password real
    }
  }, [selected]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (usuario.id) {
        // Si estás editando
        await axios.put(`http://localhost:8000/api/usuarios/${usuario.id}`, usuario);
      } else {
        // Si estás creando
        await axios.post("http://localhost:8000/api/usuarios", usuario);
      }
      onSave();
    } catch (error) {
      console.error("Error al guardar usuario:", error);
    }
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h3>{usuario.id ? "Editar Usuario" : "Crear Usuario"}</h3>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={usuario.nombre}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={usuario.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder={usuario.id ? "Nueva contraseña (opcional)" : "Contraseña"}
        value={usuario.password}
        onChange={handleChange}
        required={!usuario.id} // solo obligatoria si es nuevo
      />
      <input
        type="number"
        name="rol_id"
        placeholder="ID del rol (ej. 1 o 2)"
        value={usuario.rol_id}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="telefono"
        placeholder="Teléfono"
        value={usuario.telefono}
        onChange={handleChange}
      />
      <div className="botones-formulario">
        <button type="submit">{usuario.id ? "Actualizar" : "Crear"}</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}
