import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
/* eslint-disable react/prop-types */

function ProductosDetalle({ funcionCarrito }) {
  const { id } = useParams();
  const [cantidad, setCantidad] = useState(1);
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = import.meta.env.VITE_API_URL;

    fetch(url)
      .then((res) => res.json())
      .then((datos) => {
        const productoEncontrado = datos.find((item) => item.id === id);
        if (productoEncontrado) {
          setProducto(productoEncontrado);
        } else {
          setError("Producto no encontrado.");
        }
        setCargando(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setError("Hubo un error al obtener el producto.");
        setCargando(false);
      });
  }, [id]);

  function agregarAlCarrito() {
    if (cantidad < 1) return;
    funcionCarrito({ ...producto, cantidad });
    // alert("Producto agregado al carrito");
  }

  function sumarCantidad() {
    setCantidad(cantidad + 1);
  }

  function restarCantidad() {
    if (cantidad > 1) setCantidad(cantidad - 1);
  }

  if (cargando) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "300px" }}
      >
        <div className="spinner-border text-primary" role="status" />
        <span className="ms-2">Cargando producto...</span>
      </div>
    );
  }

  if (error) return <p className="text-danger text-center mt-5">{error}</p>;
  if (!producto) return null;

  return (
    <div className="container my-5">
      <div className="card mx-auto" style={{ maxWidth: "400px" }}>
        <img
          src={producto.imagen}
          className="card-img-top rounded-circle mx-auto mt-4"
          alt={producto.name}
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column text-center">
          <h5 className="card-title">{producto.name}</h5>
          <p className="card-text">{producto.description}</p>
          <p className="card-text fw-bold">${producto.precio}</p>

          <div className="d-flex justify-content-center align-items-center gap-2 mt-2">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={restarCantidad}
            >
              -
            </button>
            <span className="fw-bold">{cantidad}</span>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={sumarCantidad}
            >
              +
            </button>
          </div>

          <button
            className="btn btn-outline-primary mt-3"
            onClick={agregarAlCarrito}
          >
            Agregar al carrito
          </button>

          <Link to="/productos" className="btn btn-outline-secondary mt-2">
            Volver a productos
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductosDetalle;
