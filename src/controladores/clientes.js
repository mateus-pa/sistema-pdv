const knex = require('../bancodedados/conexao');

const clientesControlador = {};

clientesControlador.cadastrar = async function (req, res) {
    const { nome, email, cpf } = req.body;

    try {
        // TODO:as intermedário de validação do email
        const quantidadeClientes = await knex('clientes').where({ email });

        if (quantidadeClientes.length > 0) {
            return res.status(400).json("O email já existe");
        }

        const cpfClientes = await knex('clientes').where({ cpf });

        if (cpfClientes.length > 0) {
            return res.status(400).json("O cpf já existe");
        }

        const clientes = await knex('clientes').insert({ nome, email, cpf });

        if ( clientes == 0) {
            return res.status(400).json("O cliente não foi cadastrado.");
        }

        return res.status(200).json("O cliente foi cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};
clientesControlador.detalharPerfil = async (req, res) => {
    try {
        const detalharCliente = req.cliente;
        return res.status(200).json(detalharCliente);
    } catch (error) {
        return res.status(401).send()
    }
}

clientesControlador.editarPerfil = async (req, res) => {
    const { nome, email, cpf } = req.body;

    try {
        const verificarCpf = await knex('clientes').where({ cpf });
        
        if (verificarCpf.length > 0) {
            return res.status(403).json('O email já está cadastrado no sistema');
        }
        await knex('clientes')
            .update({ nome, email, cpf })
            .where({ id: req.usuario.id });
        return res.status(204).send();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

clientesControlador.listar = async (req, res) => {
    try {
        const clientes = await knex('clientes');

        return res.status(200).json(clientes);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}

module.exports = clientesControlador;