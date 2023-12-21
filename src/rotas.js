const express = require('express');

const rotas = express();

const loginControlador = require('./controladores/login');
const usuariosControlador = require('./controladores/usuarios');
const categoriasControlador = require('./controladores/categorias');

const validaCorpoRequisicao = require('./intermediarios/validaCorpoRequisicao');
const autenticaUsuario = require('./intermediarios/autenticacao');

const loginSchema = require('./validacoes/loginSchema');
const usuariosSchema = require('./validacoes/usuariosSchema');

rotas.post('/usuario', validaCorpoRequisicao(usuariosSchema), usuariosControlador.cadastrar);

rotas.get('/usuario', autenticaUsuario(usuariosSchema), usuariosControlador.detalharPerfil);
rotas.put('/usuario', autenticaUsuario(usuariosSchema), usuariosControlador.editarPerfil);
rotas.post('/login', validaCorpoRequisicao(loginSchema), loginControlador);

rotas.use(autenticaUsuario);

rotas.get('/categoria', categoriasControlador.listar);

module.exports = rotas;