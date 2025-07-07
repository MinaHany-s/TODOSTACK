import Joi from 'joi';
import generalField from '../../constants/generalFields.js';

export const signUpValidation = {
    body: Joi.object({
        name: Joi.string()
            .min(3)
            .max(20)
            .trim()
            .required()
            .messages({
                'any.required': 'Name is required',
                'string.empty': 'Name cannot be empty',
                'string.min': 'Name must be at least {#limit} characters',
                'string.max': 'Name must be at most {#limit} characters',
            }),

        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required()
            .messages({
                'any.required': 'Email is required',
                'string.empty': 'Email cannot be empty',
                'string.email': 'Email must be a valid email address',
            }),

        password: Joi.string()
            .min(6)
            .required()
            .messages({
                'any.required': 'Password is required',
                'string.empty': 'Password cannot be empty',
                'string.min': 'Password must be at least {#limit} characters long',
            }),

        confirmPassword: Joi.string()
            .valid(Joi.ref('password'))
            .required()
            .messages({
                'any.only': 'Passwords do not match',
                'any.required': 'Confirm password is required',
                'string.empty': 'Confirm password cannot be empty',
            }),

        birthDate: Joi.date()
            .iso()
            .required()
            .messages({
                'any.required': 'Birth date is required',
                'date.base': 'Birth date must be a valid date',
                'date.format': 'Birth date must be in ISO format (YYYY-MM-DD)',
            }),
    }).with('password', 'confirmPassword') // Ensures confirmPassword exists when password exists
};

export const verifyEmailValidation = {
    params: Joi.object({
        token: Joi.string()
            .required()
            .messages({
                "any.required": "Token is required",
                "string.empty": "Token cannot be empty",
            }),
    }),
};


export const forgetPasswordValidation = {
    body: Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required()
            .messages({
                'any.required': 'Email is required',
                'string.empty': 'Email cannot be empty',
                'string.email': 'Email must be a valid email address',
            }),
    })
};

export const resetPasswordValidation = {
    body: Joi.object({
        OTP: Joi.string()
            .length(6)
            .pattern(/^\d{6}$/)
            .required()
            .messages({
                "string.empty": "OTP cannot be empty.",
                "string.length": "OTP must be exactly 6 digits.",
                "string.pattern.base": "OTP must contain only numbers.",
                "any.required": "OTP is required."
            }),
        email: generalField.email.
            messages({
                "any.required": "Email is required",
                "string.empty": "Email cannot be empty",
                "string.email": "Email must be a valid email address",
                "string.pattern.base": "Only Gmail addresses are allowed"
            }),
        newPassword: generalField.password.
            messages({
                "any.required": "Password is required",
                "string.empty": "Password cannot be empty",
                "string.min": "Password must be at least {#limit} characters long",
                "string.max": "Password cannot exceed {#limit} characters",
                "string.pattern.base": "Password must contain at least one letter, one number, and one special character (@$!%*?&)"
            }),
        cPassword: Joi.string().valid(Joi.ref('newPassword')).required().
            messages({
                "any.required": "Confirm password is required",
                "any.only": "Passwords do not match"
            }),
    })
};
export const logInValidation = {
    body: Joi.object({
        email: generalField.email.
            messages({
                "any.required": "Email is required",
                "string.empty": "Email cannot be empty",
                "string.email": "Email must be a valid email address",
                "string.pattern.base": "Only Gmail addresses are allowed"
            }),
        password: Joi.string()
            .min(6)
            .required()
            .messages({
                'any.required': 'Password is required',
                'string.empty': 'Password cannot be empty',
                'string.min': 'Password must be at least {#limit} characters long',
            }),

    })
};

export const logOutValidation = {
    headers: Joi.object({
        authorization: Joi.string(),
        token: Joi.string()
    }).or('authorization', 'token').messages({
        'object.missing': 'Token is required in either authorization or token header'
    }).unknown(true)
};
export const getProfileValidation = {
    headers: Joi.object({
        authorization: Joi.string(),
        token: Joi.string()
    }).or('authorization', 'token').messages({
        'object.missing': 'Token is required in either authorization or token header'
    }).unknown(true)
};


export const updateProfileValidation = {
    headers: Joi.object({
        authorization: Joi.string(),
        token: Joi.string()
    }).or('authorization', 'token').messages({
        'object.missing': 'Token is required in either authorization or token header'
    }).unknown(true)
    ,
    body: Joi.object({
        name: Joi.string()
            .min(3)
            .max(20)
            .messages({
                "string.base": "Name must be a string",
                "string.min": "Name must be at least 3 characters",
                "string.max": "Name must be at most 20 characters",
            }),

        password: Joi.string()
            .min(6)
            .messages({
                "string.min": "Password must be at least 6 characters",
            }),

        confirmPassword: Joi.any()
            .valid(Joi.ref("password"))
            .when("password", {
                is: Joi.exist(),
                then: Joi.required(),
                otherwise: Joi.forbidden(),
            })
            .messages({
                "any.only": "Passwords do not match",
                "any.required": "Confirm password is required when updating password",
            }),

        birthDate: Joi.date()
            .iso()
            .messages({
                "date.base": "Birth date must be a valid date",
                "date.format": "Birth date must be in ISO format (YYYY-MM-DD)",
            }),

        role: Joi.string()
            .valid("user", "admin", "superadmin")
            .messages({
                "any.only": "Role must be one of [user, admin, superadmin]",
            }),
    }).min(1)
};
export const changePasswordValidation = {
    headers: Joi.object({
        authorization: Joi.string(),
        token: Joi.string()
    }).or('authorization', 'token').messages({
        'object.missing': 'Token is required in either authorization or token header'
    }).unknown(true)
    ,
    body: Joi.object({
        password: Joi.string()
            .min(6)
            .required()
            .messages({
                'any.required': 'Password is required',
                'string.empty': 'Password cannot be empty',
                'string.min': 'Password must be at least {#limit} characters long',
            }),

        confirmPassword: Joi.string()
            .valid(Joi.ref('password'))
            .required()
            .messages({
                'any.only': 'Passwords do not match',
                'any.required': 'Confirm password is required',
                'string.empty': 'Confirm password cannot be empty',
            }),

    })
};