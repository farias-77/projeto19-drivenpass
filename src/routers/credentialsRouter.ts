import { schemaValidation } from "../middlewares/schemaValidationMiddleware";
import { credentialsCreationSchema } from "../schemas/credentialsSchema";
import { createCredential } from "../controllers/credentialsController";
import tokenMiddleware from "../middlewares/tokenValidationMiddleware";

import { Router } from "express";
const router = Router();

router.post("/credential", schemaValidation(credentialsCreationSchema), tokenMiddleware, createCredential)

export default router;