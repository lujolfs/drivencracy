import { pollSchema } from "../modules/pollSchema.js"

export async function schemaValidatePoll (req, res, next) {
    const poll = req.body;

    const { error } = pollSchema.validate(poll, {
        abortEarly: false,
    });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    next();
    return;

}