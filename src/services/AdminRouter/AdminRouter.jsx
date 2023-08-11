import { Navigate } from "react-router-dom";
import {IsAdmin} from "../AdminServices/AdminServices";

export default function AdminRouter({children}){

    const isAdmin = IsAdmin();

    return(isAdmin === true ? children : <Navigate to="/SemPermissao" />);
}