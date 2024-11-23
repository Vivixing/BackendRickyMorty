const Joi = require('joi');

const ObtainedCreationSchema = Joi.object({
    characterId: Joi.number().required(),
    location : Joi.object({
        lat: Joi.number().required(),
        lon: Joi.number().required(),
    }).optional(),
    method : Joi.string().required().valid('Captured', 'Exchanged').insensitive(),
    user: Joi.object({
        _id: Joi.string().required(),
    }).required(),
});

const ObtainedUpdateSchema = Joi.object({
    _id: Joi.number().required(),
    characterId: Joi.string(),
    location: Joi.string(),
    method: Joi.string(),
    user: Joi.object({
        _id: Joi.string(),
    }),
});

module.exports = {
    ObtainedCreationSchema,
    ObtainedUpdateSchema,
};