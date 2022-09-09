import * as safeNoteRepositories from "../repositories/safeNoteRepository";
import Cryptr from "cryptr";
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
    const encryptedNote: string = encryptsNote(safeNote.note);
    const encryptedSafeNote = {...safeNote, note: encryptedNote};

    return await safeNoteRepositories.insertSafeNote(userId, encryptedSafeNote);
}

export async function getAllSafeNotes(userId: number){
    const safeNotes: safeNotes[] = await safeNoteRepositories.findAllSafeNotesByUserId(userId);
    const decryptedSafeNotes: safeNotes[] = safeNotes.map(safeNote => {
        return {...safeNote, note: decryptsNote(safeNote.note)};
    });

    return decryptedSafeNotes;
}

export async function getSafeNoteById(safeNoteId: number, userId: number){
    const safeNote: safeNotes = await safeNoteRepositories.findSafeNoteById(safeNoteId);
    
    validateSafeNoteExists(safeNote);
    validateSafeNoteBelongsToUser(safeNote, userId);
    
    const decryptedSafeNote: safeNotes = {...safeNote, note: decryptsNote(safeNote.note)};

    return decryptedSafeNote;
}

export async function deleteSafeNoteById(safeNoteId: number){
    return await safeNoteRepositories.deleteSafeNoteById(safeNoteId);
}

function encryptsNote(note: string){
    const cryptr = new Cryptr(process.env.CRYPTR_SECRET || "");
    return cryptr.encrypt(note);
}

function decryptsNote(note: string){
    const cryptr = new Cryptr(process.env.CRYPTR_SECRET || "");
    return cryptr.decrypt(note);
}

function validateSafeNoteExists(safeNote: safeNotes | null){
    if(!safeNote){
        throw {code: "not found", message: "Não existe uma safeNote com esse id!"};
    }

    return
}

function validateSafeNoteBelongsToUser(safeNote: safeNotes, userId: number){
    if(safeNote.userId !== userId){
        throw {code: "unauthorized", message: "Você não tem permissão para essa safeNote!"};
    }

    return;
}