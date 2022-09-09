import * as wifiServices from "../services/wifiServices";
import { Request, Response } from "express";
import { TWifi } from "../types/wifiTypes";
import { wifiNetworks } from "@prisma/client";

export async function insertWifi(req: Request, res: Response){
    const userId: number = Number(res.locals.retornoJwtVerify.id);
    const wifiNetwork: TWifi = req.body;

    await wifiServices.insertWifi(wifiNetwork, userId);

    return res.status(200).send("Registro de WiFi criado com sucesso.");
}

export async function getAllWifisByUserId(req: Request, res: Response){
    const userId: number = Number(res.locals.retornoJwtVerify.id);

    const wifis: wifiNetworks[] = await wifiServices.getAllWifisByUserId(userId);

    return res.status(200).send(wifis);
}