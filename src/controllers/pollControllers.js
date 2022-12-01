import { ObjectID } from "mongodb";
import { pollsCollection } from "../database/db.js";

export async function postPoll(req, res) {
    const pollObject = req.body;
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