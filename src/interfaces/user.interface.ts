import { Rol } from "../enums/rol-usuario.enum";

export interface User{
    id: number;
    name: string;
    email: string;
    password: string;
    rol: Rol;

}