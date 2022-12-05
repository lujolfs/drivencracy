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