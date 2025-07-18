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

        if (!producto.precio || parseFloat(producto.precio) <= 0) {
            nuevosErrores.precio = "El precio debe ser mayor a 0.";
        }

        if (!producto.description.trim() || producto.description.length < 10) {
            nuevosErrores.description = "La descripción debe tener al menos 10 caracteres.";
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
        <form onSubmit={handleSubmit}>
            <h2>Agregar Producto</h2>

            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    name="name"
                    value={producto.name}
                    onChange={handleChange}
                    required
                />
                {errores.name && (
                    <p style={{ color: "red" }}>{errores.name}</p>
                )}
            </div>

            <div>
                <label>URL de la imagen:</label>
                <input
                    type="text"
                    name="imagen"
                    value={producto.imagen}
                    onChange={handleChange}
                    required
                />
                {errores.imagen && (
                    <p style={{ color: "red" }}>{errores.imagen}</p>
                )}
            </div>

            <div>
                <label>Precio:</label>
                <input
                    type="number"
                    name="precio"
                    value={producto.precio}
                    onChange={handleChange}
                    required
                    min="0"
                />
                {errores.precio && (
                    <p style={{ color: "red" }}>{errores.precio}</p>
                )}
            </div>

            <div>
                <label>Descripción:</label>
                <textarea
                    name="description"
                    value={producto.description}
                    onChange={handleChange}
                    required
                />
                {errores.description && (
                    <p style={{ color: "red" }}>{errores.description}</p>
                )}
            </div>

            <button type="submit">Agregar Producto</button>
        </form>
    );
}


export default FormularioProducto;




