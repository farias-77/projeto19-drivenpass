import * as credentialServices from "../services/credentialServices";
import { TCredential } from "../types/credentialTypes";
import { Request, Response } from "express";
import { credentials } from "@prisma/client";

export async function createCredential(req: Request, res: Response){
    const credentialData: TCredential = req.body;
    const id: number = Number(res.locals.retornoJwtVerify.id);
    
    await credentialServices.validateCredentialTitleForUser(credentialData.title, id);
    await credentialServices.insertCredential(credentialData, id);

    return res.status(201).send("Credencial criada com sucesso.");
}

export async function getAllCredentialsByUserId(req: Request, res: Response){
    const id: number = Number(res.locals.retornoJwtVerify.id);

    const userCredentials = await credentialServices.getAllCredentialsByUserId(id);
    return res.status(200).send(userCredentials);
}

export async function getCredentialById(req: Request, res: Response){
    const credentialId: number = Number(req.params.credentialId);
    const userId: number = Number(res.locals.retornoJwtVerify.id);

    const credential: credentials = await credentialServices.getCredentialById(credentialId);
    credentialServices.validateCredentialUserRelation(credential, userId);
    const credentialWDecryptedPassword = credentialServices.decryptsPassword(credential);

    return res.status(200).send(credentialWDecryptedPassword);
}

export async function deleteCredentialById(req: Request, res: Response){
    const credentialId: number = Number(req.params.credentialId);
    const userId: number = Number(res.locals.retornoJwtVerify.id);

    const credential: credentials = await credentialServices.getCredentialById(credentialId);
    credentialServices.validateCredentialUserRelation(credential, userId);
    await credentialServices.deleteCredentialById(credentialId);

    return res.status(200).send("Credencial deletada com sucesso.");
}