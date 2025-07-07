import Joi from 'joi';

export const addReminderValidation = {
    headers: Joi.object({
        authorization: Joi.string(),
        token: Joi.string()
    }).or('authorization', 'token').messages({
        'object.missing': 'Token is required in either authorization or token header'
    }).unknown(true),

    body: Joi.object({
        remindAt: Joi.date().iso().required().messages({
            'any.required': 'remindAt is required',
            'date.base': 'remindAt must be a valid ISO date'
        }),
        message: Joi.string().min(1).required().messages({
            'any.required': 'message is required',
            'string.empty': 'message cannot be empty'
        })
    })
};


export const deleteReminderValidation = {
    headers: Joi.object({
        authorization: Joi.string(),
        token: Joi.string()
    })
        .or('authorization', 'token')
        .messages({
            'object.missing': 'Token is required in either authorization or token header',
        })
        .unknown(true),

};
