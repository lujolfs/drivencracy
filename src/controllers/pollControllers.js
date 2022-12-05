import { pollsCollection, choicesCollection, votesCollection, resultsCollection } from "../database/db.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

export async function postPoll(req, res) {
    const pollObject = res.locals.user;
    try {
        await pollsCollection.insertOne(pollObject);
        return res.sendStatus(201);
    } catch (error) {
        return res.sendStatus(401);
    }
}

export async function getPolls(req, res) {
    try {
    const polls = await pollsCollection
    .find()
    .toArray();
    return res.send(polls);
    } catch(error) {
        return res.sendStatus(400);
    }
}

export async function getResults(req, res) {
    const poll = req.params.id;
    const pollQuery = {_id: ObjectId(poll)}
    const choiceQueryId = {'pollId': poll};
    var resultObject = {
        title: "",
        expireAt: "",
        result: {
            title: "",
            votes: ""
        }
    }
    try {
        const selectPoll = await pollsCollection.find(pollQuery).toArray();
        const selectChoice = await choicesCollection.find(choiceQueryId).sort({votes: -1}).limit(1).toArray();
        resultObject.title = selectPoll[0].title;
        resultObject.expireAt = selectPoll[0].expireAt;
        resultObject.result.title = selectChoice[0].title;
        resultObject.result.votes = selectChoice[0].votes;
        resultsCollection.insertOne(resultObject)
        return res.send(resultObject);
    } catch (error) {
        return res.sendStatus(404);
    }
}