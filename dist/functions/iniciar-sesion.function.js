"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const users_db_1 = require("../dataBase/users-db");
const registro_usuario_function_1 = require("./registro-usuario.function");
function cargarPreguntaslogin(callback) {
    const preguntas = ["Email: ", "Contraseña: "];
    callback(preguntas);
}
function isLogged(respuestas) {
    let logueado = false;
    let msj = "";
    users_db_1.usuarios.forEach(u => {
        if (u.email === respuestas[0] && u.password === respuestas[1]) {
            logueado = true;
            console.log(`\n¡Bienvenido ${u.name}!`);
            msj = "¡Login exitoso! \n";
        }
    });
    if (!logueado) {
        msj = "\n ¡El usuario o contraseña son inconrrectos!";
    }
    ;
    return msj;
}
function login() {
    return new Promise((res) => {
        setTimeout(() => {
            let msj;
            cargarPreguntaslogin((listapreguntas) => {
                console.log("Ingresa tus credenciales\n");
                (0, registro_usuario_function_1.doCuestion)(listapreguntas, (listarespuestas) => {
                    console.log("Validando credenciales...");
                    msj = isLogged(listarespuestas);
                });
                res(msj);
            });
        }, 2000);
    });
}
exports.login = login;
