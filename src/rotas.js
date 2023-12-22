const express = require('express');
const cors = require('cors');

const rotas = express();

const loginControlador = require('./controladores/login');
const usuariosControlador = require('./controladores/usuarios');
const categoriasControlador = require('./controladores/categorias');
const produtosControlador = require('./controladores/produtos');
const clientesControlador = require('./controladores/clientes');

const validaCorpoRequisicao = require('./intermediarios/validaCorpoRequisicao');
const autenticaUsuario = require('./intermediarios/autenticacao');

const loginSchema = require('./validacoes/loginSchema');
const usuariosSchema = require('./validacoes/usuariosSchema');
const clientesSchema = require('./validacoes/clientesSchema');


rotas.post('/usuario', validaCorpoRequisicao(usuariosSchema), usuariosControlador.cadastrar);
rotas.post('/login', validaCorpoRequisicao(loginSchema), loginControlador);

rotas.use(cors());
rotas.use(autenticaUsuario);

rotas.get('/categoria', categoriasControlador.listar);
rotas.get('/usuario', usuariosControlador.detalharPerfil);
rotas.put('/usuario', validaCorpoRequisicao(usuariosSchema), usuariosControlador.editarPerfil);

rotas.post('/clientes', validaCorpoRequisicao(clientesSchema), clientesControlador.cadastrar);
rotas.get('/clientes', clientesControlador.detalharPerfil);
rotas.put('/clientes', validaCorpoRequisicao(clientesSchema), clientesControlador.editarPerfil);

rotas.get('/produto', produtosControlador.listar);
rotas.delete('/produto/:id', produtosControlador.excluir);

module.exports = rotas;