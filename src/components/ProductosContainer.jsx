import "../styles/Productos.css";
import Card from "./Card";
import { useState, useEffect } from "react";


function ProductosContainer() {
  const [productosApi, setProductosApi] = useState([]);

  // Cargar productos del mock API
  useEffect(() => {
    const url = import.meta.env.VITE_API_URL2;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProductosApi(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        {productosApi.map((producto) => (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={producto.id}>
            <Card producto={producto} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductosContainer;
