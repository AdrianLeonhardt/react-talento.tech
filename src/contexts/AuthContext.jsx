// import { createContext, useState, useContext } from 'react';
// import PropTypes from 'prop-types';

// // Crear el contexto de autenticación
// const AuthContext = createContext();
// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);


//   const login = (username) => {
//     // Simulando la creación de un token (en una app real, esto sería generado por un servidor)
//     const token = `fake-token-${username}`;
//     localStorage.setItem('authToken', token);
//     setUser(username);
//   };
//   const logout = () => {
//     localStorage.removeItem('authToken');
//     setUser(null);
//   };
//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider> );
// }

// //Validación de props
// AuthProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };
// // eslint-disable-next-line react-refresh/only-export-components
// export const useAuthContext = () => useContext(AuthContext);

import { createContext, useState, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../auth/firebase";
import PropTypes from "prop-types";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser || null);
    });

    return () => unsubscribe();
  }, []);

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

//Validación de props
 AuthProvider.propTypes = {
children: PropTypes.node.isRequired,
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);
