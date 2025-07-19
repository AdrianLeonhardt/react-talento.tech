import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
function FormularioEdicion({ productoSeleccionado, onActualizar }) {
  const [producto, setProducto] = useState(productoSeleccionado || {});

  useEffect(() => {
    setProducto(productoSeleccionado || {});
  }, [productoSeleccionado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await fetch(
        `${import.meta.env.VITE_API_URL}/${producto.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(producto),
        }
      );
      if (!respuesta.ok) {
        throw new Error("Error al actualizar el producto.");
      }
      const data = await respuesta.json();
      onActualizar(data);
      alert("Producto actualizado correctamente.");
    } catch (error) {
      console.error(error.message);
      alert("Hubo un problema al actualizar el producto.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Producto</h2>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={producto.name || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Precio:</label>
        <input
          type="number"
          name="price"
          value={producto.price || ""}
          onChange={handleChange}
          required
          min="0"
        />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea
          name="description"
          value={producto.description || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Imagen (URL):</label>
        <input
          type="text"
          name="image"
          value={producto.image || ""}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Actualizar Producto</button>
    </form>
  );
}

export default FormularioEdicion;

