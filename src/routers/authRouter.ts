import { schemaValidation } from "../middlewares/schemaValidationMiddleware";
import { signUpSchema } from "../schemas/authSchemas";

import { Router } from "express";

import { postSignUp } from "../controllers/authController";

const router = Router();

router.post("/sign-up", schemaValidation(signUpSchema), postSignUp);
router.post("/sign-up", (req, res) => {
    res.send("end");
})


export default router;