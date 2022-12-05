import { pollsCollection, choicesCollection, votesCollection, resultsCollection } from "../database/db.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";


export async function postChoice(req, res) {
    const choice = req.body;
    try {
        await choicesCollection.insertOne(choice);
        return res.sendStatus(201);
    }
    catch (error) {
        return res.sendStatus(400);
    }
}

export async function getChoices(req, res) {
    const pollIdRoute = req.params.id;
    const query = {'pollId': pollIdRoute};
    
    
    try {
        await pollsCollection.find({ _id: ObjectId(pollIdRoute) }).toArray();
    } catch (error) {
        return res.sendStatus(404)
    }

    try {
        const choices = await choicesCollection.find(query).toArray();
        return res.send(choices);
    } catch (error) {
        return res.sendStatus(error)
    }
}

export async function postVote(req, res) {
    const vote = req.params.id;
    const updateVote = {
        $inc: {
            votes: +1
        }
    }
    const optionVote = { upsert: true };
    const docVote = {
        createdAt: dayjs().format('YYYY-MM-DD hh:mm'),
        choiceId: ObjectId(vote)
    }
    const checkExistence = await choicesCollection.findOne({_id: ObjectId(vote)});

    try {
        if (!checkExistence) {
            return res.sendStatus(404)
        }
    } catch (error) {
        return res.send(error)
    }

    try {
        const expiryPoll = await pollsCollection.findOne({_id: ObjectId(checkExistence.pollId)});
        const expiryCheck = dayjs().isBefore(expiryPoll.expireAt, 'millisecond');
        if (!expiryCheck) {
            return res.sendStatus(403);
        }
    } catch (error) {
            return res.send(error);
    }

    try {
        await votesCollection.insertOne(docVote)
        await choicesCollection.findOneAndUpdate( {_id: ObjectId(vote)}, updateVote, optionVote )
        return res.sendStatus(201);
    } catch (error) {
        return res.sendStatus(error)
    }
}