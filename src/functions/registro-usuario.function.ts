import PromptSync from "prompt-sync";
import { usuarios } from "../dataBase/users-db";
import { Rol } from "../enums/rol-usuario.enum";
import { User } from "../interfaces/user.interface";

const input = PromptSync();
function cargarPreguntas(callback: (preguntas: string[]) => void) {
    const preguntas: string[] =
        [
            `Nombre: `,
            `Correo: `,
            `Contraseña: `,
            `Rol
    1. Administrador
    2. Usuario
        `
        ];
    callback(preguntas);
}

export function doCuestion(preguntas: string[],callback:(respuestas:string[])=>void) {
        let respuestas: string[] = [];
        preguntas.forEach(pregunta => {
        respuestas.push(input(pregunta));
        });
        callback(respuestas);
}

function createUser(respuestas: string[],callback:(usuario:User)=>void) {
    const usuario: User = {
        id: usuarios.length+1,
        name: respuestas[0],
        email: respuestas[1],
        password:respuestas[2],
        rol: respuestas[3] === "1" ? Rol.admin : Rol.user
    }
    callback(usuario);    
}
 
function validateUser(usuario: User):Promise<string> {
    
    return new Promise((res, req) => {

        setTimeout(() => {
        const usuarioExistente=usuarios.find(user=>user.email===usuario.email)
                
            if (usuarioExistente) {
                req( "El usuario ya está registrado");
            } else {
                usuarios.push(usuario);
                res("Usuario gurdado correctamente");
            }
            }, 2000)
    });
        

}

export async function register(): Promise<string> {
    return new Promise(
        (res,req) => {
            setTimeout(() => {
                
                cargarPreguntas((listapreguntas) => {
                    console.log("Ingresa los datos:");
                    doCuestion(listapreguntas, (listarespuestas) => {
                        console.log("Procesando datos... \n");
                        createUser(listarespuestas, async (usuario) => {
                            await validateUser(usuario)
                                .then((msj) => res(msj))
                                .catch((error) => req(`Error ${error}`));
                        });
                    })
                });
            }, 2000)

        }
    );
}