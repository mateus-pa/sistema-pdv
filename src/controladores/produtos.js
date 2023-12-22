const knex = require('../bancodedados/conexao');

const produtosControlador = {};

produtosControlador.cadastrar = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
        const categoriaExiste = await knex('categorias').where({ id: categoria_id }).first()

        if (!categoriaExiste) {
            return res.status(400).json('A categoria não existe em nossa base de dados!')
        };

        const produtoDuplicado = await knex('produtos').where({ descricao }).first();
        if (produtoDuplicado) {
            return res.status(201).json('O produto já está cadastrado na nossa base de dados e foi duplicado!');
        };

        const novoProduto = await knex('produtos').insert({
            descricao,
            quantidade_estoque,
            valor,
            categoria_id
        });

        if (!novoProduto) {
            return res.status(400).json('O produto não foi cadastrado!');
        }

    } catch (error) {
        console.error(error)
        return res.status(500).send();
    }
};

produtosControlador.editar = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body
    const { id } = req.params

    try {

        if (!descricao || !quantidade_estoque || !valor) {
            res.status(400).json('O campo é obrigatório!')
        }
        const categoriaExiste = await knex('categorias').where({ id: categoria_id }).first();
        if (!categoriaExiste) {
            return res.status(400).json('A categoria não existe em nossa base de dados!')
        };

        const produto = await knex('produtos').where({ id }).first();
        if (!produto) {
            res.status(400).json('O produto não está cadastrado!')
        };

        await knex('produtos')
            .where({ id })
            .update
            ({
                descricao,
                quantidade_estoque,
                valor,
                categoria_id
            });

        const produtoEditado = await knex('produtos').where({ id }).first();
        return res.status(200).json('Poduto atualizado com sucesso!', produtoEditado);

    } catch (error) {
        return res.status(500).send();
    }
}

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
        return res.status(500).json({ message: 'Erro interno do servidor' });
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
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

module.exports = produtosControlador;