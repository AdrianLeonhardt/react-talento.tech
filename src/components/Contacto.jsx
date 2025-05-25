// function Contacto() {
//     return (
//         <h1>Contacto</h1>
//     )
// }

function Contacto() {
    return (
        <div className="container my-5">
            <h1 className="mb-4">Contacto</h1>

            <form>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="nombre" placeholder="Ingresa tu nombre" />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                    <input type="email" className="form-control" id="email" placeholder="Ingresa tu correo" />
                </div>

                <div className="mb-3">
                    <label htmlFor="mensaje" className="form-label">Mensaje</label>
                    <textarea className="form-control" id="mensaje" rows="5" placeholder="Escribi tu mensaje ..."></textarea>
                </div>

                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
    );
}

export default Contacto;