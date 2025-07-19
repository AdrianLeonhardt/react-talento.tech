import { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

// eslint-disable-next-line react/prop-types
export function CarritoProvider({ children }) {
  const [productosCarrito, setProductosCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setProductosCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      if (existe) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + producto.cantidad } : p
        );
      } else {
        return [...prev, producto];
      }
    });
  };

  const borrarDelCarrito = (id) => {
    setProductosCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  const vaciarCarrito = () => {
    setProductosCarrito([]);
  };

  const totalCantidad = productosCarrito.reduce((acc, p) => acc + p.cantidad, 0);

  return (
    <CarritoContext.Provider
      value={{ productosCarrito, agregarAlCarrito, borrarDelCarrito, vaciarCarrito, totalCantidad }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCarritoContext = () => useContext(CarritoContext);
