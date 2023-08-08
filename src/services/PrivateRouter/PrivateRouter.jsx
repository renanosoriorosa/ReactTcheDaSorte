import React from "react";

import { Navigate } from "react-router-dom";

export default function PrivateRoute({children}){
    
    const isTokenValid = (token) => {
        const { exp } = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = exp * 1000; // converte a hora de expiração do token para milissegundos
        return Date.now() < expirationTime;
    };

    const IsAutenticado = () => {
        const token = localStorage.getItem('token');

        if (!token) {
          return false;
        }
    
        return isTokenValid(token);
    };

    return(IsAutenticado() === true ? children : <Navigate to="/login" />);
}