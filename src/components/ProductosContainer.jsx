import { useEffect, useState } from "react";
import "../styles/Productos.css";
import Card from "./Card";
import { useProductosContext } from "../contexts/ProductosContext";

function ProductosContainer() {
  const { productos, obtenerProductos } = useProductosContext();

  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 4;

  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    obtenerProductos();
  }, [obtenerProductos]);

  // Resetear a página 1 cuando cambia la búsqueda
  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda]);

  // Filtrar productos por nombre o descripción
  const productosFiltrados = productos.filter((p) =>
    p.name.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.description.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Paginación sobre productos filtrados
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const indiceInicio = (paginaActual - 1) * productosPorPagina;
  const productosPagina = productosFiltrados.slice(indiceInicio, indiceInicio + productosPorPagina);

  const irAPagina = (numero) => setPaginaActual(numero);
  const paginaAnterior = () => setPaginaActual((prev) => Math.max(prev - 1, 1));
  const paginaSiguiente = () => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas));

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Lista de Productos</h2>

      {/* 🔍 Buscador */}
      <div className="mb-4 d-flex justify-content-center">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="form-control w-50"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="row justify-content-center">
        {productosPagina.length > 0 ? (
          productosPagina.map((producto) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={producto.id}>
              <Card producto={producto} />
            </div>
          ))
        ) : (
          <p className="text-center">No se encontraron productos.</p>
        )}
      </div>

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${paginaActual === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={paginaAnterior}>
                  « Anterior
                </button>
              </li>

              {[...Array(totalPaginas)].map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${paginaActual === i + 1 ? "active" : ""}`}
                >
                  <button className="page-link" onClick={() => irAPagina(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${paginaActual === totalPaginas ? "disabled" : ""}`}>
                <button className="page-link" onClick={paginaSiguiente}>
                  Siguiente »
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default ProductosContainer;





