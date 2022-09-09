import { Router } from "express";

import credentialsRouter from "./credentialsRouter";
import safeNotesRouter from "./safeNotesRouter";
import authRouter from "./authRouter";
import wifiRouter from "./wifiRouter";
import cardRouter from "./cardRouter";

const router = Router();

router.use(credentialsRouter);
router.use(safeNotesRouter);
router.use(authRouter);
router.use(wifiRouter);
router.use(cardRouter);

export default router;