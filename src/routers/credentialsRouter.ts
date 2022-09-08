import { schemaValidation } from "../middlewares/schemaValidationMiddleware";
import { credentialsCreationSchema } from "../schemas/credentialsSchema";
import { createCredential, getAllCredentialsByUserId, getCredentialById } from "../controllers/credentialsController";
import tokenMiddleware from "../middlewares/tokenValidationMiddleware";

import { Router } from "express";
const router = Router();

router.post("/credential", schemaValidation(credentialsCreationSchema), tokenMiddleware, createCredential);
router.get("/credential", tokenMiddleware, getAllCredentialsByUserId);
router.get("/credential/:credentialId", tokenMiddleware, getCredentialById)


export default router;