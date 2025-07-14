import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "./contexts/AuthContext"; // Usamos el contexto

import "./styles/Home.css";
import Home from "./layouts/Home";
import About from "./components/About";
import Contacto from "./components/Contacto";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ProductosContainer from "./components/ProductosContainer";
import ProductoDetalle from "./components/ProductosDetalle";
import Carrito from "./components/Carrito";
// import Login from "./components/Login" // Ya no usamos este login
import Admin from "./components/Admin";
import Usuario from "./components/Usuario";
import Login2 from "./components/Login2";
import FormularioProducto from "./components/FormularioProducto"; // Importamos el formulario de productos
import agregarProducto from "./assets/request"


function App() {
  const { user } = useAuthContext(); // Tomamos el usuario logueado del contexto

  const [productosCarrito, setProductosCarrito] = useState([]);

  // Logica para agregar productos al inventario
  // const agregarProducto = async (producto) => {
  //   try {
  //     const respuesta = await fetch(
  //       "https://.mockapi.io/productos",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(producto),
  //       }
  //     );

  //     if (!respuesta.ok) {
  //       throw new Error("Error al agregar el producto.");
  //     }
  //     const data = await respuesta.json();
  //     console.log("Producto agregado:", data);
  //     alert("Producto agregado correctamente");
  //   } catch (error) {
  //     console.error(error.message);
  //     alert("Hubo un problema al agregar el producto.");
  //   }
  // };

  //  Estados ya no se usan porque el contexto los reemplaza
  // const [usuarioLogeado, setUsuarioLogeado] = useState(false)
  // const [adminLogeado, setAdminLogeado] = useState(false)

  //  funciones de manejo de login
  // function manejarAdmin() {
  //   setAdminLogeado(!adminLogeado)
  // }

  // function manejarUser(){
  //   setUsuarioLogeado(!usuarioLogeado)
  // }

  // Función para agregar productos al carrito
  function funcionCarrito(producto) {
    const existe = productosCarrito.find((p) => p.id === producto.id);
    if (existe) {
      const carritoActualizado = productosCarrito.map((p) => {
        if (p.id === producto.id) {
          return { ...p, cantidad: p.cantidad + producto.cantidad };
        }
        return p;
      });
      setProductosCarrito(carritoActualizado);
    } else {
      setProductosCarrito([...productosCarrito, producto]);
    }
  }

  // Función para borrar productos del carrito
  function borrarProductoCarrito(id) {
    const nuevoCarrito = productosCarrito.filter((p) => p.id !== id);
    setProductosCarrito(nuevoCarrito);
  }

  // Calcular cantidad total
  const totalCantidad = productosCarrito.reduce(
    (acum, producto) => acum + producto.cantidad,
    0
  );

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Nav
          productosCarrito={productosCarrito}
          totalCantidad={totalCantidad}
        />

        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/productos" element={<ProductosContainer />} />
            <Route
              path="/productos/:id"
              element={
                <ProductoDetalle
                  funcionCarrito={funcionCarrito}
                  usuarioLogeado={!!user}
                />
              }
            />
            {/* Antes dependía de adminLogeado o usuarioLogeado */}
            {/* <Route path="/carrito" element={(usuarioLogeado || adminLogeado) ? <Carrito productos={productosCarrito} funcionBorrar={borrarProductoCarrito} /> : <Navigate to="/login" replace />} /> */}
            <Route
              path="/carrito"
              element={
                user ? (
                  <Carrito
                    productos={productosCarrito}
                    funcionBorrar={borrarProductoCarrito}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path="/acerca-de" element={<About />} />
            <Route path="/contacto" element={<Contacto />} />
            {/* <Route path='/login' element={<Login user={usuarioLogeado} admin={adminLogeado} setLogeadoAdmin={manejarAdmin} setLogeadoUser={manejarUser}/>}/> */}
            <Route path="/login" element={<Login2 />} />
            {/* <Route path='/admin' element={adminLogeado ? <Admin/> : <Navigate to="/login" replace/>} /> */}
            {/* <Route path='/admin' element={user === "admin" ? <Admin/> : <Navigate to="/login" replace/>} /> */}
            {/* <Route path="/usuario" element={usuarioLogeado ? <Usuario /> : <Navigate to="/login" replace />} /> */}
            <Route path="/admin" element={Admin} />
            <Route
              path="/usuario"
              element={
                user && user !== "admin" ? (
                  <Usuario />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/admin/agregarProductos"
              element={<FormularioProducto  onAgregar={agregarProducto}/>}
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
