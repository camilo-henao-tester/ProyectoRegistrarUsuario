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
exports.register = exports.doCuestion = void 0;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const users_db_1 = require("../dataBase/users-db");
const rol_usuario_enum_1 = require("../enums/rol-usuario.enum");
const input = (0, prompt_sync_1.default)();
function cargarPreguntas(callback) {
    const preguntas = [
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
function doCuestion(preguntas, callback) {
    let respuestas = [];
    preguntas.forEach(pregunta => {
        respuestas.push(input(pregunta));
    });
    callback(respuestas);
}
exports.doCuestion = doCuestion;
function createUser(respuestas, callback) {
    const usuario = {
        id: users_db_1.usuarios.length + 1,
        name: respuestas[0],
        email: respuestas[1],
        password: respuestas[2],
        rol: respuestas[3] === "1" ? rol_usuario_enum_1.Rol.admin : rol_usuario_enum_1.Rol.user
    };
    callback(usuario);
}
function validateUser(usuario) {
    return new Promise((res, req) => {
        setTimeout(() => {
            const usuarioExistente = users_db_1.usuarios.find(user => user.email === usuario.email);
            if (usuarioExistente) {
                req("El usuario ya está registrado");
            }
            else {
                users_db_1.usuarios.push(usuario);
                res("Usuario gurdado correctamente");
            }
        }, 2000);
    });
}
function register() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, req) => {
            setTimeout(() => {
                cargarPreguntas((listapreguntas) => {
                    console.log("Ingresa los datos:");
                    doCuestion(listapreguntas, (listarespuestas) => {
                        console.log("Procesando datos... \n");
                        createUser(listarespuestas, (usuario) => __awaiter(this, void 0, void 0, function* () {
                            yield validateUser(usuario)
                                .then((msj) => res(msj))
                                .catch((error) => req(`Error ${error}`));
                        }));
                    });
                });
            }, 2000);
        });
    });
}
exports.register = register;
