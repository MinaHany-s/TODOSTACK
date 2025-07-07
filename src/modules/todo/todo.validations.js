import Joi from 'joi';
import mongoose from 'mongoose';

const isValidObjectId = (value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
    }
    return value;
};

export const addTodoValidation = {
    headers: Joi.object({
        authorization: Joi.string(),
        token: Joi.string()
    }).or('authorization', 'token').messages({
        'object.missing': 'Token is required in either authorization or token header'
    }).unknown(true),

    body: Joi.object({
        title: Joi.string()
            .max(100)
            .required()
            .messages({
                'string.base': 'Title must be a string',
                'string.max': 'Title must be at most 100 characters',
                'any.required': 'Title is required',
            }),

        description: Joi.string()
            .max(1000)
            .allow('')
            .messages({
                'string.max': 'Description must be at most 1000 characters',
            }),

        dueDate: Joi.date()
            .iso()
            .required()
            .messages({
                'date.base': 'Due date must be a valid date',
                'any.required': 'Due date is required',
            }),

        isCompleted: Joi.boolean(),

        photo: Joi.array().items(
            Joi.object({
                secure_url: Joi.string().uri().required(),
                public_id: Joi.string().required(),
            })
        ).optional().messages({
            'array.base': 'Photo must be an array of image objects',
        }),

        tag: Joi.string()
            .custom(isValidObjectId, 'ObjectId validation')
            .allow(null)
            .messages({
                'string.base': 'Tag must be a string',
                'any.invalid': 'Tag must be a valid ObjectId',
            }),

        reminder: Joi.string()
            .custom(isValidObjectId, 'ObjectId validation')
            .allow(null)
            .messages({
                'any.invalid': 'Reminder must be a valid ObjectId',
            }),
    })
};
export const updateTodoValidation = {
    headers: Joi.object({
        authorization: Joi.string(),
        token: Joi.string()
    }).or('authorization', 'token').messages({
        'object.missing': 'Token is required in either authorization or token header'
    }).unknown(true),

    body: Joi.object({
        title: Joi.string()
            .max(100)
            .messages({
                'string.base': 'Title must be a string',
                'string.max': 'Title must be at most 100 characters',
            }),

        description: Joi.string()
            .max(1000)
            .allow('')
            .messages({
                'string.max': 'Description must be at most 1000 characters',
            }),

        dueDate: Joi.date()
            .iso()
            .messages({
                'date.base': 'Due date must be a valid date',
            }),

        isCompleted: Joi.boolean(),

        photo: Joi.array().items(
            Joi.object({
                secure_url: Joi.string().uri().required(),
                public_id: Joi.string().required(),
            })
        ).optional().messages({
            'array.base': 'Photo must be an array of image objects',
        }),

        tag: Joi.string()
            .custom(isValidObjectId, 'ObjectId validation')
            .allow(null)
            .messages({
                'string.base': 'Tag must be a string',
                'any.invalid': 'Tag must be a valid ObjectId',
            }),

        reminder: Joi.string()
            .custom(isValidObjectId, 'ObjectId validation')
            .allow(null)
            .messages({
                'any.invalid': 'Reminder must be a valid ObjectId',
            }),
    })
};

export const deleteTodoValidation = {
    headers: Joi.object({
        authorization: Joi.string(),
        token: Joi.string()
    }).or('authorization', 'token').messages({
        'object.missing': 'Token is required in either authorization or token header'
    }).unknown(true),
};

export const getAllTodosValidation = {
    headers: Joi.object({
        authorization: Joi.string(),
        token: Joi.string()
    }).or('authorization', 'token').messages({
        'object.missing': 'Token is required in either authorization or token header'
    }).unknown(true),
};
export const toggleCompleteTodoValidation = {
    headers: Joi.object({
        authorization: Joi.string(),
        token: Joi.string()
    }).or('authorization', 'token').messages({
        'object.missing': 'Token is required in either authorization or token header'
    }).unknown(true),
};
