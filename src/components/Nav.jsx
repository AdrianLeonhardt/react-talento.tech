import { Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
/* eslint-disable react/prop-types */
// function Nav() {
//     return (
//         <nav>
//             <ul>
//                 <li>
//                     <Link to="/">Home</Link>
//                 </li>
//                 <li>
//                     <Link to="/contacto">Contacto</Link>
//                 </li>
//                 <li>
//                     <Link to="/acerca-de">Acerca-De</Link>
//                 </li>
//             </ul>
//         </nav>
//     )
// }

function Nav({ totalCantidad }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/home">Tienda Talento Tech</Link>
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
                                      style={{ fontSize: '0.55rem' }}
                                    >
                                        {totalCantidad}
                                    </span>
                                )}
                            </Link>
                        </li>
                        {/* <li><Link to="/admin" style={{ color: "white", textDecoration: "none" }}>Admin</Link></li> 
                        <li><Link to="/login" style={{ color: "white", textDecoration: "none" }}>Login</Link></li>   */}
                        <li className="nav-item dropdown">
                            <span
                                className="nav-link dropdown-toggle"
                                id="usuarioDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ cursor: 'pointer' }}
                            >
                                <i className="bi bi-person-circle"></i>
                            </span>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="usuarioDropdown">
                                <li>
                                    <Link className="dropdown-item" to="/login?role=usuario">Usuario</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/login?role=admin">Administrador</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;