import { schemaValidation } from "../middlewares/schemaValidationMiddleware";
import { postSignUp, postSignIn } from "../controllers/authController";
import { signInSchema, signUpSchema } from "../schemas/authSchemas";

import { Router } from "express";
const router = Router();

router.post("/sign-up", schemaValidation(signUpSchema), postSignUp);
router.post("/sign-in", schemaValidation(signInSchema), postSignIn);

export default router;