const Joi = require("joi");

const AuctionCreationSchema = Joi.object({
    character1Id: Joi.number().required(),
    character2Id: Joi.number().required(),
    auctionCreator: Joi.object({
        _id: Joi.string().required(),
    }).required(),
});

const AuctionUpdateSchema = Joi.object({
    _id: Joi.string().required(),
    character1Id: Joi.number(),
    character2Id: Joi.number(),
    auctionCreator: Joi.string(),
    acquirer: Joi.string(),
    completed: Joi.boolean(),
    endDate: Joi.date(),
});

module.exports = {
    AuctionCreationSchema,
    AuctionUpdateSchema,
};