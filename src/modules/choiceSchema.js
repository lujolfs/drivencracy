import BaseJoi from "joi";

const Joi = BaseJoi;

export const choiceSchema = Joi.object({
    title: Joi.string().required(),
    pollId: Joi.string().required()
});