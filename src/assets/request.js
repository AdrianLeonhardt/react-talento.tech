export const agregarProducto = async (producto) => {
    try {
        const respuesta = await fetch(import.meta.env.VITE_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(producto),
        });

        if (!respuesta.ok) {
            throw new Error("Error al agregar el producto.");
        }
        const data = await respuesta.json();
        console.log("Producto agregado:", data);
        alert("Producto agregado correctamente");
    } catch (error) {
        console.error(error.message);
        alert("Hubo un problema al agregar el producto.");
    }
};

export const eliminarProducto = async (id) => {
 const confirmar = window.confirm('¿Estás seguro de eliminar?');
 if (confirmar) {
   try {
     const respuesta = await fetch(`https://mockapi.io/api/v1/productos/${id}`, {
       method: 'DELETE',
     });
     if (!respuesta.ok) throw new Error('Error al eliminar');
     alert('Producto eliminado correctamente.');
   } catch (error) {
     console.error(error.message);
     alert('Hubo un problema al eliminar el producto.');
   }
 }
};

