import CarritoCard from "./CarritoCard";
import "../styles/Carrito.css";
/* eslint-disable react/prop-types */

function Carrito({ productos = [], funcionBorrar }) {
  const total = productos.reduce(
    (subtotal, producto) => subtotal + producto.precio * producto.cantidad,
    0
  );

  return (
    <div className="carrito-container">
      {productos.length > 0 ? (
        productos.map((producto, index) => (
          <CarritoCard
            key={index}
            producto={producto}
            guardarProducto={funcionBorrar}
          />
        ))
      ) : (
        <p>No hay productos en el carrito</p>
      )}

      {total > 0 && (
        <div className="carrito-total">
          <h4 className="total-a-pagar">Total a pagar: ${total.toFixed(2)}</h4>
        </div>
      )}
    </div>
  );
}
export default Carrito;
