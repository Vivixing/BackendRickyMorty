const Joi = require("joi");

const AuctionCreationSchema = Joi.object({
    character1Id: Joi.number().required(),
    character2Id: Joi.number().required(),
    auctionCreator: Joi.object({
        _id: Joi.string().required(),
    }).required(),
    acquirer: Joi.object({
        _id: Joi.string().required(),
    }).optional(),
});

const AuctionUpdateSchema = Joi.object({
    _id: Joi.string().required(),
    character1Id: Joi.number(),
    character2Id: Joi.number(),
    auctionCreator: Joi.object({
        _id: Joi.string().required(),
    }),
    acquirer: Joi.object({
        _id: Joi.string().required(),
    }),
    completed: Joi.boolean(),
    endDate: Joi.date(),
});

module.exports = {
    AuctionCreationSchema,
    AuctionUpdateSchema,
};