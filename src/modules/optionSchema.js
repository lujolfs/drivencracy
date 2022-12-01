import joi from "joi";

const Joi = require('joi').extend(require('@joi/date'));

export const optionSchema = joi.object({
    _id: joi.string().required(),
    title: joi.string().required(),
    pollId: joi.string().required()
});