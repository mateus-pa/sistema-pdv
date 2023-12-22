const joi = require('joi');

const pedidosSchema = joi.object({
    cliente_id: joi.number().integer().positive().required().messages({
        'number.base': 'O ID do cliente tem que ser um número inteiro e positivo',
        'any.required': 'O ID do cliente é obrigatório',
    }),
    observacao: joi.string().optional(),

    pedido_produtos: joi.array().items(joi.object({
        produto_id: joi.number().integer().positive().required().messages({
            'number.base': 'O ID do produto deve ser um número inteiro e positivo',
            'any.required': 'O Id do produto é obrigatório'
        }),
        quantidade_produto: joi.number().integer().positive().required().messages({
            'number.base': 'A quantidade do produto deve ser um número inteiro e positivo',
            'any.required': 'A quantidade de produtos é obrigatória',
        }),
    })).min(1).required().messages({
        'array.min': 'Ao menos um produto dever adicionado ao pedido',
        'any.required': 'O produto no pedido é obrigatório',
    }),
});

module.exports = pedidosSchema;