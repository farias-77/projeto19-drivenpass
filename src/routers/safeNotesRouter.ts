import { schemaValidation } from "../middlewares/schemaValidationMiddleware";
import tokenMiddleware from "../middlewares/tokenValidationMiddleware";
import { safeNotesCreationSchema } from "../schemas/safeNotesSchema";
import { getAllSafeNotes, insertSafeNote } from "../controllers/safeNotesController"; 

import { Router } from "express";
const router = Router();

router.post("/safeNote", schemaValidation(safeNotesCreationSchema), tokenMiddleware, insertSafeNote);
router.get("/safeNote", tokenMiddleware, getAllSafeNotes);

export default router;