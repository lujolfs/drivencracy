import BaseJoi from "joi";
import JoiDate from '@joi/date';

const Joi = BaseJoi.extend(JoiDate);

export const pollSchema = Joi.object({
    title: Joi.string().required(),
    expireAt: Joi.date().format('YYYY-MM-DD hh:mm').required()
});