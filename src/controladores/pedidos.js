const { required } = require('joi');

const knex = require('../bancodedados/conexao');

const transport = require('./mail');

const pedidosControlador = {};


pedidosControlador.cadastrar = async (req, res) => {
    try {

        const { cliente_id, observacao, pedido_produtos } = req.body;

        const cliente = await knex('clientes').where({ id: cliente_id }).first()
        if (!cliente) {
            return res.status(400).json('Insira um ID de cliente válido!')
        };

        if (!pedido_produtos || pedido_produtos.length === 0) {
            return res.status(400).json('Por favor, insira ao menos um produto ao seu pedido.')
        };

        const produtos = await knex('produtos').whereIn('id', pedido_produtos.map(item => item.produto_id));

        const produtosPromises = pedido_produtos.map(async ({ produto_id, quantidade_produto }) => {
            const produto = await knex('produtos').where({ id: produto_id }).first();
            if (!produto) {
                throw new Error('O produto não é válido');
            };
            if (produto.quantidade_estoque < quantidade_produto) {
                throw new Error('A quantidade em estoque é insuficiente para o pedido');
            };
        });
        await Promise.all(produtosPromises);


        const valor_total = pedido_produtos.reduce((total, { produto_id, quantidade_produto }) => {
            const produto = produtos.find((prod) => prod.id === produto_id);
            return total + produto.valor * quantidade_produto
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
                from: `${process.env.MAIL_NAME} <{${process.env.MAIL_FROM}>`,
                to: destinatarioEmail,
                subject: 'Pedido processado',
                text: 'O seu pedido foi cadastrado com sucesso'
            });

            await trx.commit();
        });

        return res.status(201).json({ message: 'Pedido cadastrado com sucesso!', pedido_id: inserirPedidoId })

    } catch (error) {
        console.log(error);
        return res.status(500).json('Erro interno de servidor')
    }

}


module.exports = pedidosControlador