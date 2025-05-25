import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useState } from "react";

import "./styles/Home.css"
import Home from "./layouts/Home"
import About from "./components/About"
import Contacto from "./components/Contacto"
import Nav from "./components/Nav"
import Footer from "./components/Footer";
import ProductosContainer from "./components/ProductosContainer"
import ProductoDetalle from "./components/ProductosDetalle"
import Carrito from "./components/Carrito"
import Login from "./components/Login"
import Admin from './components/Admin';
import Usuario from "./components/Usuario";



function App() {
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [usuarioLogeado, setUsuarioLogeado] = useState(false)
  const [adminLogeado, setAdminLogeado] = useState(false)

  // Funcion para manejar el estado de logueo del admin
  function manejarAdmin() {
    setAdminLogeado(!adminLogeado)
  }
  // Funcion para manejar el estado de logueo del usuario
  function manejarUser(){
    setUsuarioLogeado(!usuarioLogeado)
  }

  // Funcion para agregar productos al carrito
  function funcionCarrito(producto){
    const existe = productosCarrito.find(p => p.id === producto.id);
    console.log(existe)
    if (existe) {
        const carritoActualizado = productosCarrito.map((p) => {
            if (p.id === producto.id){
                const productoActualizado = {...p, cantidad: p.cantidad + producto.cantidad}
                return productoActualizado
            }else{
                return p
            }
        })
        setProductosCarrito(carritoActualizado)
    }else{
        // Si no existe, lo agregamos con su cantidad
        const nuevoCarrito = [...productosCarrito, producto];
        setProductosCarrito(nuevoCarrito)
    }

  }

  // Funcion para borrar productos del carrito
  function borrarProductoCarrito(id) {
        const nuevoCarrito = productosCarrito.filter(p => p.id !== id);
        setProductosCarrito(nuevoCarrito);
  }

  // Funcion para calcular la cantidad total de productos en el carrito
  const totalCantidad = productosCarrito.reduce((acum, producto) => acum + producto.cantidad, 0);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Nav productosCarrito={productosCarrito } totalCantidad={totalCantidad}/>
        
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/productos" element={<ProductosContainer />}/>
            <Route path="/productos/:id" element={<ProductoDetalle funcionCarrito={funcionCarrito} usuarioLogeado={usuarioLogeado}/>} />
            {/* <Route path="/carrito" element={<Carrito productos={productosCarrito} funcionBorrar={borrarProductoCarrito} />} /> */}
            <Route path="/carrito" element={(usuarioLogeado || adminLogeado) ? <Carrito productos={productosCarrito} funcionBorrar={borrarProductoCarrito} /> : <Navigate to="/login" replace />} />
            <Route path="/acerca-de" element={<About />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path='/login' element={<Login user={usuarioLogeado} admin={adminLogeado} setLogeadoAdmin={manejarAdmin} setLogeadoUser={manejarUser}/>}/>
            <Route path='/admin' element={adminLogeado ? <Admin/> : <Navigate to="/login" replace/>} />
            <Route path="/usuario" element={usuarioLogeado ? <Usuario /> : <Navigate to="/login" replace />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App
