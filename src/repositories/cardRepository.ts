import { cards } from "@prisma/client";
import prisma from "../database/databaseConnection";
import { TCard } from "../types/cardTypes";

export async function findCardById(cardId: number){
    const card: cards[] = await prisma.cards.findMany({
        where:{
            id: cardId
        }
    });

    return card[0] || null;
}

export async function findCardsByUserId(userId: number){
    const cards: cards[] = await prisma.cards.findMany({
        where:{
            userId
        }
    });

    return cards;
}

export async function findCardByTitleAndUserId(title: string, userId: number){
    const card: cards[] = await prisma.cards.findMany({
        where:{
            userId,
            title
        }
    });

    return card[0] || null;
}

export async function deleteCardById(cardId: number){
    return await prisma.cards.delete({
        where:{
            id: cardId
        }
    });
}

export async function insertCard(card: TCard, userId: number){
    return await prisma.cards.create({
        data:{
            ...card,
            userId
        }
    })
}