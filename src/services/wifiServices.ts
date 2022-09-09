import * as wifiRepositories from "../repositories/wifiRepository";
import { wifiNetworks } from "@prisma/client";
import { TWifi } from "../types/wifiTypes";
import Cryptr from "cryptr";

export async function insertWifi(wifiNetwork: TWifi, userId: number){
    const encryptedPassword: string = encryptsPassword(wifiNetwork.password);

    return await wifiRepositories.insertWifi({...wifiNetwork, password: encryptedPassword}, userId);
}

export async function getAllWifisByUserId(userId: number){
    const wifis: wifiNetworks[] = await wifiRepositories.findWifisByUserId(userId);
    const decryptedPasswordWifis = wifis.map(wifi => {
        return {...wifi, password: decryptsPassword(wifi.password)};
    });

    return decryptedPasswordWifis;
}

export async function getWifiById(wifiId: number, userId: number){
    const wifi: wifiNetworks = await wifiRepositories.findWifiById(wifiId);

    if(!wifi){
        throw{code: "not found", message: "Não existe um WiFi com o id informado."};
    }

    if(wifi.userId !== userId){
        throw{code: "unauthorized", message: "Você não tem permissão para esse WiFi!"};
    }

    return {...wifi, password: decryptsPassword(wifi.password)};
}

export async function deleteWifiById(wifiId: number){
    return await wifiRepositories.deleteWifiById(wifiId);
}

function encryptsPassword(password: string){
    const cryptr = new Cryptr(process.env.CRYPTR_SECRET || "");
    return cryptr.encrypt(password);
}

function decryptsPassword(password: string){
    const cryptr = new Cryptr(process.env.CRYPTR_SECRET || "");
    return cryptr.decrypt(password);
}