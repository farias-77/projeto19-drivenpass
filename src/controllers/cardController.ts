import * as cardServices from "../services/cardServices";
import { Request, Response } from "express";
import { TCard } from "../types/cardTypes";
import { cards } from "@prisma/client";

export async function insertCard(req: Request, res: Response){
    const userId: number = Number(res.locals.retornoJwtVerify.id);
    const cardData: TCard = req.body;

    await cardServices.validateCardTitleForUser(cardData, userId);
    await cardServices.insertCard(cardData, userId);

    return res.status(200).send("Cartão registrado com sucesso.");
}

export async function getAllCardsByUserId(req: Request, res: Response){
    const userId: number = Number(res.locals.retornoJwtVerify.id);

    const cards: cards[] = await cardServices.getAllCardsByUserId(userId);
    
    return res.status(200).send(cards);
}

export async function getCardById(req: Request, res: Response){
    const userId: number = Number(res.locals.retornoJwtVerify.id);
    const cardId: number = Number(req.params.cardId);

    const card = await cardServices.getCardById(cardId, userId);
    return res.status(200).send(card);
}