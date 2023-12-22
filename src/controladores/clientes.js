const knex = require('../bancodedados/conexao');

const clientesControlador = {};

clientesControlador.cadastrar = async function (req, res) {
    const { nome, email, cpf } = req.body;

    try {
        // TODO:as intermedário de validação do email
        const quantidadeClientes = await knex('clientes').where({ email });

        if (quantidadeClientes.length > 0) {
            return res.status(400).json({ mensagem: "O email já existe" });
        }

        const cpfClientes = await knex('clientes').where({ cpf });

        if (cpfClientes.length > 0) {
            return res.status(400).json({ mensagem: "O cpf já existe" });
        }

        const clientes = await knex('clientes').insert({ nome, email, cpf });

        if (clientes === 0) {
            return res.status(400).json({ mensagem: "O cliente não foi cadastrado." });
        }

        return res.status(200).json({ mensagem: "O cliente foi cadastrado com sucesso!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

clientesControlador.detalharPerfil = async (req, res) => {
    const { id } = req.params;

    try {
        const detalharCliente = await knex('clientes').where({ id }).first();

        if (!detalharCliente) {
            return res.status(404).json({ mensagem: 'Não existe cliente para o id informado.' });
        }

        return res.status(200).json(detalharCliente);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

clientesControlador.editarPerfil = async (req, res) => {
    const { id } = req.params;
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    clientesControlador.detalharPerfil = async (req, res) => {
        try {
            const cliente = await knex('clientes').where({ id }).first();
            if (!cliente) {
                return res.status(404).json('O cliente não foi encontrado');
            };

            if (email !== cliente.email) {
                const quantidadeClientes = await knex('clientes').where({ email });

                if (quantidadeClientes.length > 0) {
                    return res.status(400).json({ mensagem: "O email já existe" });
                }
            }

            if (cpf !== cliente.cpf) {
                const cpfClientes = await knex('clientes').where({ cpf });

                if (cpfClientes.length > 0) {
                    return res.status(400).json({ mensagem: "O cpf já existe" });
                }
            }

            await knex('clientes').where({ id })
                .update({
                    nome, email, cpf, cep, rua, numero, bairro, cidade, estado
                });

            return res.status(204).send();
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }


}
clientesControlador.listar = async (req, res) => {

    try {
        const clientes = await knex('clientes');

        return res.status(200).json(clientes);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}

module.exports = clientesControlador