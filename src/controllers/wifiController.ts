import * as wifiServices from "../services/wifiServices";
import { wifiNetworks } from "@prisma/client";
import { Request, Response } from "express";
import { TWifi } from "../types/wifiTypes";

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

export async function getWifiById(req: Request, res: Response){
    const userId: number = Number(res.locals.retornoJwtVerify.id);
    const wifiId: number = Number(req.params.wifiId);

    const wifi = await wifiServices.getWifiById(wifiId, userId);

    return res.status(200).send(wifi);
}

export async function deleteWifiById(req: Request, res: Response){
    const userId: number = Number(res.locals.retornoJwtVerify.id);
    const wifiId: number = Number(req.params.wifiId);

    await wifiServices.getWifiById(wifiId, userId);
    await wifiServices.deleteWifiById(wifiId);

    return res.status(200).send("WiFi deletado com sucesso.");
}