import { schemaValidation } from "../middlewares/schemaValidationMiddleware";
import tokenMiddleware from "../middlewares/tokenValidationMiddleware";
import { cardCreationSchema } from "../schemas/cardSchemas";

import { Router } from "express";
import { getAllCardsByUserId, insertCard } from "../controllers/cardController";
const router = Router();

router.post("/card", schemaValidation(cardCreationSchema), tokenMiddleware, insertCard);
router.get("/card", tokenMiddleware, getAllCardsByUserId)

export default router;