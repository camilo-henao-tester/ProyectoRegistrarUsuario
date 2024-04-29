import { User } from "../interfaces/user.interface";

export let usuarios: User[] = [];

export function mostrarUsuarios() {
    console.log("usuarios guardados", usuarios);
}
