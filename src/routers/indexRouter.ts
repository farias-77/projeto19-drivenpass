import { Router } from "express";

import credentialsRouter from "./credentialsRouter";
import safeNotesRouter from "./safeNotesRouter";
import authRouter from "./authRouter";
import wifiRouter from "./wifiRouter";

const router = Router();

router.use(credentialsRouter);
router.use(safeNotesRouter);
router.use(authRouter);
router.use(wifiRouter);

export default router;