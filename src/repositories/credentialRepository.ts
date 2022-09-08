import { TCredential } from "../types/credentialTypes";
import prisma from "../database/databaseConnection";
import { credentials } from "@prisma/client";

export async function findCredentialByTitleAndUserId(title: string, userId: number){    
    const credential = await prisma.credentials.findMany({
        where:{
            title,
            userId
        }
    });

    return credential[0];
}

export async function insertCredentialRepository(credentialWithoutUserId: TCredential, userId: number){
    const credential = {
        ...credentialWithoutUserId,
        userId
    }
    
    return await prisma.credentials.create({
        data: credential
    })
}

export async function getAllCredentialsByUserId(userId: number){
    return await prisma.credentials.findMany({
        where:{
            userId
        }
    });
}

export async function getCredentialById(id: number){
    const credential: credentials[] = await prisma.credentials.findMany({
        where:{
            id
        }
    });

    return credential[0] || null;
}

export async function deleteCredentialById(credentialId: number){
    return await prisma.credentials.delete({
        where:{
            id: credentialId
        }
    })
}