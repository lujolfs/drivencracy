import { pollsCollection, choicesCollection, votesCollection } from "../database/db.js";
import { ObjectId } from "mongodb";
import { query } from "express";
import dayjs from "dayjs";

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
        const choices = await choicesCollection.find(query).toArray();
        return res.send(choices);
    } catch (error) {
        return res.sendStatus(404)
    }
}

export async function postVote(req, res) {
    const vote = req.params.id;
    const docVote = {
        createdAt:  dayjs().format('YYYY-MM-DD hh:mm'),
        choiceId: ObjectId(vote)
    }
    try {
        await votesCollection.insertOne(docVote)
        return res.sendStatus(201);
    } catch (error) {
        return res.sendStatus(404)
    }
}