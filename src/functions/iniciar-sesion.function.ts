import { usuarios } from "../dataBase/users-db";
import { doCuestion } from './registro-usuario.function';

function cargarPreguntaslogin(callback: (preguntas: string[]) => void) {
    const preguntas: string[] = ["Email: ", "Contraseña: "];
    callback(preguntas); 
} 
function isLogged(respuestas: string[]):string {
    
    let logueado = false;
    let msj: string = ""
    usuarios.forEach(u => {
        if (u.email === respuestas[0] && u.password === respuestas[1]) {
            logueado = true;
            console.log(`\n¡Bienvenido ${u.name}!`);
            msj = "¡Login exitoso! \n";
        }
    }); 
    if (!logueado) {
        msj="\n ¡El usuario o contraseña son inconrrectos!";
    };   
    return msj;
    
   
}
export function login(): Promise<string> {
    return new Promise(
        (res) => {
            setTimeout(() => {
                let msj: string;
                cargarPreguntaslogin((listapreguntas) => {
                    console.log("Ingresa tus credenciales\n");
                    doCuestion(listapreguntas, (listarespuestas) => {
                        console.log("Validando credenciales...")
                        msj =  isLogged(listarespuestas);
                    })
                    res(msj);
                });
            }, 2000)
        }
    )
}


