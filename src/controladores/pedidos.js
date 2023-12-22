const { required } = require('joi');
const { produtosControlador } = require('./produtos');
const knex = require('../bancodedados/conexao');
const transport = require('./mail');


const pedidosControlador = {};


pedidosControlador.cadastrar = async (req, res) => {
    try {
        const { cliente_id, observacao, pedido_produtos } = req.body;

        const cliente = await knex('clientes').where({ id: cliente_id }).first();
        if (!cliente) {
            return res.status(400).json({ error: 'Insira um ID de cliente válido!' });
        }

        if (!pedido_produtos || pedido_produtos.length === 0) {
            return res.status(400).json({ error: 'Por favor, insira ao menos um produto ao seu pedido.' });
        }

        const produtos = await knex('produtos').whereIn('id', pedido_produtos.map(item => item.produto_id));

        const erros = [];

        const produtosPromises = pedido_produtos.map(async ({ produto_id, quantidade_produto }) => {
            const produto = produtos.find((prod) => prod.id === produto_id);
            if (!produto) {
                erros.push({ error: 'O produto não é válido', produto_id });
            } else if (produto.quantidade_estoque < quantidade_produto) {
                erros.push({ error: 'A quantidade em estoque é insuficiente para o pedido', produto_id });
            }
        });

        await Promise.all(produtosPromises);

        if (erros.length > 0) {
            return res.status(400).json(erros);
        }

        const valor_total = pedido_produtos.reduce((total, { produto_id, quantidade_produto }) => {
            const produto = produtos.find((prod) => prod.id === produto_id);
            return total + (produto ? produto.valor * quantidade_produto : 0);
        }, 0);

        const novoPedido = {
            cliente_id,
            observacao,
            valor_total
        };

        let inserirPedidoId;

        await knex.transaction(async (trx) => {
            inserirPedidoId = await trx('pedidos').insert(novoPedido);

            const destinatarioEmail = cliente.email;
            transport.sendMail({
                from: `${process.env.MAIL_NAME} <${process.env.MAIL_FROM}>`,
                to: destinatarioEmail,
                subject: 'Pedido processado',
                text: 'O seu pedido foi cadastrado com sucesso'
            });

            await trx.commit();
        });

        return res.status(201).json({ message: 'Pedido cadastrado com sucesso!', pedido_id: inserirPedidoId });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro interno de servidor' });
    }
};


pedidosControlador.listar = async (req, res) => {
    const { cliente_id } = req.query

    try {
        let pedidosEProdutos = [];

        if (cliente_id) {
            const pedido = await knex('pedidos').where({ cliente_id }).first()

            if (!pedido) {
                return res.status(400).json({ message: 'Nenhum pedido para este cliente' })
            }

            const pedido_produtos = await knex('pedido_produtos')
                .where({ pedido_id: pedido.id }).select('*')

            pedidosEProdutos.push({ ...pedido, pedido_produtos })
        } else {
            pedidosEProdutos = await knex('pedidos')

            if (pedidosEProdutos.length === 0) {
                return res.status(400).json({ message: 'Nenhum pedido foi encontrado' })
            }

            for (let i = 0; i < pedidosEProdutos.length; i++) {
                const pedido_produtos = await knex('pedido_produtos')
                    .where({ pedido_id: pedidosEProdutos[i].id }).select('*')

                pedidosEProdutos[i].pedido_produtos = pedido_produtos
            }
        }
        return res.status(200).json(pedidosEProdutos)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error }, 'Erro interno de servidor')
    }
}

module.exports = pedidosControlador