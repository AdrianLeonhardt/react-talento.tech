import { useEffect } from "react";
import "../styles/Productos.css";
import Card from "./Card";
import { useProductosContext } from "../contexts/ProductosContext";

function ProductosContainer() {
  const { productos, obtenerProductos } = useProductosContext();

  useEffect(() => {
    obtenerProductos();
  }, [obtenerProductos]);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Lista de Productos</h2>
      <div className="row justify-content-center">
        {productos.map((producto) => (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={producto.id}>
            <Card producto={producto} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductosContainer;



