import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { adminUser } from "../auth/adminConfig";
import { useAuthContext } from "../contexts/AuthContext";
/* eslint-disable react/prop-types */

function Nav({ totalCantidad }) {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const esAdmin = user?.email === adminUser.email;
  const estaLogueado = Boolean(user);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/home");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/home">
          Tienda Talento Tech
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productos">Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">Contacto</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/acerca-de">Acerca De</Link>
            </li>
            <li className="nav-item position-relative">
              <Link className="nav-link position-relative" to="/carrito">
                <i className="bi bi-cart3"></i>
                {totalCantidad > 0 && (
                  <span
                    className="position-absolute top-0.5 start-100 translate-middle badge rounded-pill bg"
                    style={{ fontSize: "0.55rem" }}
                  >
                    {totalCantidad}
                  </span>
                )}
              </Link>
            </li>

            {/* Mostrar Usuario/Admin solo si no está logueado */}
            {!estaLogueado && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login?role=usuario">Usuario</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login?role=admin">Administrador</Link>
                </li>
              </>
            )}

            {/* Si está logueado como admin, mostrar Agregar Producto */}
            {esAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin/agregarProductos">
                  Agregar Producto
                </Link>
              </li>
            )}

            
            {estaLogueado && (
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;



