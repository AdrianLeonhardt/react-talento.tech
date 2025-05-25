import "../styles/Productos.css";
import { Link } from "react-router-dom";
/* eslint-disable react/prop-types */

function Card({ producto }) {
  return (
    <div className="card h-100 d-flex flex-column">
      <img
        src={producto.imagen}
        className="card-img-top rounded-circle mx-auto mt-3"
        alt={producto.name}
        style={{ width: "150px", height: "150px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column text-center">
        <h5 className="card-title">{producto.name}</h5>
        <p className="card-text flex-grow-1">{producto.description}</p>
        <p className="card-text fw-bold">${producto.precio}</p>
        <Link to={`/productos/${producto.id}`} className="mt-auto">
          <button className="btn btn-outline-primary w-100">
            Ver detalles del producto
          </button>
        </Link>
      </div>
    </div>
  );
}


export default Card;
