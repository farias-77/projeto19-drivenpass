import { getAllSafeNotes, getSafeNoteById, insertSafeNote } from "../controllers/safeNotesController"; 
import { schemaValidation } from "../middlewares/schemaValidationMiddleware";
import tokenMiddleware from "../middlewares/tokenValidationMiddleware";
import { safeNotesCreationSchema } from "../schemas/safeNotesSchema";

import { Router } from "express";
const router = Router();

router.post("/safeNote", schemaValidation(safeNotesCreationSchema), tokenMiddleware, insertSafeNote);
router.get("/safeNote", tokenMiddleware, getAllSafeNotes);
router.get("/safeNote/:safeNoteId", tokenMiddleware, getSafeNoteById);

export default router;