import "../styles/Carrito.css"
/* eslint-disable react/prop-types */

function CarritoCard({ producto, guardarProducto }) {
  function borrarDelCarrito() {
    // console.log("Paso 1")
    guardarProducto(producto.id)
  }
  
  return (
    <div className="carrito-card" >
      <h3 className="carrito-producto" style={{color:"black"}}>{producto.name}</h3>
      <p className="descripcion-carrito" style={{color:"black"}}>{producto.description}</p>
      <img className="carrito-image" src={producto.imagen} alt={producto.name} />
      <h4>Cantidad: <br />{producto.cantidad}</h4>
      <div className="carrito-unitario">
          <span style={{color:"black"}}>Precio Unitario: <br />${producto.precio}</span>
      </div>
      <div className="carrito-sub">
          <span className="p-total-modelo">Precio Total por Modelo:<br />$ {(producto.cantidad * producto.precio).toFixed(2)}</span>
      </div>
      <button className="boton-carrito" onClick={borrarDelCarrito} style={{backgroundColor: "red" ,color:"black"}}>X</button>
    </div>
  )
}


export default CarritoCard;