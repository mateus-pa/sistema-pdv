const joi = require('joi');

const produtosSchema = joi.object({
    descricao: joi.string().required().messages({
        'any.required': 'O campo descricao é obrigatório.',
        'string.empty': 'O campo descricao é obrigatório.'
    }),

    quantidade_estoque: joi.number().integer().positive().required().messages({
        'any.required': 'O campo quantidade_estoque é obrigatório.',
        'number.base': 'O campo quantidade_estoque necessita ser numérico.',
        'number.integer': 'O campo quantidade_estoque necessita ser um número inteiro.',
        'number.positive': 'O campo quantidade_estoque necessita ser um número inteiro positivo.'
    }),

    valor: joi.number().integer().positive().required().messages({
        'any.required': 'O campo valor é obrigatório.',
        'number.base': 'O campo valor necessita ser numérico.',
        'number.integer': 'O campo valor necessita ser um número inteiro.',
        'number.positive': 'O campo valor necessita ser um número inteiro positivo.'
    }),

    categoria_id: joi.number().integer().positive().required().messages({
        'any.required': 'O campo categoria_id é obrigatório.',
        'number.base': 'O campo categoria_id necessita ser numérico.',
        'number.integer': 'O campo categoria_id necessita ser um número inteiro.',
        'number.positive': 'O campo categoria_id necessita ser um número inteiro positivo.'
    }),
});

module.exports = produtosSchema;