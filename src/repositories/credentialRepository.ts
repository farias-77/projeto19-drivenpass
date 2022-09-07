import { TCredential } from "../types/credentialTypes";
import prisma from "../database/databaseConnection";

export async function findCredentialByTitleAndUserId(title: string, userId: number){    
    const credential = await prisma.credentials.findMany({
        where:{
            title,
            id: userId
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