// function About() {
//     return (
//         <h1>Sobre Nosotros</h1>
//     )
// }
import ecommerceImage from '../assets/ecomerce.jpg';

function About() {
    return (
        <div className="container my-5">
            <h1 className="mb-4">Sobre Nosotros</h1>

            <div className="row align-items-center">
                <div className="col-md-6 mb-4 mb-md-0">
                    <img
                        src={ecommerceImage}
                        alt="Nuestra tienda"
                        className="img-fluid rounded shadow"
                    />
                </div>
                <div className="col-md-6">
                    <p>
                        En <strong>Tienda Talento Tech</strong>, nos dedicamos a ofrecer productos de calidad a precios accesibles.
                        Nuestro compromiso es brindar una excelente experiencia de compra, atención personalizada y
                        entregas rápidas.
                    </p>
                    <p>
                        Desde nuestros inicios, trabajamos con pasión para ayudarte a encontrar lo que necesitás.
                        ¡Gracias por confiar en nosotros!
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;