import * as userRepositories from "../repositories/userRepository";
import { TUser } from "../types/userTypes";

export async function validateEmailInUse(email: string){
    const user = await findUserByEmail(email);

    if(user){
        throw {code: "conflict", message: "E-mail já cadastrado!"};
    }

    return;
}

export async function insertUser(user: TUser){
    return await userRepositories.insertUser(user);
}






async function findUserByEmail(email: string){
    return await userRepositories.findByEmail(email);
}