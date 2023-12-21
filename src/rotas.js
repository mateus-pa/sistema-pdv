const express = require('express');

const rotas = express();

const loginController = require('./controladores/login');
const usuariosController = require('./controladores/usuarios');

module.exports = rotas;