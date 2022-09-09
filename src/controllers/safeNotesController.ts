import * as safeNoteServices from "../services/safeNoteServices";
import { TsafeNote } from "../types/safeNoteTypes";
import { Request, Response } from "express";
import { safeNotes } from "@prisma/client";

export async function insertSafeNote(req: Request, res: Response){
    const userId: number = Number(res.locals.retornoJwtVerify.id);
    const safeNote: TsafeNote = req.body;

    await safeNoteServices.validateSafeNoteTitleForUser(safeNote, userId);
    const encryptedSafeNote = 1
    await safeNoteServices.insertSafeNote(safeNote, userId);

    return res.status(200).send("Nota criada com sucesso.");
}

export async function getAllSafeNotes(req: Request, res: Response){
    const userId: number = Number(res.locals.retornoJwtVerify.id);

    const safeNotes: safeNotes[] = await safeNoteServices.getAllSafeNotes(userId);

    return res.status(200).send(safeNotes);
}

export async function getSafeNoteById(req: Request, res: Response){
    const safeNoteId: number = Number(req.params.safeNoteId);
    const userId: number = Number(res.locals.retornoJwtVerify.id);

    const safeNote: safeNotes = await safeNoteServices.getSafeNoteById(safeNoteId, userId);

    return res.status(200).send(safeNote);
}