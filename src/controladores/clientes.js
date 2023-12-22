const knex = require('../bancodedados/conexao');

clientesControlador = {};

clientesControlador.editar = async (req, res) => {
    const { id } = req.params;
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;


    try {
        const cliente = await knex('clientes').where({ id }).first();
        if (!cliente) {
            return res.status(404).json('O cliente não foi encontrado')
        };

        await knex('clientes').where({ id })
            .update({
                nome, email, cpf, cep, rua, numero, bairro, cidade, estado
            })
        return res.status(200).json('Cliente atualizado com sucesso!');

    } catch (error) {
        console.error(error);
        return res.status(500).send()
    }

}



module.exports = clientesControlador;