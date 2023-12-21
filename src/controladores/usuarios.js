const knex = require('../bancodedados/conexao');
const bcrypt = require('bcrypt');

const usuariosControlador = {};

usuariosControlador.cadastrar = async function (req, res) {
    const { nome, email, senha } = req.body;

    try {
        // TODO: intermedário de validação do email
        const quantidadeUsuarios = await knex('usuarios').where({ email });

        if (quantidadeUsuarios.length > 0) {
            return res.status(400).json("O email já existe");
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const usuario = await knex('usuarios').insert({ nome, email, senha: senhaCriptografada });

        if (usuario === 0) {
            return res.status(400).json("O usuário não foi cadastrado.");
        }

        return res.status(200).json("O usuario foi cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        return res.status(400).json({ mensagem: error.message });
    }
};

module.exports = usuariosControlador;