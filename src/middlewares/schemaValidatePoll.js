import { pollSchema } from "../modules/pollSchema.js"
import dayjs from "dayjs";

export async function schemaValidatePoll (req, res, next) {
    const poll = req.body;
    let pollObject;
    const laterDate = dayjs().add(30, 'day').format('YYYY-MM-DD HH:mm');

    const { error } = pollSchema.validate(poll, {
        abortEarly: false,
    });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    } else if (!poll.expireAt){
        res.locals.user = {
            "title": poll.title,
            "expireAt": laterDate
        }
    }

    next();
    return;

}