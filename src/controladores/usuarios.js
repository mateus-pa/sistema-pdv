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
usuariosControlador.detalharPerfil = async (req, res) => {
    const detalharUsuario = req.usuario;

    return res.status(200).json(detalharUsuario);
}

usuariosControlador.editarPerfil = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        if (!nome) {
            return res.status(400).json({ mensagem: 'Campo nome é obrigatório!' })
        }
        if (!email) {
            return res.status(400).json({ mensagem: 'Campo email é obrigatório!' })
        }
        if (!senha) {
            return res.status(400).json({ mensagem: 'Campo senha é obrigatório!' })
        }
    }
    catch (erro) {
        console.log(erro);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}
// - Validar os campos obrigatórios: 
//     - nome
//     - email
//     - senha
// - A senha deve ser criptografada utilizando algum algoritmo de criptografia confiável.
// - O campo e-mail no banco de dados deve ser único para cada registro, não permitindo dois usuários possuírem o mesmo e-mail.
module.exports = usuariosControlador;