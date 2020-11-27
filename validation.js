const Joi = require("joi");

const validate = (pokemon) => {
    const validationSchema = Joi.object({
        name: Joi.object().min(4).max(4).required(),
        type: Joi.array().min(1).max(2).required(),
        base: Joi.object().min(6).max(6).required()
    })
    return validationSchema.validate(pokemon)
}

module.exports = validate;