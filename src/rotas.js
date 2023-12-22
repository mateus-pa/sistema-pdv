const express = require('express');
const cors = require('cors');

const rotas = express();

const loginControlador = require('./controladores/login');
const usuariosControlador = require('./controladores/usuarios');
const categoriasControlador = require('./controladores/categorias');
const produtosControlador = require('./controladores/produtos');

const validaCorpoRequisicao = require('./intermediarios/validaCorpoRequisicao');
const autenticaUsuario = require('./intermediarios/autenticacao');

const loginSchema = require('./validacoes/loginSchema');
const usuariosSchema = require('./validacoes/usuariosSchema');
const produtosSchema = require('./validacoes/produtosSchema');


rotas.post('/usuario', validaCorpoRequisicao(usuariosSchema), usuariosControlador.cadastrar);
rotas.post('/login', validaCorpoRequisicao(loginSchema), loginControlador);

rotas.use(cors());
rotas.use(autenticaUsuario);

rotas.get('/categoria', categoriasControlador.listar);
rotas.get('/usuario', usuariosControlador.detalharPerfil);
rotas.put('/usuario', validaCorpoRequisicao(usuariosSchema), usuariosControlador.editarPerfil);

rotas.post('/produto', validaCorpoRequisicao(produtosSchema), produtosControlador.cadastrar);
rotas.put('/produto/:id', validaCorpoRequisicao(produtosSchema), produtosControlador.editar);
rotas.get('/produto', produtosControlador.listar);
rotas.delete('/produto/:id', produtosControlador.excluir);

module.exports = rotas;
