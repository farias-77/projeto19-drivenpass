import * as credentialRepositories from "../repositories/credentialRepository";
import { TCredential } from "../types/credentialTypes";
import Cryptr from "cryptr";
import { credentials } from "@prisma/client";

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
    let credentials = await credentialRepositories.getAllCredentialsByUserId(userId);
    credentials = credentials.map(decryptsPassword)
    return credentials;
}

async function findByTitleAndUserId(title: string, userId: number){
    return await credentialRepositories.findCredentialByTitleAndUserId(title, userId);
}

function encryptsPassword(password: string){
    const cryptr = new Cryptr(process.env.CRYPTR_SECRET || "");
    return cryptr.encrypt(password);
}

function decryptsPassword(credential: credentials){
    const cryptr = new Cryptr(process.env.CRYPTR_SECRET || "");
    const decryptedPassword = cryptr.decrypt(credential.password);

    return {...credential, password: decryptedPassword};
}