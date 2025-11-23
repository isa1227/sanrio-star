import { useState, useEffect } from "react";
import axios from "axios";

const UserForm = ({ selected, setSelected, refresh }) => {
  const [form, setForm] = useState({
    nombre_usuario: "",
    correo: "",
    contrasena: "",
    rol_id: "2",
  });

  useEffect(() => {
    if (selected) {
      setForm({ ...selected, contrasena: "" });
    }
  }, [selected]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selected) {
        await axios.put(

          `${import.meta.env.VITE_API_URL}/usuarios/${selected.usuario_id}`,
          form
        );
      } else {
        await axios.post(import.meta.env.VITE_API_URL + "/usuarios", form);

          `http://localhost:8000/api/usuarios/${selected.usuario_id}`,
          form
        );
      } else {
        await axios.post("http://localhost:8000/api/usuarios", form);

      }
      setForm({ nombre_usuario: "", correo: "", contrasena: "", rol_id: "2" });
      setSelected(null);
      refresh();
    } catch (err) {
      console.error("Error guardando usuario:", err);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="nombre_usuario"
        placeholder="Nombre"
        value={form.nombre_usuario}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="correo"
        placeholder="Correo"
        value={form.correo}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="contrasena"
        placeholder="Contraseña"
        value={form.contrasena}
        onChange={handleChange}
        required={!selected}
      />
      <select name="rol_id" value={form.rol_id} onChange={handleChange}>
        <option value="1">Admin</option>
        <option value="2">Cliente</option>
      </select>
      <button type="submit">{selected ? "Actualizar" : "Crear"}</button>
    </form>
  );
};

export default UserForm;

