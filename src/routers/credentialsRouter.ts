import { createCredential, getAllCredentialsByUserId, getCredentialById, deleteCredentialById } from "../controllers/credentialsController";
import { schemaValidation } from "../middlewares/schemaValidationMiddleware";
import { credentialsCreationSchema } from "../schemas/credentialsSchema";
import tokenMiddleware from "../middlewares/tokenValidationMiddleware";

import { Router } from "express";
const router = Router();

router.post("/credential", schemaValidation(credentialsCreationSchema), tokenMiddleware, createCredential);
router.get("/credential", tokenMiddleware, getAllCredentialsByUserId);
router.get("/credential/:credentialId", tokenMiddleware, getCredentialById);
router.delete("/credential/:credentialId", tokenMiddleware, deleteCredentialById);

export default router;