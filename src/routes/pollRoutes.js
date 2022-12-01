import { Router } from "express";
import { schemaValidatePoll } from "../middlewares/schemaValidatePoll.js";
import { postPoll, getPolls } from "../controllers/pollControllers.js";

const router = Router();

router.post("/poll", schemaValidatePoll, postPoll);
router.get("/poll", getPolls);
router.post("/choice");
router.get("/poll/:id/choice");
router.post("/choice/:id/vote");
router.get("/poll/:id/result")

export default router;