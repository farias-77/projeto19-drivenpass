import { Request, Response } from "express";
import bcrypt from "bcrypt";

import * as authServices from "../services/authServices";
import { TUser } from "../types/userTypes";

export async function postSignUp(req: Request, res: Response){
    const signUpData: TUser = req.body;
    
    const encryptedPassword = bcrypt.hashSync(signUpData.password, 10);
    const user: TUser = {email: signUpData.email, password: encryptedPassword};

    await authServices.validateEmailInUse(signUpData.email);
    await authServices.insertUser(user);

    return res.status(201).send("Usuário criado com sucesso.");
}