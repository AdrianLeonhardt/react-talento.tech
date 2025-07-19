import { createContext, useContext, useState } from "react";

const ProductosContext = createContext();

// eslint-disable-next-line react/prop-types
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

  const agregarProducto = async (producto) => {
    const respuesta = await fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    });
    if (!respuesta.ok) throw new Error("Error al agregar producto");
    const nuevo = await respuesta.json();
    setProductos((prev) => [...prev, nuevo]);
    return nuevo;
  };

  const actualizarProducto = async (producto) => {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${producto.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    });
    if (!respuesta.ok) throw new Error("Error al actualizar producto");
    const actualizado = await respuesta.json();
    setProductos((prev) =>
      prev.map((p) => (p.id === actualizado.id ? actualizado : p))
    );
    return actualizado;
  };

  const eliminarProducto = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar?");
    if (!confirmar) return;
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!respuesta.ok) throw new Error("Error al eliminar producto");
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductosContext.Provider value={{ productos, obtenerProductos, agregarProducto, actualizarProducto, eliminarProducto }}>
      {children}
    </ProductosContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProductosContext = () => useContext(ProductosContext);
