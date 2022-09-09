import prisma from "../database/databaseConnection";
import { TsafeNote } from "../types/safeNoteTypes";
import { safeNotes } from "@prisma/client";

export async function findSafeNoteById(safeNoteId: number){
    return await prisma.safeNotes.findUnique({
        where:{
            id: safeNoteId
        }
    })
}

export async function findAllSafeNotesByUserId(userId: number){
    return await prisma.safeNotes.findMany({
        where:{
            userId
        }
    })
}

export async function insertSafeNote(userId: number, safeNote: TsafeNote){
    return await prisma.safeNotes.create({
        data:{
            ...safeNote,
            userId
        } 
    });
}

export async function deleteSafeNoteById(safeNoteId: number){
    return await prisma.safeNotes.delete({
        where:{
            id: safeNoteId
        }
    })
}

export async function findSafeNoteByTitleAndUserId(title: string, userId: number){
    const safeNote: safeNotes[] = await prisma.safeNotes.findMany({
        where:{
            title,
            userId
        }
    });

    return safeNote[0];
}