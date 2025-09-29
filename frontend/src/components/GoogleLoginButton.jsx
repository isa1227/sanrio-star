import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function GoogleButton() {
  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/auth/google", {
        token: credentialResponse.credential,
      });
      
      // Guardar token en localStorage para mantener sesión
      localStorage.setItem("token", res.data.token);
      console.log("Usuario autenticado:", res.data.user);
      
      // Redirigir si quieres
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Error Google login:", err);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log("Error al iniciar sesión con Google")}
    />
  );
}

export default GoogleButton;
