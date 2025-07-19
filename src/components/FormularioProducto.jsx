import { useState } from "react";

// eslint-disable-next-line react/prop-types
function FormularioProducto({ onAgregar }) {
  const [producto, setProducto] = useState({
    name: "",
    precio: "",
    description: "",
    imagen: "",
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!producto.name.trim()) {
      nuevosErrores.name = "El nombre es obligatorio.";
    }

    if (!producto.precio || producto.precio <= 0) {
      nuevosErrores.precio = "El precio debe ser mayor a 0.";
    }

    if (!producto.description.trim() || producto.description.length < 10) {
      nuevosErrores.description =
        "La descripción debe tener al menos 10 caracteres.";
    }

    if (!producto.imagen.trim()) {
      nuevosErrores.imagen = "La URL de la imagen es obligatoria.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      onAgregar(producto);
      setProducto({ name: "", precio: "", description: "", imagen: "" });
      setErrores({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2 className="mb-4 text-center">Agregar Producto</h2>

      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nombre:
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="form-control"
          value={producto.name}
          onChange={handleChange}
          required
        />
        {errores.name && <div className="text-danger mt-1">{errores.name}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="imagen" className="form-label">
          URL de la imagen:
        </label>
        <input
          type="text"
          name="imagen"
          id="imagen"
          className="form-control"
          value={producto.imagen}
          onChange={handleChange}
          required
        />
        {errores.imagen && (
          <div className="text-danger mt-1">{errores.imagen}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="precio" className="form-label">
          Precio:
        </label>
        <input
          type="number"
          name="precio"
          id="precio"
          className="form-control"
          value={producto.precio}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
        />
        {errores.precio && (
          <div className="text-danger mt-1">{errores.precio}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Descripción:
        </label>
        <textarea
          name="description"
          id="description"
          className="form-control"
          value={producto.description}
          onChange={handleChange}
          required
        />
        {errores.description && (
          <div className="text-danger mt-1">{errores.description}</div>
        )}
      </div>

      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary">
          Agregar Producto
        </button>
      </div>
    </form>
  );
}

export default FormularioProducto;
