import { Router } from "express";

import credentialsRouter from "./credentialsRouter";
import authRouter from "./authRouter";

const router = Router();

router.use(credentialsRouter);
router.use(authRouter);

export default router;