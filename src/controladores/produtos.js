const knex = require('../bancodedados/conexao');

const produtosControlador = {};

produtosControlador.listar = async (req, res) => {
    const { categoria_id } = req.query;

    try {
        let listaProdutos = knex('produtos');

        if (parseInt(categoria_id)) {
            const categoriaExiste = await knex('categorias').where({ id: categoria_id });

            if (categoriaExiste.length === 0) {
                return res.status(400).json({ mensagem: 'Não existe categoria para o id informado.' });
            }

            listaProdutos = listaProdutos.where({ categoria_id });
        }

        return res.status(200).json(await listaProdutos);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}

produtosControlador.excluir = async (req, res) => {
    const { id } = req.params;

    try {
        const produtoExiste = await knex('produtos').where({ id });

        if (produtoExiste.length === 0) {
            return res.status(400).json({ mensagem: 'Não existe produto para o id informado.' });
        }

        await knex('produtos').del().where({ id });

        return res.status(204).send();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}

module.exports = produtosControlador;