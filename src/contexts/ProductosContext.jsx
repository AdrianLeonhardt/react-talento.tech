import { createContext, useContext, useState } from "react";

const ProductosContext = createContext();

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);

  function obtenerProductos() {
    return new Promise((resolve, reject) => {
      const url = import.meta.env.VITE_API_URL2;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setProductos(data);
          resolve(data);
        })
        .catch((error) => {
          console.error("Error al obtener productos:", error);
          reject(error);
        });
    });
  }

  return (
    <ProductosContext.Provider value={{ productos, obtenerProductos }}>
      {children}
    </ProductosContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProductosContext = () => useContext(ProductosContext);
