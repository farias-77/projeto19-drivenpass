import * as credentialRepositories from "../repositories/credentialRepository";
import { TCredential } from "../types/credentialTypes";
import { credentials } from "@prisma/client";
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
    let credentials: credentials[] = await credentialRepositories.getAllCredentialsByUserId(userId);
    if(credentials.length > 0) credentials = credentials.map(decryptsPassword);
    return credentials;
}

export async function getCredentialById(credentialId: number){
    const credential: credentials = await credentialRepositories.getCredentialById(credentialId);

    validateCredentialExists(credential);
    
    return credential;
}

export function validateCredentialUserRelation(credential: credentials, userId: number){   
    if(credential.userId !== userId){
        throw {code: "unauthorized", message: "Você não tem a permissão necessária para essa credencial!"};
    }

    return;
}

export function decryptsPassword(credential: credentials){
    const cryptr = new Cryptr(process.env.CRYPTR_SECRET || "");
    const decryptedPassword = cryptr.decrypt(credential.password);

    return {...credential, password: decryptedPassword};
}

export async function deleteCredentialById(credentialId: number){
    return await credentialRepositories.deleteCredentialById(credentialId);
}

async function findByTitleAndUserId(title: string, userId: number){
    return await credentialRepositories.findCredentialByTitleAndUserId(title, userId);
}

function encryptsPassword(password: string){
    const cryptr = new Cryptr(process.env.CRYPTR_SECRET || "");
    return cryptr.encrypt(password);
}

function validateCredentialExists(credential: credentials){
    if(!credential){
        throw {code: "not found", message: "Não existe uma credencial com esse id."};
    }

    return;
}

