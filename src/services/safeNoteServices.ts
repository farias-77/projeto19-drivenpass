import * as safeNoteRepositories from "../repositories/safeNoteRepository";
import { TsafeNote } from "../types/safeNoteTypes";
import { safeNotes } from "@prisma/client";

export async function validateSafeNoteTitleForUser(safeNote: TsafeNote, userId: number){
    const safeNoteByTitleAndUserId: safeNotes = await safeNoteRepositories.findSafeNoteByTitleAndUserId(safeNote.title, userId);

    if(safeNoteByTitleAndUserId){
        throw {code: "unauthorized", message: "Você já possui uma nota com esse título!"};
    }

    return;
}

export async function insertSafeNote(safeNote: TsafeNote, userId: number){
    return await safeNoteRepositories.insertSafeNote(userId, safeNote);
}

export async function getAllSafeNotes(userId: number){
    return await safeNoteRepositories.findAllSafeNotesByUserId(userId);
}