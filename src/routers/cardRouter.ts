import { deleteCardById, getAllCardsByUserId, getCardById, insertCard } from "../controllers/cardController";
import { schemaValidation } from "../middlewares/schemaValidationMiddleware";
import tokenMiddleware from "../middlewares/tokenValidationMiddleware";
import { cardCreationSchema } from "../schemas/cardSchemas";

import { Router } from "express";
const router = Router();

router.post("/card", schemaValidation(cardCreationSchema), tokenMiddleware, insertCard);
router.get("/card", tokenMiddleware, getAllCardsByUserId);
router.get("/card/:cardId", tokenMiddleware, getCardById);
router.delete("/card/:cardId", tokenMiddleware, deleteCardById);

export default router;