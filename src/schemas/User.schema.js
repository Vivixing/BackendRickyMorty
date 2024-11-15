const Joi = require("joi");

const UserCreationSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
});

const UserUpdateSchema = Joi.object({
    _id: Joi.string().required(),
    username: Joi.string(),
    password: Joi.string(),
    email: Joi.string().email(),
    firstName: Joi.string(),
    lastName: Joi.string(),
});

module.exports = {
    UserCreationSchema,
    UserUpdateSchema,
};