const express = require('express');

const rotas = express();

const loginControlador = require('./controladores/login');
const usuariosControlador = require('./controladores/usuarios');

const validaCorpoRequisicao = require('./intermediarios/validaCorpoRequisicao');

const loginSchema = require('./validacoes/loginSchema');
const usuariosSchema = require('./validacoes/usuariosSchema');

rotas.post('/login', validaCorpoRequisicao(loginSchema), loginControlador);

rotas.post('/usuario', validaCorpoRequisicao(usuariosSchema), usuariosControlador.cadastrar);

module.exports = rotas;