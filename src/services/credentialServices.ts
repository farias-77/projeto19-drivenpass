import * as credentialRepositories from "../repositories/credentialRepository";
import { TCredential } from "../types/credentialTypes";
import Cryptr from "cryptr";

export async function validateCredentialTitleForUser(title: string, userId: number){
    const credential = await findByTitleAndUserId(title, userId);

    if(credential){

        throw {code: "unauthorized", message: "Você já possui uma credencial com esse nome!"}
    }
    
    return;
}

export async function insertCredential(credential: TCredential, userId: number){
    const encryptedPassword = encryptsPassword(credential.password);
    
    return await credentialRepositories.insertCredentialRepository({...credential, password: encryptedPassword}, userId);
}

export async function getAllCredentialsByUserId(userId: number){
    const credentials = await credentialRepositories.getAllCredentialsByUserId(userId);

    return credentials;
}

async function findByTitleAndUserId(title: string, userId: number){
    return await credentialRepositories.findCredentialByTitleAndUserId(title, userId);
}

function encryptsPassword(password: string){
    const cryptr = new Cryptr(process.env.CRYPTR_SECRET || "");
    return cryptr.encrypt(password);
}