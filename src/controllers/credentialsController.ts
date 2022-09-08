import * as credentialServices from "../services/credentialServices";
import { TCredential } from "../types/credentialTypes";
import { Request, Response } from "express";

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
    const id: number = Number(res.locals.retornoJwtVerify.id);
    const credentialId: number = Number(req.params.credentialId);

    const credential = await credentialServices.getCredentialById(credentialId, id);
    return res.status(200).send(credential);
}