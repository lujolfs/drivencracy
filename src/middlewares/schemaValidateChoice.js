import { pollsCollection } from "../database/db.js";
import { choiceSchema } from "../modules/choiceSchema.js"
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

export async function schemaValidateChoice (req, res, next) {
    const poll = req.body;
    const filter = poll.pollId;

    const { error } = choiceSchema.validate(poll, {
        abortEarly: false,
    });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    try {
        await pollsCollection.findOne( {_id: ObjectId(filter)} );
        next();
    } catch (error) {
        return res.sendStatus(404);
    }
}