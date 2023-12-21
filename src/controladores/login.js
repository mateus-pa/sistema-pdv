const knex = require('../bancodedados/conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await knex('usuarios').where({ email }).first();

        if (usuario.length === 0) {
            return res
                .status(400)
                .json({ mensagem: 'Usuário e/ou senha inválido(s).' });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res
                .status(400)
                .json({ mensagem: 'Usuário e/ou senha inválido(s).' });
        }

        const token = jwt.sign({ id: usuario.id }, process.env.JWT_PASS, {
            expiresIn: '8h',
        });

        const { senha: senhaUsuario, ...dadosUsuario } = usuario;

        return res.status(200).json({
            usuario: dadosUsuario,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: 'erro interno no servidor' });
    }
};

module.exports = login;