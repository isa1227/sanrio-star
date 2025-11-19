import { useState, useEffect } from "react";
import axios from "axios";

export default function UsuarioList() {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchUsuarios();
    fetchRoles();
  }, []);

  const fetchUsuarios = async () => {
    const res = await axios.get(`${API_URL}/usuarios`);
    setUsuarios(res.data);
  };

  const fetchRoles = async () => {
    const res = await axios.get(`${API_URL}/roles`);
    setRoles(res.data);
  };

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Usuario</th>
            <th>Correo</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id_usuario}>
              <td>{u.id_usuario}</td>
              <td>{u.nombre_usuario}</td>
              <td>{u.correo}</td>
              <td>{u.rol?.nombre_rol || "Sin rol"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
