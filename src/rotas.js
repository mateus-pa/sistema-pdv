const express = require('express');

const rotas = express();

const loginController = require('./controladores/login');
const usuariosController = require('./controladores/usuarios');

const validaCorpoRequisicao = require('./intermediarios/validaCorpoRequisicao');

const loginSchema = require('./validacoes/loginSchema');

rotas.post('/login', validaCorpoRequisicao(loginSchema));

module.exports = rotas;