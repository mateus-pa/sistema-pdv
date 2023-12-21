const knex = require('../bancodedados/conexao');
const bcrypt = require('bcrypt');

const usuariosControlador = {};

usuariosControlador.cadastrar = async function (req, res) {
    const { nome, email, senha } = req.body;

    try {
        // TODO:as intermedário de validação do email
        const quantidadeUsuarios = await knex('usuarios').where({ email });

        if (quantidadeUsuarios.length > 0) {
            return res.status(400).json("O email já existe");
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const usuario = await knex('usuarios').insert({ nome, email, senha: senhaCriptografada });

        if (usuario == 0) {
            return res.status(400).json("O usuário não foi cadastrado.");
        }

        return res.status(200).json("O usuario foi cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};
usuariosControlador.detalharPerfil = async (req, res) => {
    try {
        const detalharUsuario = req.usuario;
        return res.status(200).json(detalharUsuario);
    } catch (error) {
        return res.status(401).send()
    }
}

usuariosControlador.editarPerfil = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const verificarEmail = await knex('usuarios').where({ email });
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        if (verificarEmail.length > 0) {
            return res.status(403).json('O email já está cadastrado no sistema');
        }
        await knex('usuarios')
            .update({ nome, email, senha: senhaCriptografada })
            .where({ id: req.usuario.id });
        return res.status(200).send();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

module.exports = usuariosControlador;