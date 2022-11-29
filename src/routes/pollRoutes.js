import { Router } from "express";

const router = Router();

router.post("/poll");
router.get("/poll");
router.post("/choice");
router.get("/poll/:id/choice");
router.post("/choice/:id/vote");
router.get("/poll/:id/result")

export default router;