import * as cardRepositories from "../repositories/cardRepository";
import { TCard } from "../types/cardTypes";
import Cryptr from "cryptr";
import { cards } from "@prisma/client";

export async function insertCard(card: TCard, userId: number){
    const encryptedSecurityCode: string = encrypts(card.securityCode);
    const encryptedPassword: string = encrypts(card.password);
    const encryptedCard: TCard = {...card, securityCode: encryptedSecurityCode, password: encryptedPassword}

    return await cardRepositories.insertCard(encryptedCard, userId);
}

export async function validateCardTitleForUser(card: TCard, userId: number){
    const cardWTitle: cards = await cardRepositories.findCardByTitleAndUserId(card.title, userId);

    if(cardWTitle){
        throw{code: "unauthorized", message: "Você já possui um cartão com esse título!"};
    }

    return;
}

export async function getAllCardsByUserId(userId: number){
    const cards: cards[] = await cardRepositories.findCardsByUserId(userId);
    const decryptedCards = cards.map(card => {
        return {...card, password: decrypts(card.password), securityCode: decrypts(card.securityCode)};
    });

    return decryptedCards;
}

function encrypts(data: string){
    const cryptr = new Cryptr(process.env.CRYPTR_SECRET || "");
    return cryptr.encrypt(data);
}

function decrypts(data: string){
    const cryptr = new Cryptr(process.env.CRYPTR_SECRET || "");
    return cryptr.decrypt(data);
}