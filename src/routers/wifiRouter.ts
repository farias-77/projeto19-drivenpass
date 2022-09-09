import { deleteWifiById, getAllWifisByUserId, getWifiById, insertWifi } from "../controllers/wifiController";
import { schemaValidation } from "../middlewares/schemaValidationMiddleware";
import tokenMiddleware from "../middlewares/tokenValidationMiddleware";
import { wifiCreationSchema } from "../schemas/wifiSchemas";

import { Router } from "express";
const router = Router();

router.post("/wifi",schemaValidation(wifiCreationSchema), tokenMiddleware, insertWifi);
router.get("/wifi", tokenMiddleware, getAllWifisByUserId);
router.get("/wifi/:wifiId", tokenMiddleware, getWifiById);
router.delete("/wifi/:wifiId", tokenMiddleware, deleteWifiById);

export default router;