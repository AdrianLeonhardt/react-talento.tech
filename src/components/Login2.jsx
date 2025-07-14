import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { loginConGoogle, loginUsuario, crearUsuario } from "../auth/firebase";

function Login2() {
    // Estados para inputs de login
    const [usuarioLogin, setUsuarioLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");

    // Estados para inputs de registro
    const [usuarioReg, setUsuarioReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    // Contexto de autenticación para manejar usuario y funciones de login/logout
    const { login, logout, user } = useAuthContext();

    // Hook para redirigir páginas (react-router-dom)
    const navigate = useNavigate();

    // Función para manejar el login:
    // - Previene el envío por defecto del formulario
    // - Intenta iniciar sesión con Firebase usando email y contraseña
    // - Si es exitoso, actualiza el contexto y redirige a la home
    // - Si falla, muestra alerta de credenciales incorrectas
    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        try {
            await loginUsuario(usuarioLogin, passwordLogin);
            login(usuarioLogin);
            navigate("/");
        } catch (error) {
            alert("Credenciales incorrectas");
            console.error(error);
        }
    };

    // Función para manejar el registro:
    // - Previene el envío por defecto del formulario
    // - Intenta crear usuario en Firebase con email y contraseña
    // - Si es exitoso, actualiza el contexto y redirige a la home
    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        try {
            await crearUsuario(usuarioReg, passwordReg);
            login(usuarioReg);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    // Funcion para iniciar sesión con Google:
    const handleLoginGoogle = async () => {
    try {
      await loginConGoogle();
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };


    // Función para cerrar sesión:
    // - Llama a logout en el contexto para limpiar estado de usuario
    // - Redirige al login
    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    // Si hay usuario logueado, muestra bienvenida y botón de cerrar sesión
    if (user) {
        return (
            <div>
                <h2>Bienvenido, {user ? user.email : 'Invitado'}</h2>

                <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>
        );
    }

    // Si no hay usuario logueado, muestra formularios de login y registro
    return (
        <div>
            {/* Formulario Login */}
            <form onSubmit={handleSubmitLogin}>
                <h2>Iniciar sesión</h2>
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

            {/* Formulario Registro */}
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

            {/* Inicio de Sesion con Google */}
            <button onClick={handleLoginGoogle}>Iniciar sesión con Google</button>
        </div>
    );
}

export default Login2;
