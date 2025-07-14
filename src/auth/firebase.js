import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
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