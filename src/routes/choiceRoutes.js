import { Router } from "express";
import { schemaValidateChoice } from "../middlewares/schemaValidateChoice.js"
import { postChoice, getChoices, postVote } from "../controllers/choiceControllers.js";

const router = Router();

router.post("/choice", schemaValidateChoice, postChoice);
router.get("/poll/:id/choice", getChoices);
router.post("/choice/:id/vote", postVote);

export default router;