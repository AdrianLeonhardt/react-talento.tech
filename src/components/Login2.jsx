import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { loginConGoogle, loginUsuario, crearUsuario } from "../auth/firebase";

function Login2() {
  const [usuarioLogin, setUsuarioLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [usuarioReg, setUsuarioReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const { logout, user } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get("role"); // "usuario" o "admin"

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUsuario(usuarioLogin, passwordLogin); 
      navigate("/");
    } catch (error) {
      alert("Credenciales incorrectas");
      console.error(error);
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      await crearUsuario(usuarioReg, passwordReg); 
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginGoogle = async () => {
    try {
      await loginConGoogle(); 
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  if (user) {
    return (
      <div>
        <h2>Bienvenido, {user.email}</h2>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmitLogin}>
        <h2>Iniciar sesión como {role === "admin" ? "Administrador" : "Usuario"}</h2>
        <input
          type="text"
          placeholder="Email"
          value={usuarioLogin}
          onChange={(e) => setUsuarioLogin(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={passwordLogin}
          onChange={(e) => setPasswordLogin(e.target.value)}
        />
        <button type="submit">Iniciar sesión</button>
      </form>

      {role === "usuario" && (
        <>
          <form onSubmit={handleSubmitRegister}>
            <h2>Registrate</h2>
            <input
              type="text"
              placeholder="Email"
              value={usuarioReg}
              onChange={(e) => setUsuarioReg(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={passwordReg}
              onChange={(e) => setPasswordReg(e.target.value)}
            />
            <button type="submit">Registrarse</button>
          </form>

          <button onClick={handleLoginGoogle}>Iniciar sesión con Google</button>
        </>
      )}
    </div>
  );
}

export default Login2;


