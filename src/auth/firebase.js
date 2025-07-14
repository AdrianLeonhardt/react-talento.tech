import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "REACT_APP_FIREBASE_apiKey",
    authDomain: "REACT_APP_FIREBASE_authDomain",
    projectId: "REACT_APP_FIREBASE_projectId",
    storageBucket: "REACT_APP_FIREBASE_storageBucket",
    messagingSenderId: "REACT_APP_FIREBASE_messagingSenderId",
    appId: "REACT_APP_FIREBASE_appId"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Instancia del proveedor de Google 
const provider = new GoogleAuthProvider();

// Función para crear usuario con correo y contraseña
export function crearUsuario(email, password) {
    // Crea un nuevo usuario con email y contraseña
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            console.log("Credenciales", userCredential);
            const user = userCredential.user;
            console.log("Usuario creado:", user);
        })
        .catch((error) => {
            const errorCode = error.code;
            console.error("Error al crear usuario:", errorCode, errorMessage);
            const errorMessage = error.message;
        });
}

// Función para iniciar sesión con correo y contraseña
export function loginUsuario(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

// Función para iniciar sesión con Google
export const loginConGoogle = () => {
    return signInWithPopup(auth, provider);
};

export { auth };