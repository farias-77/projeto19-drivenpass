import { getAllWifisByUserId, getWifiById, insertWifi } from "../controllers/wifiController";
import { schemaValidation } from "../middlewares/schemaValidationMiddleware";
import tokenMiddleware from "../middlewares/tokenValidationMiddleware";
import { wifiCreationSchema } from "../schemas/wifiSchemas";

import { Router } from "express";
const router = Router();

router.post("/wifi",schemaValidation(wifiCreationSchema), tokenMiddleware, insertWifi);
router.get("/wifi", tokenMiddleware, getAllWifisByUserId);
router.get("/wifi/:wifiId", tokenMiddleware, getWifiById);

export default router;