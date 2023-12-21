const knex = require('../bancodedados/conexao');
const jwt = require('jsonwebtoken');

const autenticaUsuario = async (req, res, next) => {
    const { authorization } = req.headers;

    try {
        if (!authorization) {
            return res.status(401).json({ mensagem: 'Para acessar este recurso, um token de autenticação válido deve ser enviado.' });
        }

        const token = authorization.split(' ')[1];

        const { id } = jwt.verify(token, process.env.JWT_PASS);

        const usuario = await knex('usuarios').where({ id }).first();

        if (usuario.length === 0) {
            return res.status(401).json({ mensagem: 'Para acessar este recurso, um token de autenticação válido deve ser enviado.' });
        }

        const { senha, ...dadosUsuario } = usuario;

        req.usuario = dadosUsuario;

        next();
    } catch (error) {
        if (jwt.JsonWebTokenError) {
            return res.status(401).json({ mensagem: 'Para acessar este recurso, um token de autenticação válido deve ser enviado.' });
        }

        console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}

module.exports = autenticaUsuario;