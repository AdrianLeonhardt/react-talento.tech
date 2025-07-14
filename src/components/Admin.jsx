import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";


function Admin () {

    const {user} = useAuthContext();

    if (!user){
        // Si no hay usuario logueado, redirigimos al login
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="d-flex justify-content-center pt-4">
            <h1>Soy Admin</h1>
        </div>
    )
}

export default Admin;