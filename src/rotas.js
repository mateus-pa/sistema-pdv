const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rotas = express();

rotas.use(bodyParser.json());
rotas.use(bodyParser.urlencoded({ extended: true }));

const loginControlador = require('./controladores/login');
const usuariosControlador = require('./controladores/usuarios');
const categoriasControlador = require('./controladores/categorias');
const produtosControlador = require('./controladores/produtos');
const clientesControlador = require('./controladores/clientes');
const pedidosControlador = require('./controladores/pedidos');

const validaCorpoRequisicao = require('./intermediarios/validaCorpoRequisicao');
const autenticaUsuario = require('./intermediarios/autenticacao');
const multer = require('./intermediarios/multer');

const loginSchema = require('./validacoes/loginSchema');
const usuariosSchema = require('./validacoes/usuariosSchema');
const produtosSchema = require('./validacoes/produtosSchema');
const clientesSchema = require('./validacoes/clientesSchema');
const pedidosSchema = require('./validacoes/pedidosSchema');



rotas.post('/usuario', validaCorpoRequisicao(usuariosSchema), usuariosControlador.cadastrar);
rotas.post('/login', validaCorpoRequisicao(loginSchema), loginControlador);

rotas.use(cors());
rotas.use(autenticaUsuario);

rotas.get('/categorias', categoriasControlador.listar);
rotas.get('/usuario', usuariosControlador.detalharPerfil);
rotas.put('/usuario', validaCorpoRequisicao(usuariosSchema), usuariosControlador.editarPerfil);

rotas.post('/produto', multer.single('produto_imagem'), validaCorpoRequisicao(produtosSchema), produtosControlador.cadastrar);
rotas.put('/produto/:id', multer.single('produto_imagem'), validaCorpoRequisicao(produtosSchema), produtosControlador.editar);
rotas.get('/produto', produtosControlador.listar);
rotas.get('/produto/:id', produtosControlador.detalhar);
rotas.delete('/produto/:id', produtosControlador.excluir);

rotas.get('/cliente/:id', clientesControlador.detalharPerfil);
rotas.put('/cliente/:id', validaCorpoRequisicao(clientesSchema), clientesControlador.editarPerfil);
rotas.post('/cliente', validaCorpoRequisicao(clientesSchema), clientesControlador.cadastrar);
rotas.get('/cliente', clientesControlador.listar);

rotas.post('/pedidos', validaCorpoRequisicao(pedidosSchema), pedidosControlador.cadastrar);
rotas.get('/pedidos', pedidosControlador.listar);


module.exports = rotas;
