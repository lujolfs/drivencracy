import { Router } from "express";
import { schemaValidatePoll } from "../middlewares/schemaValidatePoll.js";
import { schemaValidateChoice } from "../middlewares/schemaValidateChoice.js"
import { postPoll, getPolls, postChoice } from "../controllers/pollControllers.js";

const router = Router();

router.post("/poll", schemaValidatePoll, postPoll);
router.get("/poll", getPolls);
router.post("/choice", schemaValidateChoice);
router.get("/poll/:id/choice");
router.post("/choice/:id/vote");
router.get("/poll/:id/result")

export default router;