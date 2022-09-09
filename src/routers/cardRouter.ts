import { schemaValidation } from "../middlewares/schemaValidationMiddleware";
import tokenMiddleware from "../middlewares/tokenValidationMiddleware";
import { cardCreationSchema } from "../schemas/cardSchemas";

import { Router } from "express";
import { insertCard } from "../controllers/cardController";
const router = Router();

router.post("/card", schemaValidation(cardCreationSchema), tokenMiddleware, insertCard);
router.get("/card", tokenMiddleware)

export default router;