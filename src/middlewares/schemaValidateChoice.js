import { choicesCollection, pollsCollection } from "../database/db.js";
import { choiceSchema } from "../modules/choiceSchema.js"
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

export async function schemaValidateChoice(req, res, next) {
    const poll = req.body;
    const filter = poll.pollId;
    const checkPoll = await pollsCollection.find({ _id: ObjectId(filter) }).toArray();
    const sameName = await choicesCollection.find({ _id: ObjectId(filter) }, { title: poll.title }).toArray();
    const expireDate = dayjs(checkPoll[0].expireAt).format('YYYY-MM-DD HH:mm');
    const dateCheck = dayjs().isBefore(expireDate, 'milisecond')

    const { error } = choiceSchema.validate(poll, {
        abortEarly: false,
    });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    try {
        if (!dateCheck) {
            return res.sendStatus(403);
        }
    } catch (error) {
        return res.send(error);
    }

    try {
        
        if (sameName.length !== 0) {
            return res.sendStatus(409);
        }
    } catch (error) {
        return res.send(error)
    }
    
    next();
}