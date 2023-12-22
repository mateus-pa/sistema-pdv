const joi = require('joi');

const produtoSchema = joi.object({
    descricao: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório',
        'string.empty': 'O campo nome é obrigatório'
    }),

    quantidade_estoque: joi.number().integer().min(0).required().messages({
        'any.required': 'O campo quantidade_estoque é obrigatório',
        'number.base': 'O campo quantidade_estoque deve ser um número',
        'number.interger': 'O campo quantidade_estoque deve ser um número inteiro',
        'numbem.min': 'O campo quantidade_estoque deve ser maior que 0'
    }),

    valor: joi.number().positive().required().messages({
        'any.required': 'O campo valor é obrigatório',
        'number.base': 'O campo valor deve ser um número positivo'
    }),

    categoria_id: joi.number().integer().min(1).required().messages({
        'any.required': 'O campo categoria_id é obrigatório',
        'number.base': 'O campo categoria_id deve ser um número inteiro',
        'number.integer': 'O campo categoria_id deve ser um número inteiro',
        'number.min': 'O campo categoria_id deve ser maior que 0'
    })
});

module.exports = produtoSchema;