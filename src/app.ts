import PromptSync from "prompt-sync";
import { login } from "./functions/iniciar-sesion.function";
import { register } from "./functions/registro-usuario.function";
import { mostrarUsuarios, usuarios } from "./dataBase/users-db";

const menu = `
╔══════════════════════════════════╗ 
 Elije una opción
  0. Salir
  1. Iniciar sesión.
  2. Registrar usuario.
  3. Mostrar usuarios registrados.
╚══════════════════════════════════╝
`;


async function run() {
    let bandera: Boolean = true;
    while (bandera) {
        console.log(menu);
        const input = PromptSync();
        let opcion = input(' ');
        let msj: string="";

        switch (opcion) {
            case "1":
                console.log("Cargando Incio de sesión...");
                msj = await login();
                console.log(msj);
                
                break;
            
            case "2":
                console.log("cargando...");
                msj = await register();
                console.log(msj);
                break;

            case "3":
                mostrarUsuarios();
                break;
            case "0":
                console.log("Cerando sesion...")
                bandera = false;
                break;
            
            default:
                console.log("Escoge una opción valida")
                break;
        }
        
    }
}
run();