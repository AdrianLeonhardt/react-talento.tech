import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

      if (!respuesta.ok) throw new Error("Error al actualizar el producto");

      const data = await respuesta.json();
      onActualizar(data);

      toast.success("✅ Producto actualizado correctamente");
    } catch (error) {
      console.error(error.message);
      toast.error("❌ Hubo un problema al actualizar el producto");
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Editar Producto</h2>
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
        <div className="mb-3">
          <label className="form-label">Nombre:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={producto.name || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Precio:</label>
          <input
            type="number"
            name="precio"
            className="form-control"
            value={producto.precio }
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción:</label>
          <textarea
            name="description"
            className="form-control"
            rows="3"
            value={producto.description || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Imagen (URL):</label>
          <input
            type="text"
            name="imagen"
            className="form-control"
            value={producto.imagen || ""}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Actualizar Producto
        </button>
      </form>
    </div>
  );
}

export default FormularioEdicion;


