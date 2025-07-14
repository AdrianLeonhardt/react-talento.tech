import { useLocation, useNavigate } from "react-router-dom";
/* eslint-disable react/prop-types */

export default function Login({ setLogeadoUser, setLogeadoAdmin, user, admin }) {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const role = params.get("role"); // "usuario", "admin", o null


  function manejarUser() {
    setLogeadoUser();
    if (!user) {
      navigate("/usuario");
    } else {
      navigate("/login");
    }
  }

  function manejarAdmin() {
    setLogeadoAdmin();
    if (!admin) {
      navigate("/admin");
    } else {
      navigate("/login");
    }
  }

  return (
    <div>
      {role === "usuario" && (
        <div className="d-flex justify-content-center mt-5">
          <button
            onClick={manejarUser}
            className={`btn ${user ? "btn-danger" : "btn-primary"}`}
          >
            {user ? "Cerrar sesión" : "Iniciar sesión Usuario"}
          </button>
        </div>
      )}

      {role === "admin" && (
        <div className="d-flex justify-content-center mt-5">
          <button
            onClick={manejarAdmin}
            className={`btn ${admin ? "btn-danger" : "btn-primary"}`}
          >
            {admin ? "Cerrar sesión Admin" : "Iniciar sesión Admin"}
          </button>
        </div>
      )}

      {!role && (
        <div className="d-flex justify-content-center mt-5">
          <p>Selecciona un rol desde el menú para iniciar sesión.</p>
        </div>
      )}
    </div>
  );
}










