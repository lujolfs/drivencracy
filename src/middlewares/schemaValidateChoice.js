import { pollsCollection } from "../database/db.js";
import { choiceSchema } from "../modules/choiceSchema.js"
import dayjs from "dayjs";

export async function schemaValidateChoice (req, res, next) {
    const poll = req.body;
    const filter = poll.pollId;
    const day = dayjs().format('YYYY-MM-DD mm:ss');

    const { error } = choiceSchema.validate(poll, {
        abortEarly: false,
    });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    try {
        const pollExists = await pollsCollection.findOne( {pollId: filter} );
        if (day.diff(pollExists.expireAt) > 0) {
            return res.sendStatus(403);
        }
    } catch (error) {
        return res.sendStatus(404);
    }
}