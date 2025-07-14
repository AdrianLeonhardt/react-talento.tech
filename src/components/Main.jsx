// function Main() {
//     return (
//         <h1>Contenido Principal</h1>
//     )
// }
import homeimagen from "../assets/home.jpg";

function Main() {
  return (
    <main className="container my-5">
      <h2 className="mb-4 text-center">Los mejores productos al mejor precio</h2>
      <img
        src={homeimagen}
        alt="Nuestra tienda"
        className="img-fluid rounded shadow"
      />
    </main>
  );
}

export default Main;
