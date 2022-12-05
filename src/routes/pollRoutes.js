import { Router } from "express";
import { schemaValidatePoll } from "../middlewares/schemaValidatePoll.js";
import { postPoll, getPolls, getResults } from "../controllers/pollControllers.js";

const router = Router();

router.post("/poll", schemaValidatePoll, postPoll);
router.get("/poll", getPolls);
router.get("/poll/:id/result", getResults);

export default router;