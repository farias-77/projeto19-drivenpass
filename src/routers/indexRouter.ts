import { Router } from "express";

import credentialsRouter from "./credentialsRouter";
import safeNotesRouter from "./safeNotesRouter";
import authRouter from "./authRouter";

const router = Router();

router.use(credentialsRouter);
router.use(safeNotesRouter);
router.use(authRouter);

export default router;