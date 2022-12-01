import joi from "joi";

const Joi = require('joi').extend(require('@joi/date'));

export const voteSchema = joi.object({
    _id: joi.string().required(),
    createdAt: Joi.date().required().format('YYYY-MM-DD HH:MM'),
    choiceId: joi.string().required()
});