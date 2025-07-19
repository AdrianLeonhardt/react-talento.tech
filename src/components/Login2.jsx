import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { loginConGoogle, loginUsuario, crearUsuario } from "../auth/firebase";
import { toast } from "react-toastify";

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
      toast.success("Inicio de sesión exitoso");
      navigate("/");
    } catch (error) {
      toast.error("Credenciales incorrectas");
      console.error(error);
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      await crearUsuario(usuarioReg, passwordReg);
      toast.success("Usuario registrado correctamente");
      navigate("/");
    } catch (error) {
      toast.error("Error al registrar el usuario");
      console.error(error);
    }
  };

  const handleLoginGoogle = async () => {
    try {
      await loginConGoogle();
      toast.success("Inicio de sesión con Google exitoso");
      navigate("/");
    } catch (error) {
      toast.error("Error al iniciar sesión con Google");
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.info("Sesión cerrada");
      setTimeout(() => {
        navigate("/home");
      }, 500);
    } catch (error) {
      toast.error("Error al cerrar sesión");
      console.error("Error en logout:", error);
    }
  };

  if (user) {
    return (
      <div className="container mt-5 text-center">
        <h2>Bienvenido, {user.email}</h2>
        <button
          onClick={handleLogout}
          className="btn btn-danger mt-3"
        >
          Cerrar Sesión
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      {/* Card para Login */}
      <div className="card shadow-lg p-4 rounded" style={{ width: '100%', maxWidth: '400px' }}>
        <form onSubmit={handleSubmitLogin}>
          <h2 className="text-center mb-4">
            Iniciar sesión como {role === "admin" ? "Administrador" : "Usuario"}
          </h2>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={usuarioLogin}
              onChange={(e) => setUsuarioLogin(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              value={passwordLogin}
              onChange={(e) => setPasswordLogin(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Iniciar sesión
          </button>
        </form>

        {/* Google Login Card */}
        {role === "usuario" && (
          <div className="d-flex justify-content-center mb-3">
            <button
              onClick={handleLoginGoogle}
              className="btn btn-light d-flex align-items-center justify-content-center border w-100"
              style={{ borderRadius: '8px' }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google.png"
                alt="Google Logo"
                width="20"
                className="me-2"
              />
              <span>Iniciar sesión con Google</span>
            </button>
          </div>
        )}

        {/* Formulario de Registro */}
        {role === "usuario" && (
          <>
            <form onSubmit={handleSubmitRegister} className="mt-4">
              <h2 className="mb-4 text-center">Registrate</h2>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={usuarioReg}
                  onChange={(e) => setUsuarioReg(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  value={passwordReg}
                  onChange={(e) => setPasswordReg(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success w-100">
                Registrarse
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Login2;


