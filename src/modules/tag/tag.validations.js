import Joi from "joi";



export const addTagValidation = {
    headers: Joi.object({
        authorization: Joi.string(),
        token: Joi.string()
    }).or('authorization', 'token').messages({
        'object.missing': 'Token is required in either authorization or token header'
    }).unknown(true)
    ,
    body: Joi.object({
        name: Joi.string()
            .max(30)
            .required()
            .messages({
                'string.base': 'Tag name must be a string.',
                'string.empty': 'Tag name is required.',
                'string.max': 'Tag name must not exceed 30 characters.',
                'any.required': 'Tag name is required.'
            }),

        color: Joi.string()
            .pattern(/^#([0-9A-Fa-f]{6})$/, { name: 'hex color' })
            .optional()
            .messages({
                'string.pattern.name': 'Color must be a valid hex color like #aabbcc.',
                'string.base': 'Color must be a string.'
            })
    })
};

export const updateTagValidation = {
    headers: Joi.object({
        authorization: Joi.string(),
        token: Joi.string()
    }).or('authorization', 'token').messages({
        'object.missing': 'Token is required in either authorization or token header'
    }).unknown(true)
    ,
    body: Joi.object({
        name: Joi.string()
            .max(30)
            .messages({
                'string.base': 'Tag name must be a string.',
                'string.empty': 'Tag name is required.',
                'string.max': 'Tag name must not exceed 30 characters.',
                'any.required': 'Tag name is required.'
            }),

        color: Joi.string()
            .pattern(/^#([0-9A-Fa-f]{6})$/, { name: 'hex color' })
            .optional()
            .messages({
                'string.pattern.name': 'Color must be a valid hex color like #aabbcc.',
                'string.base': 'Color must be a string.'
            })
    }).min(1)
};

export const getTagsValidation = {
    headers: Joi.object({
        authorization: Joi.string(),
        token: Joi.string()
    }).or('authorization', 'token').messages({
        'object.missing': 'Token is required in either authorization or token header'
    }).unknown(true)

};
export const getTagsByIdValidation = {
    headers: Joi.object({
        authorization: Joi.string(),
        token: Joi.string()
    }).or('authorization', 'token').messages({
        'object.missing': 'Token is required in either authorization or token header'
    }).unknown(true)

};
export const deleteTagValidation = {
    headers: Joi.object({
        authorization: Joi.string(),
        token: Joi.string()
    }).or('authorization', 'token').messages({
        'object.missing': 'Token is required in either authorization or token header'
    }).unknown(true)

};
export const togglePinTagValidation = {
    headers: Joi.object({
        authorization: Joi.string(),
        token: Joi.string()
    }).or('authorization', 'token').messages({
        'object.missing': 'Token is required in either authorization or token header'
    }).unknown(true)

};