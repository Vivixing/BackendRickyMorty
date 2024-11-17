const Joi = require("joi");

const FavoriteCreationSchema = Joi.object({
    characterId: Joi.number().required(),
    user: Joi.object({
        _id: Joi.string().required(),
    }).required(),
});

const FavoriteUpdateSchema = Joi.object({
    _id: Joi.string().required(),
    characterId: Joi.number(),
    user: Joi.object({
        _id: Joi.string().required(),
    }).required(),
});

module.exports = {
    FavoriteCreationSchema,
    FavoriteUpdateSchema,
};