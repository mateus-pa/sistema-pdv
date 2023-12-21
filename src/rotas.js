const express = require('express');

const rotas = express();

const loginController = require('./controladores/login');
const usuariosController = require('./controladores/usuarios');

const validaCorpoRequisicao = require('./intermediarios/validaCorpoRequisicao');

const loginSchema = require('./validacoes/loginSchema');
const usuarioSchema = require('./validacoes/usuarioSchema');

rotas.post('/login', validaCorpoRequisicao(loginSchema));

rotas.post('/usuario', validaCorpoRequisicao(usuarioSchema));

module.exports = rotas;