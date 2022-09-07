import * as userRepositories from "../repositories/userRepository";
import { TUser } from "../types/userTypes";
import { users } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function validateEmailInUse(email: string){
    const user: users = await findUserByEmail(email);

    if(user){
        throw {code: "conflict", message: "E-mail já cadastrado!"};
    }

    return;
}

export async function insertUser(user: TUser){
    return await userRepositories.insertUser(user);
}

export async function validateLogin(login: TUser){
    const user: users = await findUserByEmail(login.email);

    if(!user){
        throw {code: "unauthorized", message: "E-mail ou senha incorretos."};
    }

    const checkPassword: boolean = bcrypt.compareSync(login.password, user.password);

    if(!checkPassword) {
        throw {code: "unauthorized", message: "E-mail ou senha incorretos."};
    }

    return;
}

export async function generateToken(email: string){
    const user: users = await findUserByEmail(email);
    
    const secretKey: string = process.env.JWT_SECRET || "";
    const token = jwt.sign({ id: user.id }, secretKey);

    return token;
}

async function findUserByEmail(email: string){
    return await userRepositories.findByEmail(email);
}