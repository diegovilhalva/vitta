import Joi from "joi";

export const signUpSchema = Joi.object({
    fullName: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.base": "O nome completo deve ser um texto",
            "string.empty": "O nome completo é obrigatório",
            "string.min": "O nome completo deve ter pelo menos 3 caracteres",
            "string.max": "O nome completo deve ter no máximo 50 caracteres",
            "any.required": "O nome completo é obrigatório"
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.base": "O email deve ser um texto",
            "string.empty": "O email é obrigatório",
            "string.email": "O email deve ser um endereço válido",
            "any.required": "O email é obrigatório"
        }),
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            "string.base": "A senha deve ser um texto",
            "string.empty": "A senha é obrigatória",
            "string.min": "A senha deve ter pelo menos 6 caracteres",
            "any.required": "A senha é obrigatória"
        }),
    mobile: Joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .required()
        .messages({
            "string.base": "O número de celular deve ser um texto",
            "string.empty": "O número de celular é obrigatório",
            "string.pattern.base": "O número de celular deve conter entre 10 e 15 dígitos",
            "any.required": "O número de celular é obrigatório"
        }),
    role: Joi.string()
        .valid("user", "owner", "deliveryBoy")
        .required()
        .messages({
            "any.only": "O papel deve ser 'user', 'owner' ou 'deliveryBoy'",
            "any.required": "O papel do usuário é obrigatório"
        })
});
