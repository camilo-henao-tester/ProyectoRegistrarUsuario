"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const iniciar_sesion_function_1 = require("./functions/iniciar-sesion.function");
const registro_usuario_function_1 = require("./functions/registro-usuario.function");
const users_db_1 = require("./dataBase/users-db");
const menu = `
╔══════════════════════════════════╗ 
 Elije una opción
  0. Salir
  1. Iniciar sesión.
  2. Registrar usuario.
  3. Mostrar usuarios registrados.
╚══════════════════════════════════╝
`;
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        let bandera = true;
        while (bandera) {
            console.log(menu);
            const input = (0, prompt_sync_1.default)();
            let opcion = input(' ');
            let msj = "";
            switch (opcion) {
                case "1":
                    console.log("Cargando Incio de sesión...");
                    msj = yield (0, iniciar_sesion_function_1.login)();
                    console.log(msj);
                    break;
                case "2":
                    console.log("cargando...");
                    msj = yield (0, registro_usuario_function_1.register)();
                    console.log(msj);
                    break;
                case "3":
                    (0, users_db_1.mostrarUsuarios)();
                    break;
                case "0":
                    console.log("Cerando sesion...");
                    bandera = false;
                    break;
                default:
                    console.log("Escoge una opción valida");
                    break;
            }
        }
    });
}
run();
